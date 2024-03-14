// Input
type InputProps = {
  value?: string | number;
  regex?: RegExp;
};

function Input(props: InputProps) {
  return <InputCore {...props} variation="default" />;
}

// Input Core
type InputCoreProps<T> = {
  variation: "default" | "number" | "email";
  value?: T;
  regex?: RegExp;
  only?: string;
  styleComponent?: (props: InputCoreProps<T>) => JSX.Element;
};
function InputCore<T extends string | number>(props: InputCoreProps<T>) {
  const { variation, value } = props;

  if (variation == "default") {
    const val = value as InputProps["value"];
    console.log(val);
  } else if (variation == "number") {
    const val = value as Input.InputNumberProps["value"];
    console.log(val);
  }

  return <InputStyle<T> {...props} />;
}

function InputStyle<T>(props: InputCoreProps<T>) {
  const { variation, styleComponent: StyleComponent } = props;
  if (StyleComponent != undefined) {
    return <StyleComponent {...props} />;
  }

  if (variation === "number") {
    return <div>{`Number Style: ${variation}`}</div>;
  }

  return <div>{`Default Style: ${variation}`}</div>;
}

// Variation
namespace Input {
  // Input.Number
  export type InputNumberProps = {
    value?: number;
    regex: RegExp;
    only?: string;
  };
  export function Number(props: InputNumberProps) {
    return <InputCore {...props} variation="number" />;
  }
  export function CustomNumber(props: InputNumberProps) {
    return (
      <InputCore styleComponent={CustomStyle} {...props} variation="number" />
    );
  }
  function CustomStyle<T>({ variation }: InputCoreProps<T>) {
    return <div>{`Custom Number Style: ${variation}`}</div>;
  }
  //   export function Email() {
  //     return <InputCore value={''} variation="email" />;
  //   }
}

export default Input;
