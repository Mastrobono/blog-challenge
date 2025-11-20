import Container from "@/components/ui/Container";
import Hero from "@/components/features/Hero";
import MostViewedPosts from "@/components/features/MostViewedPosts";
import { FilteredPostsProvider, FilterChipsContent, FilteredPostsContent } from "@/components/features/FilteredPostsWithChips";
import { getMostRecentPost, getAllPosts, extractUniqueTopics, getMostViewedPosts, mapApiPostToCardProps } from "@/lib/posts";
import Footer from "@/components/layout/Footer";

/**
 * ISR (Incremental Static Regeneration) Configuration
 * - revalidate: 3600 seconds (1 hour)
 * - Page is regenerated in the background after 1 hour
 * 
 * This page is used for performance metrics (PageSpeed Insights) without the loader
 */
export const revalidate = 3600; // Revalidate every hour

export default async function NoLoaderPage() {
  // Fetch data in Server Component
  const mostRecentPost = await getMostRecentPost();
  const allPosts = await getAllPosts(100);
  const mostViewedPosts = await getMostViewedPosts();

  // Extract topics for initial chips
  const uniqueTopics = extractUniqueTopics(allPosts);
  const initialTopics = uniqueTopics.map((topic) => ({
    id: topic.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and"),
    label: topic,
  }));

  // Get initial 9 posts for FilteredPosts (not used directly, but kept for future use)
  const _initialPosts = allPosts.slice(0, 9);

  // Render content directly without loader wrapper
  return (
    <Container>

      {
        mostRecentPost && (
          <Hero
            variant="home"
            label="Today story"
            card={mapApiPostToCardProps(mostRecentPost)}
          />
        )
      }
      {/* FilterChips and Posts with shared context */}
      <FilteredPostsProvider initialTopics={initialTopics}>
        {/* FilterChips - Outside columns */}
        <div className="mb-6">
          <FilterChipsContent title="Topics" />
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: GridCards + CTA */}
          <div className="flex-1 flex flex-col">
            <FilteredPostsContent
              allPosts={allPosts}
              initialTopics={initialTopics}
            />
          </div>

          {/* Right Column: Most Viewed Posts (Fixed) */}
          <aside className="w-full lg:block hidden md:w-[300px] md:sticky md:top-[100px] md:self-start md:max-h-[calc(100vh-100px)] md:overflow-y-auto">
            <MostViewedPosts posts={mostViewedPosts} variant="dark" />
          </aside>
        </div>
      </FilteredPostsProvider>

      {/* Footer outside columns */}
      <Footer />
    </Container>
  );
}

