import Container from "@/components/ui/Container";
import Hero from "@/components/features/Hero";
import MostViewedPosts from "@/components/features/MostViewedPosts";
import { FilteredPostsProvider, FilterChipsContent, FilteredPostsContent } from "@/components/features/FilteredPostsWithChips";
import { getMostRecentPost, getAllPosts, extractUniqueTopics, getMostViewedPosts, mapApiPostToCardProps } from "@/lib/posts";
import Footer from "@/components/layout/Footer";
import HomePageWithLoader from "@/components/features/HomePageWithLoader";

interface HomePageProps {
  searchParams: Promise<{ noLoader?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
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

  // Check if loader should be skipped via query param
  const params = await searchParams;
  const skipLoader = params.noLoader === "true";

  // Content component (reusable for both with and without loader)
  const pageContent = (
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

  // Render with or without loader based on query param
  if (skipLoader) {
    return pageContent;
  }

  return <HomePageWithLoader>{pageContent}</HomePageWithLoader>;
}
