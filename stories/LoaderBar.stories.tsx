import type { Meta, StoryObj } from "@storybook/react";
import LoaderBar from "../components/ui/LoaderBar";

const meta = {
  title: "UI/LoaderBar",
  component: LoaderBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    progress: {
      control: { type: "range", min: 0, max: 100, step: 5 },
    },
    status: {
      control: "select",
      options: ["loading", "success", "failure"],
    },
  },
} satisfies Meta<typeof LoaderBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    progress: 60,
    status: "loading",
    onCancel: () => console.log("Cancel clicked"),
  },
  render: (args) => (
    <div className="w-[400px]">
      <LoaderBar {...args} />
    </div>
  ),
};

export const Success: Story = {
  args: {
    progress: 100,
    status: "success",
  },
  render: (args) => (
    <div className="w-[400px]">
      <LoaderBar {...args} />
    </div>
  ),
};

export const Failed: Story = {
  args: {
    progress: 0,
    status: "failure",
    onRetry: () => console.log("Retry clicked"),
  },
  render: (args) => (
    <div className="w-[400px]">
      <LoaderBar {...args} />
    </div>
  ),
};

