import { Action, ActionPanel, Keyboard } from "@raycast/api";
import React, { FC } from "react";
import { RollForm } from "types";

const shortcuts: Record<string, Keyboard.Shortcut> = {
  submit: { key: "return", modifiers: [] },
};

interface Props {
  onSubmit: Action.SubmitForm.Props<RollForm>["onSubmit"];
}

export const FormActions: FC<Props> = ({ onSubmit }) => {
  return (
    <ActionPanel>
      <Action.SubmitForm shortcut={shortcuts.submit} title={"Roll!"} onSubmit={onSubmit} />
    </ActionPanel>
  );
};
