# React 라우터

React에서 가장 많이 사용하고있는 라우팅 라이브러리 `react-router-dom`에 대한 내용입니다.
`react-router-dom`에서는 컴포넌트 형태로 라우팅을 정의할 수있도록 기능을 제공합니다.

## 라우팅 정의

`react-router-dom`은 여러 라우터를 제공하지만 일반적인 웹에서는 `<BrowserRouter>`를 사용하는 것을 권장합니다.

`<Routes>`내부에 원하는 라우팅을 추가할 수 있으며 자식 요소를 통해 하위 라우팅을 정의할 수 있습니다.

```tsx
function App() {}
<BrowserRouter>
  <Routes>
    <Route path="/" errorElement={<ErrorBoundary />}>
      <Route path="" element={<HomePage />} />
      <Route path="example" element={<ExamplePage />} />
    </Route>
  </Routes>
</BrowserRouter>;
```
