import type { Meta, StoryObj } from "@storybook/react";
import InputFile from "../components/ui/InputFile";

const meta = {
  title: "UI/InputFile",
  component: InputFile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    accept: {
      control: "text",
    },
    multiple: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof InputFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFileChange: (files) => {
      console.log("Files selected:", files);
    },
  },
  render: (args) => (
    <div className="w-[400px]">
      <InputFile {...args} />
    </div>
  ),
};

