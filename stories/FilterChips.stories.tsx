import type { Meta, StoryObj } from "@storybook/react";
import FilterChips from "../components/features/FilterChips";
import { FilterProvider } from "../contexts/FilterContext";
import Container from "../components/ui/Container";
import React, { useState } from "react";

const meta = {
  title: "Features/FilterChips",
  component: FilterChips,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title text (default: 'Topics')",
    },
    chips: {
      control: "object",
      description: "Array of chip items",
    },
    activeChips: {
      control: "object",
      description: "Array of active chip IDs",
    },
    onChipToggle: {
      action: "chipToggled",
      description: "Callback when a chip is toggled",
    },
  },
  decorators: [
    (Story, context) => {
      const [activeChips, setActiveChips] = useState<string[]>(["all"]);
      
      const handleToggle = (chipId: string) => {
        setActiveChips((prev) => {
          if (chipId === "all") {
            return prev.includes("all") ? [] : ["all"];
          } else {
            const withoutAll = prev.filter((id) => id !== "all");
            if (withoutAll.includes(chipId)) {
              const newFilters = withoutAll.filter((id) => id !== chipId);
              return newFilters.length === 0 ? ["all"] : newFilters;
            } else {
              return [...withoutAll, chipId];
            }
          }
        });
        context.args.onChipToggle?.(chipId);
      };

      return (
        <Container>
          <Story
            args={{
              ...context.args,
              activeChips,
              onChipToggle: handleToggle,
            }}
          />
        </Container>
      );
    },
  ],
} satisfies Meta<typeof FilterChips>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleChips = [
  { id: "technology", label: "Technology" },
  { id: "design", label: "Design" },
  { id: "business", label: "Business" },
  { id: "marketing", label: "Marketing" },
  { id: "development", label: "Development" },
];

export const Default: Story = {
  args: {
    title: "Topics",
    chips: sampleChips,
    activeChips: ["all"],
    onChipToggle: (chipId: string) => {
      console.log("Chip toggled:", chipId);
    },
  },
};

export const WithActiveFilters: Story = {
  args: {
    title: "Topics",
    chips: sampleChips,
    activeChips: ["technology", "design"],
    onChipToggle: (chipId: string) => {
      console.log("Chip toggled:", chipId);
    },
  },
};

