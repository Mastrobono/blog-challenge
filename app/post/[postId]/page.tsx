import Container from "@/components/ui/Container";
import Hero from "@/components/features/Hero";
import MostViewedPosts from "@/components/features/MostViewedPosts";
import RelatedPosts from "@/components/features/RelatedPosts";
import SocialMedia from "@/components/ui/SocialMedia";
import MarkdownContent from "@/components/features/MarkdownContent";
import { getPostById, getMostViewedPosts, mapApiPostToCardProps } from "@/lib/posts";
import { getAllPosts } from "@/lib/posts";
import { getParsedMarkdownContent } from "@/lib/markdown";
import Footer from "@/components/layout/Footer";

/**
 * Generate static params for all posts at build time
 * This creates static pages for all posts during the build process (SSG)
 * 
 * Note: In Next.js 15, pages are statically generated at build time by default
 * when using generateStaticParams. To enable ISR (revalidation), uncomment:
 * export const revalidate = 3600; // Revalidate every hour
 */
export async function generateStaticParams() {
    try {
        const allPosts = await getAllPosts(1000); // Adjust limit as needed

        return allPosts.map((post) => ({
            postId: post.id.toString(),
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        // Return empty array if API fails during build
        return [];
    }
}

// Optional: Enable ISR (Incremental Static Regeneration)
// Uncomment to revalidate pages every hour
export const revalidate = 3600;

export default async function PostPage({
    params,
}: {
    params: Promise<{ postId: string }>;
}) {
    const { postId: postIdParam } = await params;
    const postId = Number(postIdParam);
    const post = await getPostById(postId);
    const mostViewedPosts = await getMostViewedPosts();

    // Get parsed markdown content from file (always uses post-1.md)
    const htmlContent = await getParsedMarkdownContent();

    return (
        <>
            {/* Hero Section - Outside Container */}
            <Hero
                variant="post"
                className="!mt-0"
                card={mapApiPostToCardProps(post, { includeAvatar: true })}
                showBackButton={true}
            />

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
                    <RelatedPosts />
                </div>
                <Footer />
            </Container>
        </>
    );
}

