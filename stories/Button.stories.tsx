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


export const WithIcon: Story = {
  args: {
    variant: "primary",
    children: "Button",
    icon: (
      <img
        src="/assets/upload-file.svg"
        alt="Icon"
        className="w-5 h-5"
      />
    ),
    iconPosition: "right",
  },
};

export const AllVariants: Story = {
  args: {
    children: "",
  },
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

