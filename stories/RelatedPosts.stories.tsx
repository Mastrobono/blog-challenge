import type { Meta, StoryObj } from "@storybook/react";
import RelatedPosts from "../components/features/RelatedPosts";
import Container from "../components/ui/Container";

const meta = {
  title: "Features/RelatedPosts",
  component: RelatedPosts,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#FFFFFF",
        },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onNewPostClick: {
      action: "newPostClicked",
      description: "Callback when 'New post' button is clicked",
    },
  },
} satisfies Meta<typeof RelatedPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onNewPostClick: () => console.log("New post clicked"),
  },
  render: (args) => (
    <Container>
      <RelatedPosts {...args} />
    </Container>
  ),
};


