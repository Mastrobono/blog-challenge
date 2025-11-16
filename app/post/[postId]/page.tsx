import Container from "@/components/ui/Container";
import Hero from "@/components/features/Hero";
import MostViewedPosts from "@/components/features/MostViewedPosts";
import RelatedPosts from "@/components/features/RelatedPosts";
import SocialMedia from "@/components/ui/SocialMedia";
import { getPostById, getMostViewedPosts, mapApiPostToCardProps } from "@/lib/posts";
import { getAllPosts } from "@/lib/posts";
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

    // Mock markdown content - TODO: Replace with actual post body from API
    const markdownContent = `# Curabitur sit amet sapien at velit fringilla tincidunt porttitor eget lacus. Sed mauris libero,

malesuada et venenatis vitae, porta ac enim. Curabitur sit amet sapien at velit fringilla

tincidunt porttitor eget lacus. Sed mauris libero, malesuada et venenatis vitae, porta ac enim.

Aliquam erat volutpat. Cras tristique eleifend dolor, et ultricies nisl feugiat sed. Pellentesque

blandit orci eu velit vehicula commodo. Phasellus imperdiet finibus ex eget gravida. Maecenas

vitae molestie dolor. Nulla hendrerit ipsum leo, in tempor urna interdum ut. Sed molestie sodales

quam. Mauris sollicitudin metus at eros imperdiet, vitae pulvinar nunc condimentum. Pellentesque

rhoncus, lacus sit amet mollis placerat, nulla lectus maximus justo, quis gravida elit augue id.

![imagen blog](https://litetech-assets.s3.us-east-2.amazonaws.com/Image.png)

# Pellentesque venenatis arcu lectu Maecenas iaculis et dolor ac laoreet. Curabitur placerat porta

dolor. Quisque consectetur vitae odio ac posuere. Nullam tristique tellus purus, quis aliquet

purus sodales sed. Sed hendrerit gravida augue luctus suscipit. Maecenas id faucibus magna. Sed

placerat orci ac orci blandit, at porta ante ornare. Praesent tristique sollicitudin fringilla.

Morbi at laoreet enim, sed viverra ligula. Sed laoreet, elit vel faucibus semper, urna ante

euismod sem, accumsan volutpat augue ante ut elit. Phasellus rutrum, nulla vitae euismod blandit,

elit nisi placerat neque, vitae facilisis massa sapien a mi. Fusce sit amet blandit lectus.

![imagen blog](https://litetech-assets.s3.us-east-2.amazonaws.com/Image2.png)

> Commodo eget mi. In orci nunc, laoreet eleifend sem vel, suscipitlon lorem ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel sem in nunc porttitor dapibus a sollicitudin nunc. Sed lacinia nisl a magna congue, maximus tristique tellus finibus.

# Nullam tristique tellus purus Maecenas iaculis et dolor ac laoreet. Curabitur placerat porta

dolor. Quisque consectetur vitae odio ac posuere. Nullam tristique tellus purus, quis aliquet

purus sodales sed. Sed hendrerit gravida augue luctus suscipit. Maecenas id faucibus magna. Sed

placerat orci ac orci blandit, at porta ante ornare. Praesent tristique sollicitudin fringilla.

Morbi at laoreet enim, sed viverra ligula. Sed laoreet, elit vel faucibus semper, urna ante

euismod sem, accumsan volutpat augue ante ut elit. Phasellus rutrum, nulla vitae euismod blandit,

elit nisi placerat neque, vitae facilisis massa sapien a mi. Fusce sit amet blandit lectus.`;

    return (
        <Container className="bg-neutral-white">
            {/* Hero Section */}
            <Hero
                variant="post"
                card={mapApiPostToCardProps(post, { includeAvatar: true })}
                showBackButton={true}
            />

            {/* Three Column Layout */}
            <div className="flex flex-col md:flex-row gap-6 mt-10">
                {/* Left Column: Social Media */}
                <aside className="w-full md:w-[300px]">
                    <SocialMedia variant="light" showLabel={true} />
                </aside>

                {/* Middle Column: Markdown Content */}
                <main className="flex-1">
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: markdownContent.replace(/\n/g, "<br />") }}
                    />
                </main>

                {/* Right Column: Most Viewed Posts (Fixed) */}
                <aside className="w-full md:w-[300px] md:sticky md:top-[100px] md:self-start md:h-screen md:overflow-y-auto">
                    <MostViewedPosts posts={mostViewedPosts} variant="light" />
                </aside>
            </div>

            {/* Related Posts below columns */}
            <div className="mt-10">
                <RelatedPosts />
            </div>
            <Footer />
        </Container>
    );
}

