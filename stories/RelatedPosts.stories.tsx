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
  argTypes: {},
} satisfies Meta<typeof RelatedPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Container>
      <RelatedPosts {...args} />
    </Container>
  ),
};


