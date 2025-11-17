import type { Meta, StoryObj } from "@storybook/react";
import ViewedPost from "../components/ui/ViewedPost";
import Container from "../components/ui/Container";

const meta = {
  title: "UI/ViewedPost",
  component: ViewedPost,
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
    postHead: {
      control: "text",
      description: "Post headline text",
    },
    imageSrc: {
      control: "text",
      description: "Post image source",
    },
    imageAlt: {
      control: "text",
      description: "Post image alt text",
    },
  },
} satisfies Meta<typeof ViewedPost>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    postHead: "Your Kid May Already Be Watching AI-Generated Videos on YouTube",
    imageSrc: "/assets/hero-placeholder.png",
    imageAlt: "Post image",
  },
  render: (args) => (
    <Container>
      <div className="w-full max-w-md">
        <ViewedPost {...args} />
      </div>
    </Container>
  ),
};


