// src/stories/SqlWrapper.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import SqlWrapper from "./SqlWrapper";

const meta: Meta = {
  title: "Example/SqlWrapper",
  component: SqlWrapper,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  storyName: "Default",
};
