import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/ui/Button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "black", "green-outline"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
  decorators: [
    (Story) => (
      <div className="bg-neutral-black p-8">
        <Story />
      </div>
    ),
  ],
};

export const Black: Story = {
  args: {
    variant: "black",
    children: "Button",
  },
};

export const GreenOutline: Story = {
  args: {
    variant: "green-outline",
    children: "Button",
  },
};


export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="black">Black</Button>
        <Button variant="green-outline">Green Outline</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
};

