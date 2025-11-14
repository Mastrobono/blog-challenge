import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "../components/ui/Avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "range", min: 20, max: 100, step: 5 },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User avatar",
    size: 40,
  },
};

export const Small: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=2",
    alt: "User avatar",
    size: 30,
  },
};

export const Large: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "User avatar",
    size: 60,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" size={40} />
      <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" size={40} />
      <Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" size={40} />
    </div>
  ),
};

