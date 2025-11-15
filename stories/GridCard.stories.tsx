import type { Meta, StoryObj } from "@storybook/react";
import GridCard from "../components/features/GridCard";

const meta = {
  title: "Features/GridCard",
  component: GridCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mainCard: {
      control: "object",
      description: "Object with position and index. If null, all 3 cards will have the same size.",
    },
  },
} satisfies Meta<typeof GridCard>;

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
    mainCard: { position: "left", index: 0 },
  },
  render: (args) => (
    <div className="w-full max-w-6xl md:h-[800px] flex flex-col">
      <div className="h-full flex-1">
        <GridCard {...args} />
      </div>
    </div>
  ),
};

export const MainCardRight: Story = {
  args: {
    cards: sampleCards,
    mainCard: { position: "right", index: 0 },
  },
  render: (args) => (
    <div className="w-full max-w-6xl md:h-[800px] flex flex-col">
      <div className="h-full flex-1">
        <GridCard {...args} />
      </div>
    </div>
  ),
};

export const DarkVariant: Story = {
  args: {
    cards: sampleCards.map((card) => ({ ...card, variant: "dark" as const })),
    mainCard: { position: "left", index: 0 },
  },
  render: (args) => (
    <div className="w-full max-w-6xl bg-neutral-black p-8 md:h-[800px] flex flex-col">
      <div className="h-full flex-1">
        <GridCard {...args} />
      </div>
    </div>
  ),
};

export const MainCardIndex1: Story = {
  args: {
    cards: sampleCards,
    mainCard: { position: "left", index: 1 }, // Second card will be full height
  },
  render: (args) => (
    <div className="w-full max-w-6xl md:h-[800px] flex flex-col">
      <div className="h-full flex-1">
        <GridCard {...args} />
      </div>
    </div>
  ),
};

export const MainCardIndex2Right: Story = {
  args: {
    cards: sampleCards,
    mainCard: { position: "right", index: 2 }, // Third card will be full height on the right
  },
  render: (args) => (
    <div className="w-full max-w-6xl md:h-[800px] flex flex-col">
      <div className="h-full flex-1">
        <GridCard {...args} />
      </div>
    </div>
  ),
};

export const EqualSize: Story = {
  args: {
    cards: sampleCards,
    mainCard: null, // All 3 cards will have the same size
  },
  render: (args) => (
    <div className="w-full max-w-6xl md:h-[600px] flex flex-col">
      <div className="h-full flex-1">
        <GridCard {...args} />
      </div>
    </div>
  ),
};

