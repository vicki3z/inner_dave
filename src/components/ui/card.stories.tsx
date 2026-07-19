import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: { layout: "centered" },
  // Use the toolbar theme switch (top bar) to view every story in light and dark.
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <p className="text-ink">A surface that carries content.</p>
    </Card>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Card className="w-80">
      <h3 className="font-serif text-ink text-lg">Today</h3>
      <p className="mt-2 text-ink-soft text-sm">
        The quiet weather of an ordinary day - noticed, not graded.
      </p>
    </Card>
  ),
};
