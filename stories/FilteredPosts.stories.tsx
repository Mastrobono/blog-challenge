import type { Meta, StoryObj } from "@storybook/react";
import FilteredPosts from "../components/features/FilteredPosts";
import { FilterProvider } from "../contexts/FilterContext";
import Container from "../components/ui/Container";
import React from "react";
import { ApiPost } from "../services/api";

// Mock posts data for Storybook (with diverse topics)
const mockPosts: ApiPost[] = [
  {
    id: 1,
    attributes: {
      title: "Your Kid May Already Be Watching AI-Generated Videos on YouTube",
      topic: "Technology",
      readTime: 6,
      author: "John Doe",
      publishedAt: "2024-01-01T00:00:00.000Z",
      coverImg: {
        data: {
          id: 1,
          attributes: {
            url: "/assets/hero-placeholder.png",
            alternativeText: "AI videos",
          },
        },
      },
    },
  },
  {
    id: 2,
    attributes: {
      title: "A Global Police Operation Just Took Down the Notorious LockBit",
      topic: "Security",
      readTime: 5,
      author: "Jane Smith",
      publishedAt: "2024-01-02T00:00:00.000Z",
      coverImg: {
        data: {
          id: 2,
          attributes: {
            url: "/assets/hero-placeholder.png",
            alternativeText: "LockBit operation",
          },
        },
      },
    },
  },
  {
    id: 3,
    attributes: {
      title: "Binance's Top Crypto Crime Investigator Is Being Detained in Nigeria",
      topic: "Cryptocurrency",
      readTime: 7,
      author: "Bob Johnson",
      publishedAt: "2024-01-03T00:00:00.000Z",
      coverImg: {
        data: {
          id: 3,
          attributes: {
            url: "/assets/hero-placeholder.png",
            alternativeText: "Binance investigator",
          },
        },
      },
    },
  },
  {
    id: 4,
    attributes: {
      title: "The first rule of the extreme dishwasher loading facebook group is...",
      topic: "Technology",
      readTime: 4,
      author: "Alice Williams",
      publishedAt: "2024-01-04T00:00:00.000Z",
      coverImg: {
        data: {
          id: 4,
          attributes: {
            url: "/assets/hero-placeholder.png",
            alternativeText: "Dishwasher group",
          },
        },
      },
    },
  },
  {
    id: 5,
    attributes: {
      title: "Understanding Cloud Computing: A Comprehensive Guide",
      topic: "Cloud Computing",
      readTime: 8,
      author: "Charlie Brown",
      publishedAt: "2024-01-05T00:00:00.000Z",
      coverImg: {
        data: {
          id: 5,
          attributes: {
            url: "/assets/hero-placeholder.png",
            alternativeText: "Cloud computing guide",
          },
        },
      },
    },
  },
  {
    id: 6,
    attributes: {
      title: "The Future of Artificial Intelligence in Healthcare",
      topic: "AI & Machine Learning",
      readTime: 9,
      author: "Diana Prince",
      publishedAt: "2024-01-06T00:00:00.000Z",
      coverImg: {
        data: {
          id: 6,
          attributes: {
            url: "/assets/hero-placeholder.png",
            alternativeText: "AI in healthcare",
          },
        },
      },
    },
  },
  {
    id: 7,
    attributes: {
      title: "Cybersecurity Best Practices for Small Businesses",
      topic: "Security",
      readTime: 6,
      author: "Edward Norton",
      publishedAt: "2024-01-07T00:00:00.000Z",
      coverImg: {
        data: {
          id: 7,
          attributes: {
            url: "/assets/hero-placeholder.png",
            alternativeText: "Cybersecurity practices",
          },
        },
      },
    },
  },
  {
    id: 8,
    attributes: {
      title: "Blockchain Technology: Beyond Cryptocurrency",
      topic: "Blockchain",
      readTime: 7,
      author: "Fiona Apple",
      publishedAt: "2024-01-08T00:00:00.000Z",
      coverImg: {
        data: {
          id: 8,
          attributes: {
            url: "/assets/hero-placeholder.png",
            alternativeText: "Blockchain technology",
          },
        },
      },
    },
  },
  {
    id: 9,
    attributes: {
      title: "Mobile App Development Trends in 2024",
      topic: "Mobile Development",
      readTime: 5,
      author: "George Lucas",
      publishedAt: "2024-01-09T00:00:00.000Z",
      coverImg: {
        data: {
          id: 9,
          attributes: {
            url: "/assets/hero-placeholder.png",
            alternativeText: "Mobile app trends",
          },
        },
      },
    },
  },
];

const meta = {
  title: "Features/FilteredPosts",
  component: FilteredPosts,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#000000",
        },
      ],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <FilterProvider initialActiveFilters={["all"]}>
          <Container>
            <Story />
          </Container>
        </FilterProvider>
      );
    },
  ],
  argTypes: {
    title: {
      control: "text",
      description: "Title for the filter chips section",
    },
    posts: {
      control: "object",
      description: "Array of posts fetched from Server Component",
    },
    initialTopics: {
      control: "object",
      description: "Optional initial topics (extracted from posts if not provided)",
    },
  },
} satisfies Meta<typeof FilteredPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Topics",
    posts: mockPosts,
  },
};

