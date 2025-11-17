import type { Meta, StoryObj } from "@storybook/react";
import Hero from "../components/features/Hero";
import Container from "../components/ui/Container";
import { mapApiPostToCardProps } from "../lib/posts";
import { ApiPost } from "../services/api";

const meta = {
  title: "Features/Hero",
  component: Hero,
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
  argTypes: {
    variant: {
      control: "select",
      options: ["home", "post"],
      description: "Hero variant: 'home' for landing page, 'post' for blog post page",
    },
    label: {
      control: "text",
      description: "Label text displayed above the card (only for home variant)",
    },
    card: {
      control: "object",
      description: "Card props for the hero card",
    },
    showBackButton: {
      control: "boolean",
      description: "Show back button (only for post variant)",
    },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock most recent post (for home variant)
const mockMostRecentPost: ApiPost = {
  id: 1,
  attributes: {
    title: "Your Kid May Already Be Watching AI-Generated Videos on YouTube",
    topic: "Technology",
    readTime: 6,
    author: "John Doe",
    publishedAt: "2024-01-15T00:00:00.000Z",
    coverImg: {
      data: {
        id: 1,
        attributes: {
          url: "/assets/hero-placeholder.png",
          alternativeText: "AI videos on YouTube",
        },
      },
    },
  },
};

// Mock post with id 1 (for post variant)
const mockPostById: ApiPost = {
  id: 1,
  attributes: {
    title: "Your Kid May Already Be Watching AI-Generated Videos on YouTube",
    topic: "Technology",
    readTime: 6,
    author: "Natsu Kim",
    publishedAt: "2024-01-15T00:00:00.000Z",
    coverImg: {
      data: {
        id: 1,
        attributes: {
          url: "/assets/hero-placeholder.png",
          alternativeText: "AI videos on YouTube",
        },
      },
    },
  },
};

const sampleCardHome = mapApiPostToCardProps(mockMostRecentPost);
const sampleCardPost = mapApiPostToCardProps(mockPostById, { includeAvatar: true });

export const HomeVariant: Story = {
  args: {
    variant: "home",
    label: "Today story",
    card: sampleCardHome,
  },
  render: (args) => (
    <Container>
      <Hero {...args} />
    </Container>
  ),
};

export const PostVariant: Story = {
  args: {
    variant: "post",
    card: sampleCardPost,
    showBackButton: true,
  },
  render: (args) => (
    <Container>
      <Hero {...args} />
    </Container>
  ),
};

