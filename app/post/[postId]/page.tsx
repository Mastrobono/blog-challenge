import Container from "@/components/ui/Container";
import Hero from "@/components/features/Hero";
import RelatedPostHero from "@/components/features/RelatedPostHero";
import MostViewedPosts from "@/components/features/MostViewedPosts";
import RelatedPosts from "@/components/features/RelatedPosts";
import SocialMedia from "@/components/ui/SocialMedia";
import MarkdownContent from "@/components/features/MarkdownContent";
import { 
  getPostById, 
  getMostViewedPosts, 
  mapApiPostToCardProps,
  getRelatedPostById,
  mapRelatedPostToCardProps,
  getAllPosts
} from "@/lib/posts";
import { getParsedMarkdownContent } from "@/lib/markdown";
import { CardProps } from "@/components/features/Card";
import Footer from "@/components/layout/Footer";

/**
 * Generate static params for all posts at build time
 * This creates static pages for all posts during the build process (SSG)
 * 
 * IMPORTANT: In Next.js 15 App Router:
 * - If a route is NOT in generateStaticParams, Next.js will generate it on-demand (on first request)
 * - This means new posts created after build will still work - they'll be generated dynamically
 * - Combined with ISR (revalidate), pages are cached after first generation
 */
export async function generateStaticParams() {
    try {
        const allPosts = await getAllPosts(1000); // Adjust limit as needed
        const { getRelatedPostsForSSG } = await import("@/lib/posts");
        const relatedPosts = await getRelatedPostsForSSG();

        // Generate params for regular posts (post-{id})
        const regularParams = allPosts.map((post) => ({
            postId: `post-${post.id}`,
        }));

        // Generate params for related posts (related-{id})
        const relatedParams = relatedPosts.map((post: { id: number }) => ({
            postId: `related-${post.id}`,
        }));

        return [...regularParams, ...relatedParams];
    } catch (error) {
        console.error("Error generating static params:", error);
        // Return empty array if API fails during build
        // This allows on-demand generation for new posts
        return [];
    }
}

/**
 * ISR (Incremental Static Regeneration) Configuration
 * - revalidate: 3600 seconds (1 hour)
 * - Pages are regenerated in the background after 1 hour
 * - New posts not in generateStaticParams are generated on-demand on first request
 * - After generation, they're cached and follow the same revalidation schedule
 */
export const revalidate = 3600; // Revalidate every hour

/**
 * Dynamic route configuration
 * - 'force-dynamic': Always generate on-demand (not recommended for performance)
 * - 'error': Throw error if route not in generateStaticParams (default with generateStaticParams)
 * - undefined: Allow on-demand generation for routes not in generateStaticParams (current behavior)
 * 
 * Current behavior: Routes not in generateStaticParams will be generated on-demand
 */
export const dynamicParams = true; // Allow dynamic generation of routes not in generateStaticParams

export default async function PostPage({
    params,
}: {
    params: Promise<{ postId: string }>;
}) {
    const { postId: postIdParam } = await params;
    
    // Determine if this is a related post or regular post
    const isRelatedPost = postIdParam.startsWith("related-");
    
    // Extract the numeric ID from the slug
    const numericId = postIdParam.replace(/^(post-|related-)/, "");
    const postId = Number(numericId);
    
    // Fetch post data from the appropriate API
    let cardProps: CardProps | undefined;
    if (isRelatedPost) {
        // Fetch from NestJS backend (related posts) - this will be used as fallback
        // RelatedPostHero will prefer React Query cache if available
        try {
            const relatedPost = await getRelatedPostById(postId);
            cardProps = {
                ...mapRelatedPostToCardProps(relatedPost),
                avatar: {
                    src: `https://i.pravatar.cc/150?img=${postId % 10}`,
                    alt: "Author",
                    name: "Author",
                },
            };
        } catch (error) {
            // If fetch fails (e.g., 404), RelatedPostHero will handle it
            // Only log non-404 errors to avoid noise
            if (error instanceof Error && "status" in error && (error as { status?: number }).status !== 404) {
                console.error("Failed to fetch related post:", error);
            }
        }
    } else {
        // Fetch from Strapi API (regular posts)
        const post = await getPostById(postId);
        cardProps = mapApiPostToCardProps(post, { includeAvatar: true });
    }
    
    const mostViewedPosts = await getMostViewedPosts();

    // Get parsed markdown content from file (always uses post-1.md)
    const htmlContent = await getParsedMarkdownContent();

    return (
        <>
            {/* Hero Section - Outside Container */}
            {isRelatedPost ? (
                <RelatedPostHero
                    postId={postId}
                    fallbackCardProps={cardProps}
                    showBackButton={true}
                />
            ) : cardProps ? (
                <Hero
                    variant="post"
                    className="!mt-0"
                    card={cardProps}
                    showBackButton={true}
                />
            ) : null}

            <Container className="bg-neutral-white">
                {/* Three Column Layout */}
                <div className="flex flex-col md:flex-row gap-6 mt-10">
                    {/* Left Column: Social Media - Desktop only, sticky */}
                    <aside className="hidden md:block w-full md:w-[25%] md:sticky md:top-[100px] md:self-start md:max-h-[calc(100vh-100px)] md:overflow-y-auto">
                        <SocialMedia variant="light" showLabel={true} />
                    </aside>

                    {/* Middle Column: Markdown Content */}
                    <main className="flex-1">
                        <MarkdownContent htmlContent={htmlContent} />
                        
                        {/* Social Media - Mobile only, shown below markdown */}
                        <div className="block md:hidden mt-6">
                            <SocialMedia variant="light" showLabel={true} />
                        </div>
                    </main>

                    {/* Right Column: Most Viewed Posts (Fixed) */}
                    <aside className="hidden md:block w-full md:w-[300px] md:sticky md:top-[100px] md:self-start md:max-h-[calc(100vh-100px)] md:overflow-y-auto">
                        <MostViewedPosts posts={mostViewedPosts} variant="light" />
                    </aside>
                </div>

                {/* Related Posts below columns */}
                <div className="md:mt-10 py-16 px-0 md:px-12">
                    <RelatedPosts excludePostId={isRelatedPost ? postId : undefined} />
                </div>
                <Footer />
            </Container>
        </>
    );
}

