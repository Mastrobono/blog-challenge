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
    showText: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof LoaderBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    progress: 50,
    status: "loading",
    showText: true,
  },
};

export const Loading25: Story = {
  args: {
    progress: 25,
    status: "loading",
    showText: true,
  },
};

export const Loading75: Story = {
  args: {
    progress: 75,
    status: "loading",
    showText: true,
  },
};

export const Success: Story = {
  args: {
    progress: 100,
    status: "success",
    showText: true,
  },
};

export const Failure: Story = {
  args: {
    progress: 50,
    status: "failure",
    showText: true,
  },
};

export const WithCancel: Story = {
  args: {
    progress: 50,
    status: "loading",
    showText: true,
    onCancel: () => console.log("Cancel clicked"),
  },
};

export const WithRetry: Story = {
  args: {
    progress: 50,
    status: "failure",
    showText: true,
    onRetry: () => console.log("Retry clicked"),
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div>
        <h3 className="text-sm font-medium mb-2">Loading States</h3>
        <LoaderBar progress={25} status="loading" showText />
        <LoaderBar progress={50} status="loading" showText />
        <LoaderBar progress={75} status="loading" showText />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Success</h3>
        <LoaderBar progress={100} status="success" showText />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Failure</h3>
        <LoaderBar progress={50} status="failure" showText />
      </div>
    </div>
  ),
};

