import type { Meta, StoryObj } from "@storybook/react";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";

const meta = {
  title: "Layout/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Container>
      <Footer {...args} />
    </Container>
  ),
};

