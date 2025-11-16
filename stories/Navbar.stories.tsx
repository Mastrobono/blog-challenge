import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "../components/layout/Navbar";
import ActionButton from "../components/ui/ActionButton";
import Container from "../components/ui/Container";

const meta = {
  title: "Layout/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#f5f5f5",
        },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    buttonClick: {
      control: false,
      description: "Button or element to display on the right side",
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    buttonClick: (
      <ActionButton variant="dark" onClick={() => console.log("New post clicked")}>
        New post
      </ActionButton>
    ),
  },
  render: (args) => (
    <Container>
      <Navbar {...args} />
    </Container>
  ),
};

