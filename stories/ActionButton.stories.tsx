import type { Meta, StoryObj } from "@storybook/react";
import ActionButton from "../components/ui/ActionButton";

const meta = {
  title: "UI/ActionButton",
  component: ActionButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["dark", "light"],
    },
    children: {
      control: "text",
    },
    arrowColor: {
      control: "color",
    },
  },
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "light",
    children: "Read",
    onClick: () => console.log("Read clicked"),
  },
};

export const NewPost: Story = {
  args: {
    variant: "dark",
    children: "New post",
    onClick: () => console.log("New post clicked"),
  },
  decorators: [
    (Story) => (
      <div className="bg-neutral-black p-8">
        <Story />
      </div>
    ),
  ],
};
