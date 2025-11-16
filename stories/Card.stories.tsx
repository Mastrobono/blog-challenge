import type { Meta, StoryObj } from "@storybook/react";
import Card from "../components/features/Card";
import Container from "../components/ui/Container";

const meta = {
  title: "Features/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["dark", "light"],
    },
    titleSize: {
      control: "select",
      options: ["normal", "large"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    imageSrc: "/assets/hero-placeholder.png",
    imageAlt: "Security operation",
    postTitle: "A Global Police Operation Just Took Down the Notorious LockBit",
    slug: "lockbit-operation",
    readTime: "6 mins",
    variant: "light",
    titleSize: "normal",
    badge: "Security",
    onReadClick: (slug) => console.log("Read clicked:", slug),
  },
  render: (args) => (
    <Container>
      <div className="w-full md:w-[400px] h-[500px]">
        <Card {...args} />
      </div>
    </Container>
  ),
};

export const Dark: Story = {
  args: {
    imageSrc: "/assets/hero-placeholder.png",
    imageAlt: "Security operation",
    postTitle: "A Global Police Operation Just Took Down the Notorious LockBit",
    slug: "lockbit-operation",
    readTime: "6 mins",
    variant: "dark",
    titleSize: "normal",
    badge: "Security",
    onReadClick: (slug) => console.log("Read clicked:", slug),
  },
  render: (args) => (
    <Container>
      <div className="w-full md:w-[400px] h-[500px]">
        <Card {...args} />
      </div>
    </Container>
  ),
};

export const WithAvatar: Story = {
  args: {
    imageSrc: "/assets/hero-placeholder.png",
    imageAlt: "Tech article",
    postTitle: "The first rule of the extreme dishwasher loading facebook group is...",
    slug: "dishwasher-group",
    readTime: "6 mins",
    variant: "light",
    titleSize: "normal",
    avatar: {
      src: "https://i.pravatar.cc/150?img=1",
      alt: "Author avatar",
      name: "John Doe",
    },
    onReadClick: (slug) => console.log("Read clicked:", slug),
  },
  render: (args) => (
    <Container>
      <div className="w-full md:w-[400px] h-[500px]">
        <Card {...args} />
      </div>
    </Container>
  ),
};

export const LargeTitle: Story = {
  args: {
    imageSrc: "/assets/hero-placeholder.png",
    imageAlt: "Hero article",
    postTitle: "A Global Police Operation Just Took Down the Notorious LockBit",
    slug: "lockbit-operation",
    readTime: "6 mins",
    variant: "light",
    titleSize: "large",
    badge: "Security",
    onReadClick: (slug) => console.log("Read clicked:", slug),
  },
  render: (args) => (
    <Container>
      <div className="w-full md:w-[400px] h-[500px]">
        <Card {...args} />
      </div>
    </Container>
  ),
};

