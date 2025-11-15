import type { Meta, StoryObj } from "@storybook/react";
import FilteredPosts from "../components/features/FilteredPosts";
import { FilterProvider } from "../contexts/FilterContext";
import React from "react";

const meta = {
  title: "Features/FilteredPosts",
  component: FilteredPosts,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#000000",
        },
      ],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      // Don't provide initialChips so they are extracted from API
      return (
        <FilterProvider initialActiveFilters={["all"]}>
          <Story />
        </FilterProvider>
      );
    },
  ],
  argTypes: {
    title: {
      control: "text",
      description: "Title for the filter chips section",
    },
    apiEndpoint: {
      control: "text",
      description: "API endpoint for fetching posts",
    },
  },
} satisfies Meta<typeof FilteredPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Topics",
  },
};

