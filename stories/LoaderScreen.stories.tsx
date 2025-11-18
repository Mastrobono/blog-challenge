import type { Meta, StoryObj } from "@storybook/react";
import LoaderScreen from "@/components/ui/LoaderScreen";

const meta = {
  title: "UI/LoaderScreen",
  component: LoaderScreen,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isVisible: {
      control: "boolean",
      description: "Whether the loader is visible",
    },
  },
} satisfies Meta<typeof LoaderScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isVisible: true,
  },
};

export const Hidden: Story = {
  args: {
    isVisible: false,
  },
};

export const WithCallback: Story = {
  args: {
    isVisible: true,
    onComplete: () => {
      console.log("Loader animation completed!");
    },
  },
};

