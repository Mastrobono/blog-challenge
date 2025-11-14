import type { Meta, StoryObj } from "@storybook/react";
import Chip from "../components/ui/Chip";

const meta = {
  title: "UI/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "active"],
    },
    onRemove: {
      action: "removed",
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Technology",
  },
};

export const Active: Story = {
  args: {
    variant: "active",
    children: "Technology",
    onRemove: () => console.log("Remove clicked"),
  },
};

