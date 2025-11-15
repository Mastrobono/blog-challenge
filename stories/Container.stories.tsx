import type { Meta, StoryObj } from "@storybook/react";
import Container from "../components/ui/Container";

const meta = {
  title: "UI/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="text-white">
        <h2 className="text-2xl mb-4">Container Example</h2>
        <p>This container has:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Black background</li>
          <li>64px horizontal padding</li>
          <li>126px top padding</li>
          <li>64px bottom padding</li>
        </ul>
      </div>
    ),
  },
};

