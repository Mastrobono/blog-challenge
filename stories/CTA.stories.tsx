import type { Meta, StoryObj } from "@storybook/react";
import CTA from "../components/features/CTA";
import Container from "../components/ui/Container";

const meta = {
  title: "Features/CTA",
  component: CTA,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    normalText: {
      control: "text",
      description: "First part of the text (normal weight)",
    },
    semiboldText: {
      control: "text",
      description: "Second part of the text (semibold weight)",
    },
    buttonText: {
      control: "text",
      description: "Text displayed on the button",
    },
    onSubscribe: {
      action: "clicked",
      description: "Callback function when subscribe button is clicked",
    },
  },
} satisfies Meta<typeof CTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    normalText: "Sign up for our newsletter",
    semiboldText: "and get daily updates",
    buttonText: "Subscribe",
    onSubscribe: () => console.log("Subscribe clicked"),
  },
  render: (args) => (
    <Container>
      <CTA {...args} />
    </Container>
  ),
};

