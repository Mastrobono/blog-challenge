"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Input from "../components/ui/Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    error: {
      control: "text",
    },
    helpText: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
  },
};

export const Filled: Story = {
  args: {
    label: "Email",
    defaultValue: "user@example.com",
  },
};

export const Focused: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        label="Email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
    );
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    error: "Please enter a valid email address",
    defaultValue: "invalid-email",
  },
};

export const WithHelpText: Story = {
  args: {
    label: "Password",
    helpText: "Must be at least 8 characters",
    type: "password",
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    disabled: true,
    defaultValue: "disabled@example.com",
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <Input label="Default" placeholder="Enter text..." />
      <Input label="Filled" defaultValue="user@example.com" />
      <Input label="Error" error="This field is required" defaultValue="invalid" />
      <Input label="Help Text" helpText="This is helpful information" />
      <Input label="Disabled" disabled defaultValue="disabled@example.com" />
    </div>
  ),
};

