import type { Meta, StoryObj } from "@storybook/react";
import SocialMedia from "../components/ui/SocialMedia";

const meta = {
  title: "UI/SocialMedia",
  component: SocialMedia,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["dark", "light"],
      description: "Color variant of the social media icons",
    },
    size: {
      control: "select",
      options: ["default", "large"],
      description: "Size variant - controls gap between icons (default: 24px, large: 32px)",
    },
  },
} satisfies Meta<typeof SocialMedia>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "light",
    size: "default",
  },
  render: (args) => (
    <div className="p-8 bg-neutral-black">
      <SocialMedia {...args} />
    </div>
  ),
};

export const Large: Story = {
  args: {
    variant: "light",
    size: "large",
  },
  render: (args) => (
    <div className="p-8 bg-neutral-black">
      <SocialMedia {...args} />
    </div>
  ),
};

export const DarkVariant: Story = {
  args: {
    variant: "dark",
    size: "default",
  },
  render: (args) => (
    <div className="p-8 bg-neutral-white">
      <SocialMedia {...args} />
    </div>
  ),
};

export const DarkVariantLarge: Story = {
  args: {
    variant: "dark",
    size: "large",
  },
  render: (args) => (
    <div className="p-8 bg-neutral-white">
      <SocialMedia {...args} />
    </div>
  ),
};

