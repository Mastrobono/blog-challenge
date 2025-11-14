"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import InputText from "../components/ui/InputText";

const meta = {
  title: "UI/InputText",
  component: InputText,
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
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <InputText
        label="Label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Filled: Story = {
  args: {
    label: "Label",
    defaultValue: "Pla",
  },
};

export const Active: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <InputText
        label="Label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
    );
  },
};

export const Error: Story = {
  render: () => {
    const [value, setValue] = useState("Post");
    return (
      <InputText
        label="Label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        validate={(val) => {
          if (!val) return null; // Don't validate empty
          if (val.length < 5) {
            return "Help Text";
          }
          return null; // Valid
        }}
        validateOnChange={true}
        validateOnBlur={false}
      />
    );
  },
};


export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => {
    const [value1, setValue1] = useState("");
    return (
      <div className="flex flex-col gap-6 w-[400px]">
        <InputText />
        <InputText label="Label" value={value1} onChange={(e) => setValue1(e.target.value)} />
        <InputText label="Label" defaultValue="Post title" />
        <InputText label="Label" error="Help Text" defaultValue="Post title" />
        <InputText disabled />
      </div>
    );
  },
};

