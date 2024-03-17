# 평범하지 않은 React 컴포넌트 만들기

React 디자인 패턴에 대한 내용들은 대부분 구조 설계(특히 폴더 구조 관리)와 business logic - view logic의 관리 부분에 초점이 맞춰져 있습니다.

React에서 사용하고 있는 여러 디자인 패턴 중에서 가장 대중적이며 관리 측면에서 뛰어난 컴포넌트를 만드는 방법을 통해 확장성이 좋은 컴포넌트를 만들어봅시다.

## Presentational & Container Component Pattern

2015년 Dan Abramov가 처음 소개한 패턴으로, 가장 기본적이고 유명한 패턴입니다.

화면에 표시하는 것과 동작, data fetch 등의 business logic을 분리하여 컴포넌트를 개발하는 방법으로 hooks의 도입 이후 아래 디자인 패턴이 상위 호환에 지배적이므로 이 디자인 패턴의 취지만 알아두시면 좋을 것 같아 소개만 하고 넘어가겠습니다.

## Component - Custom Hook

hooks의 도입 이후, Dan Abramov가 새롭게 제안한 방식으로 Typescript와 같이 사용하면 더 많은 이점을 가져올 수 있는 매우 좋은 디자인 패턴입니다.

Custom hook을 통해 data, fetch 등의 business logic을 정의하고 컴포넌트에서는 hook을 사용하여 기능 연결 및 화면에 표시될 UI를 구현합니다.

`Component - Custom Hook` 패턴이 적용되기 이전 예시와 적용 후를 비교해 봅시다.

- Before

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  const addCount = () => {
    setCount((state) => {
      return state + 1;
    });
  };
  const reduceCount = () => {
    setCount((state) => {
      if (state === 0) return state;
      return state - 1;
    });
  };

  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={addCount}>+</button>
        <button onClick={reduceCount}>-</button>
      </div>
    </div>
  );
}
```

- After

```tsx
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  const addCount = () => {
    setCount((state) => {
      return state + 1;
    });
  };
  const reduceCount = () => {
    setCount((state) => {
      if (state === 0) return state;
      return state - 1;
    });
  };

  return [count, setCount, addCount, reduceCount];
}

function Counter() {
  const [count, setCount, addCount, reduceCount] = useCounter();

  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={addCount}>+</button>
        <button onClick={reduceCount}>-</button>
      </div>
    </div>
  );
}
```

디자인 패턴 적용 후 컴포넌트 내에는 로직이 사라지고 구현된 hook의 기능을 연결하는 것으로 컴포넌트를 구현합니다.
<br>이렇게 구현하게 되면 UI와 로직 부분이 분리되어 관리가 유연해지고 hook을 재사용할 수 있어 다른 컴포넌트에서도 해당 기능을 사용할 수 있게 됩니다.

이제 여기에 Typescript를 적용하여 컴포넌트에 여러 Variation을 추가하고 각 Variation 별 인터페이스를 Type Safe 하게 만들어 봅시다.
<br>만약 내가 `<Input>` 공통 컴포넌트를 만들 때 `number`타입의 값만 다루는 컴포넌트를 Variation으로 추가하고 싶다면 Typescript를 사용해 안전하게 구현할 수 있습니다.

```tsx
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
```

## Render Props 패턴 (미완성)

사용자 측면에서 UI의 자유도가 높은 컴포넌트를 만들 수 있습니다. 다만 의도하지 않은 버그가 발생할 가능성이 있으며 컴포넌트 구성이 복잡해집니다.

```tsx
<Counter>
  <Counter.Label>완전 플렉서블한 카운터가 완성되었습니다.</Counter.Label>
  <Counter.Decrease icon="-" />
  <Counter.Count />
  <Counter.Increase icon="+" />
</Counter>
```

## Compound Component 패턴 (미완성)

```tsx
cloneElement 사용
```

##
