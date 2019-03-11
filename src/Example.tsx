import React, { FC } from "react";

interface StandardProps<T> {
  bindings: T;
}

interface ExampleBindings {
  text: string;
}

type Props = StandardProps<ExampleBindings>;

const Example: FC<Props> = ({
  bindings,
}) => {

  return (
    <div>
      {bindings.text}
    </div>
  );
};

export default Example;

export const ExampleHello: FC<Partial<Props>> = ({
  bindings,
}) => {

  const defaultBindings: ExampleBindings = {
    text: "hello",
  };

  // merge
  const _ = { ...defaultBindings, ...bindings };

  return (
    <Example bindings={_} />
  );
};

// enum?
export type ExamplePreset = "hello" | "goodbye";

export const ExampleWithPreset: FC<{ preset: ExamplePreset }> = ({ preset }) => {
  switch (preset) {
    case "hello":
      return <ExampleHello />;
    default:
      throw `no preset found for ${preset}`;
  };
};

export const augmentWithPreset = <T extends {}>(
  WrappedComponent: FC<StandardProps<T>>,
  presetBindings: T
) => {
  const hoc = ({ bindings, ...props }: Partial<StandardProps<Partial<T>>>) => {

    const _ = { ...presetBindings, ...bindings };

    return (
      <WrappedComponent bindings={_} {...props} />
    );
  };

  return hoc;
};

export const ExampleGoodbye = augmentWithPreset<ExampleBindings>(Example, { text: "goodbye" });
