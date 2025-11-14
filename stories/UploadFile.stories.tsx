import type { Meta, StoryObj } from "@storybook/react";
import UploadFile from "../components/ui/UploadFile";

const meta = {
  title: "UI/UploadFile",
  component: UploadFile,
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
} satisfies Meta<typeof UploadFile>;

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
      <UploadFile {...args} />
    </div>
  ),
};

export const WithAccept: Story = {
  args: {
    accept: "image/*",
    onFileChange: (files) => {
      console.log("Images selected:", files);
    },
  },
  render: (args) => (
    <div className="w-[400px]">
      <UploadFile {...args} />
    </div>
  ),
};

export const Multiple: Story = {
  args: {
    multiple: true,
    onFileChange: (files) => {
      console.log("Multiple files selected:", files);
    },
  },
  render: (args) => (
    <div className="w-[400px]">
      <UploadFile {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <UploadFile {...args} />
    </div>
  ),
};

