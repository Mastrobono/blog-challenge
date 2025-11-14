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
    active: {
      control: "boolean",
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
    active: false,
    children: "Technology",
  },
};

export const Active: Story = {
  args: {
    active: true,
    children: "Technology",
  },
};

export const ActiveWithRemove: Story = {
  args: {
    active: true,
    children: "Technology",
    onRemove: () => console.log("Remove clicked"),
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip active={false}>Technology</Chip>
      <Chip active={true}>Design</Chip>
      <Chip active={false}>Business</Chip>
      <Chip active={true} onRemove={() => console.log("Remove")}>
        Marketing
      </Chip>
    </div>
  ),
};

