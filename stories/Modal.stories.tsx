import type { Meta, StoryObj } from "@storybook/react";
import Modal from "../components/features/Modal";

const meta = {
  title: "Features/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#f5f5f5",
        },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    headline: {
      control: "text",
      description: "Main headline text",
    },
    subheadline: {
      control: "text",
      description: "Subheadline text below the headline",
    },
    successText: {
      control: "text",
      description: "Text shown in success state",
    },
    buttonText: {
      control: "text",
      description: "Text for the submit button",
    },
    successButtonText: {
      control: "text",
      description: "Text for the success button",
    },
    onClose: {
      action: "closed",
      description: "Callback when modal is closed",
    },
    onSubmit: {
      action: "submitted",
      description: "Custom submit handler (optional, uses mock by default)",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: "Upload your post",
    subheadline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo libero.",
    successText: "Your post was successfully uploaded!",
    buttonText: "Confirm",
    successButtonText: "Done",
    onClose: () => console.log("Modal closed"),
  },
  render: (args) => (
    <div className="w-full max-w-4xl p-8">
      <Modal {...args} />
    </div>
  ),
};

