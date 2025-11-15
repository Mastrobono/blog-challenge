import type { Meta, StoryObj } from "@storybook/react";
import CardGrid from "../components/features/CardGrid";

const meta = {
  title: "Features/CardGrid",
  component: CardGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mainCardPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the main card (left or right)",
    },
    mainCardIndex: {
      control: { type: "number", min: 0, max: 2, step: 1 },
      description: "Index of the card that will be full height (0-2)",
    },
  },
} satisfies Meta<typeof CardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCards = [
  {
    imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    imageAlt: "Main card",
    postTitle: "A Global Police Operation Just Took Down the Notorious LockBit",
    slug: "lockbit-operation",
    readTime: "6 mins",
    variant: "light" as const,
    titleSize: "normal" as const,
    badge: "Security",
    onReadClick: (slug: string) => console.log("Read clicked:", slug),
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    imageAlt: "Secondary card 1",
    postTitle: "The first rule of the extreme dishwasher loading facebook group is...",
    slug: "dishwasher-group",
    readTime: "6 mins",
    variant: "light" as const,
    titleSize: "normal" as const,
    badge: "Tech companies",
    onReadClick: (slug: string) => console.log("Read clicked:", slug),
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    imageAlt: "Secondary card 2",
    postTitle: "Binance's Top Crypto Crime Investigator Is Being Detained in Nigeria",
    slug: "binance-investigator",
    readTime: "6 mins",
    variant: "light" as const,
    titleSize: "normal" as const,
    badge: "Crypto",
    onReadClick: (slug: string) => console.log("Read clicked:", slug),
  },
];

export const MainCardLeft: Story = {
  args: {
    cards: sampleCards,
    mainCardPosition: "left",
  },
  render: (args) => (
    <div className="w-full max-w-6xl md:h-[800px] flex flex-col">
      <div className="h-full flex-1">
        <CardGrid {...args} />
      </div>
    </div>
  ),
};

export const MainCardRight: Story = {
  args: {
    cards: sampleCards,
    mainCardPosition: "right",
  },
  render: (args) => (
    <div className="w-full max-w-6xl md:h-[800px] flex flex-col">
      <div className="h-full flex-1">
        <CardGrid {...args} />
      </div>
    </div>
  ),
};

export const DarkVariant: Story = {
  args: {
    cards: sampleCards.map((card) => ({ ...card, variant: "dark" as const })),
    mainCardPosition: "left",
  },
  render: (args) => (
    <div className="w-full max-w-6xl bg-neutral-black p-8 md:h-[800px] flex flex-col">
      <div className="h-full flex-1">
        <CardGrid {...args} />
      </div>
    </div>
  ),
};

export const MainCardIndex1: Story = {
  args: {
    cards: sampleCards,
    mainCardPosition: "left",
    mainCardIndex: 1, // Second card will be full height
  },
  render: (args) => (
    <div className="w-full max-w-6xl md:h-[800px] flex flex-col">
      <div className="h-full flex-1">
        <CardGrid {...args} />
      </div>
    </div>
  ),
};

export const MainCardIndex2Right: Story = {
  args: {
    cards: sampleCards,
    mainCardPosition: "right",
    mainCardIndex: 2, // Third card will be full height on the right
  },
  render: (args) => (
    <div className="w-full max-w-6xl md:h-[800px] flex flex-col">
      <div className="h-full flex-1">
        <CardGrid {...args} />
      </div>
    </div>
  ),
};

