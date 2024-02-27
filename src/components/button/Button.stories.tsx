import * as React from "react";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";

import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps } from "./Button";

export default {
  title: "Button",
  component: Button,
  argTypes: { onClick: { action: "clicked" } },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Button component",
      },
    },
  },
} as Meta;

const PrimaryLargeButtonTemplate = (args: any) => (
  <Button type="primary" {...args}>
    Button Text
  </Button>
);

export const PrimaryButton: Story<ButtonProps> =
  PrimaryLargeButtonTemplate.bind({});
PrimaryButton.args = {
  size: "large",
  variant: "primary",
  btnType: "button",
};

// Interaction tests
PrimaryButton.play = async ({ args, canvasElement }: any) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button"));
  await expect(args.onClick).toHaveBeenCalled();
};
