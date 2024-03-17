import { useState } from "react";

/**
 * 가장 기본적인 Input 컴포넌트 입니다.
 * value로 string 또는 number를 받을 수 있는 인터페이스를 제공합니다.
 * InputCore 컴포넌트를 사용하며 variation은 "default"로 설정됩니다.
 */
type InputProps = {
  value?: string | number;
  onChange?: (value: string | number) => void;
};

function Input(props: InputProps) {
  return <InputCore {...props} variation="default" />;
}

/**
 * 모든 Input 컴포넌트 Variation에 대응이 가능한 Core 컴포넌트 입니다.
 * 특정 Variation만 가지고 있는 속성은 optional하게, 모든 컴포넌트에 있는 속성은 required로 정의되어 있습니다(모든 곳에서 사용하는 속성이지만 하나라도 optional 하다면 optional로).
 * Variation에 따라 내부에서 기능과 UI가 분기됩니다.
 */
type InputCoreProps<T> = {
  variation: "default" | "number" | "custom";
  value?: T;
  onChange?: (value: T) => void;
  unit?: string; // <Input.Number>에서만 사용할 수 있는 속성입니다.
  styleComponent?: (props: InputCoreProps<T>) => JSX.Element;
};

function InputCore<T extends string | number>(props: InputCoreProps<T>) {
  const { variation, unit, styleComponent: StyleComponent } = props;
  const [state, setState, onChangeWrapped] = useSelectState<T>({
    ...props,
  });

  // 내부에서 variation에 따라 분기되는 로직
  if (variation === "default") {
    const val = state as InputProps["value"];
    console.log(val); // string | number
  } else if (variation === "number") {
    const val = state as Input.InputNumberProps["value"];
    console.log(val); // number
  }

  // Custom Style 적용
  if (StyleComponent !== undefined) {
    return <StyleComponent {...props} />;
  }

  return (
    <div data-component={`input-${variation}`}>
      <input
        type="text"
        value={state ?? ""}
        onChange={(e) => onChangeWrapped(e.target.value as T)}
      />
      {unit && <span>{unit}</span>}
    </div>
  );
}

namespace Input {
  /**
   * Input.Number 컴포넌트는 InputCore 컴포넌트를 사용하며, value는 number를 받고 variation은 "number"로 설정됩니다.
   * 다른 Input Variation과 다르게 unit 속성을 받을 수 있습니다.
   */
  export type InputNumberProps = {
    value?: number;
    onChange?: (value: number) => void;
    unit?: string;
  };
  export function Number(props: InputNumberProps) {
    return <InputCore {...props} variation="number" />;
  }

  /**
   * Input.CustomStyleVariation 컴포넌트는 커스터마이징 된 UI를 가지는 컴포넌트 입니다.
   */
  export type CustomStyleVariationProps = {
    value?: string;
    onChange?: (value: string) => void;
  };
  export function CustomStyleVariation(props: CustomStyleVariationProps) {
    return (
      <InputCore {...props} variation="custom" styleComponent={CustomStyle} />
    );
  }
  function CustomStyle<T>({ value, variation }: InputCoreProps<T>) {
    return (
      <div
        data-component={`input-${variation}`}
      >{`Custom Style Input: ${value}`}</div>
    );
  }
}

/**
 * value와 onChange를 받는 여부에 따라 state를 관리하는 커스텀 훅입니다.
 */
function useSelectState<T>({
  value,
  onChange,
}: {
  value?: T;
  onChange?: (value: T) => void;
}): [T | undefined, (value: T) => void, (value: T) => void] {
  const [state, setState] = useState<T | undefined>();

  const onChangeWrapped = (value: T) => {
    onChange && onChange(value);
    setState(value);
  };

  return [value !== undefined ? value : state, setState, onChangeWrapped];
}

export default Input;
