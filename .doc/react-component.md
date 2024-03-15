# React typescript 컴포넌트 디자인 패턴

## Render Props 패턴

사용자 측면에서 UI의 자유도가 높은 컴포넌트를 만들 수 있습니다. 다만 의도하지 않은 버그가 발생할 가능성이 있으며 컴포넌트 구성이 복잡해집니다.

```tsx
<Counter>
  <Counter.Label>완전 플렉서블한 카운터가 완성되었습니다.</Counter.Label>
  <Counter.Decrease icon="-" />
  <Counter.Count />
  <Counter.Increase icon="+" />
</Counter>
```

## Compound Component 패턴

```tsx
cloneElement 사용
```

##
