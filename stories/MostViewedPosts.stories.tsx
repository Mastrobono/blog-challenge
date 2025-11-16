import type { Meta, StoryObj } from "@storybook/react";
import MostViewedPosts from "../components/features/MostViewedPosts";
import Container from "../components/ui/Container";

const meta = {
  title: "Features/MostViewedPosts",
  component: MostViewedPosts,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#000000",
        },
        {
          name: "light",
          value: "#FFFFFF",
        },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["dark", "light"],
      description: "Variant: 'dark' for landing page, 'light' for post detail page",
    },
    posts: {
      control: "object",
      description: "Array of most viewed posts",
    },
  },
} satisfies Meta<typeof MostViewedPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

const samplePosts = [
  {
    id: 1,
    postHead: "Your Kid May Already Be Watching AI-Generated Videos on YouTube",
    imageSrc: "/assets/hero-placeholder.png",
    imageAlt: "Post 1",
  },
  {
    id: 2,
    postHead: "A Global Police Operation Just Took Down the Notorious LockBit",
    imageSrc: "/assets/hero-placeholder.png",
    imageAlt: "Post 2",
  },
  {
    id: 3,
    postHead: "The Future of AI in Healthcare",
    imageSrc: "/assets/hero-placeholder.png",
    imageAlt: "Post 3",
  },
  {
    id: 4,
    postHead: "Understanding Cryptocurrency Trends",
    imageSrc: "/assets/hero-placeholder.png",
    imageAlt: "Post 4",
  },
];

export const DarkVariant: Story = {
  args: {
    variant: "dark",
    posts: samplePosts,
  },
  render: (args) => (
    <Container>
      <div className="w-full max-w-md">
        <MostViewedPosts {...args} />
      </div>
    </Container>
  ),
};

export const LightVariant: Story = {
  args: {
    variant: "light",
    posts: samplePosts,
  },
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  render: (args) => (
    <Container>
      <div className="w-full max-w-md">
        <MostViewedPosts {...args} />
      </div>
    </Container>
  ),
};

