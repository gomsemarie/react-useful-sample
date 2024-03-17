# React 라우터

실제 프로젝트에서는 URL에서 파라미터를 받거나 페이지 오류 처리, 정의하지 않은 페이지, 공통 레이아웃 등의 여러 기능들이 필요해집니다.

여러 라우팅 상황에 대응이 가능하면서 React의 특징인 컴포넌트를 통한 높은 생산성을 가져갈 수 있는 `react-router-dom`라이브러리를 사용해봅시다.

## 라우팅 정의

`react-router-dom`은 여러 라우터를 제공하지만 일반적인 웹에서는 `createBrowserRouter`를 사용하는 것을 권장합니다.

`router`를 정의하여 라우팅을 추가할 수 있으며 자식 요소를 통해 중첩된 페이지를 구현할 수 있습니다.

아래 코드는 `/`, `/sample` 라우팅을 추가하는 예시입니다.

```tsx
// App.tsx
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<ErrorBoundary />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/sample" element={<SamplePage />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
```

## Dynamic Segment

URL에서 동적으로 파라미터를 받을 때 사용합니다.

- 아래 코드는 `Dynamic Segment` 라우팅을 처리하기 위한 예시입니다.

```tsx
// App.tsx
<Route path="sample/:id" element={<SamplePage />} />
```

```tsx
export default function SamplePage() {
  let { id } = useParams();
  return <div data-page="sample-page">{id}</div>;
}
```

## Optional Segment

경로 사이에 선택적으로 파라미터를 받을 때 사용합니다.

- 아래 코드는 Dynamic Segment를 선택적으로 받는 예시입니다.

```tsx
// App.tsx
<Route path="sample/:opt?/:req" element={<SamplePage />} />
```

```tsx
// url: /sample/a/b -> opt: a, req: b
// url: /sample/a -> opt: undefined, req: a
export default function SamplePage() {
  let { opt, req } = useParams();
  return <div data-page="sample-page">{`${opt}, ${req}`}</div>;
}
```

- 아래 코드는 Path를 선택적으로 받는 예시입니다.

```tsx
// App.tsx
<Route path="sample/opt?/:req" element={<SamplePage />} />
```

```tsx
// url: /sample/opt/a -> req: b
// url: /sample/a -> req: a
export default function SamplePage() {
  let { req } = useParams();
  return <div data-page="sample-page">{req}</div>;
}
```

## Splats

하위 경로를 하나의 페이지로 진입하도록 할 때 사용합니다. `*`문자를 사용하여 `splats` 경로를 정의합니다.

```tsx
// App.tsx
<Route path="sample/*" element={<SamplePage />} />
```

```tsx
// url: /sample/a/b -> splat: a/b
export default function SamplePage() {
  let { org, "*": splat } = useParams();
  return <div data-page="sample-page">{splat}</div>;
}
```

## Layout Routes

하위 경로에 해당하는 페이지에 Layout 컴포넌트를 적용할 때 사용합니다.

`<Outlet>` 컴포넌트를 통해 children 페이지를 출력할 수 있습니다.

```tsx
// App.tsx
<Route
  element={
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  }
>
  <Route path="/" element={<h2>Home</h2>} />
  <Route path="/about" element={<h2>About</h2>} />
</Route>
```

## Index

특정 Route로 시작하는 페이지들과 해당 Route path 페이지를 정의할 때 사용하는 방법입니다.

```tsx
<Route path="/teams" element={<Teams />}>
  <Route index element={<TeamsIndex />} />
  <Route path=":teamId" element={<Team />} />
</Route>
```

## Error Boundary

페이지에서 오류가 발생하거나 라우팅 과정에서 오류가 발생할 경우 `errorElement` 컴포넌트를 대신 보여줍니다.

상위 라우팅에 `errorElement`가 정의되어 있다면 하위 라우팅에서 오류 발생시 가장 가까운 상위 라우팅의 `errorElement`컴포넌트를 보여줍니다.

```tsx
// App.tsx
<Route path="sample" element={<SamplePage />} errorElement={<ErrorPage />} />
```

```tsx
export default function ErrorPage() {
  const error = useRouteError();
  return <div data-page="error-page">Oops!</div>;
}
```

## Not Found Page

라우팅 이외의 경로로 접속 시 404 페이지 처리를 위해 사용합니다.

모든 `<Route>`의 가장 아래에 `path="*"`로 라우팅을 선언해줍니다.

```tsx
...
<Route path="*" element={<NotFoundPage />} />
```

## Loader

페이지 컴포넌트가 생성되기 전에 컴포넌트에 API를 호출하여 얻은 데이터를 전달할 때 사용합니다.

```tsx
<Route
  path="/parent"
  id="parent"
  element={<SampleParentPage />}
  loader={async ({ params }) => {
    return 'loader parent response';
    // return fetch(`/fake/api/${params.id}.json`);
  }}
>
  <Route
    path="child"
    element={<SampleChildPage />}
    loader={async ({ params }) => {
      return 'loader child response';
    }}
  >
</Route>
```

```tsx
// data: 'parent page'
export default function SampleParentPage() {
  const data = useLoaderData() as string;

  // useLayoutEffect로 랜더링 이전에 데이터를 확인할 수 있음
  useLayoutEffect(() => {
    console.log(data);
  }, []);

  return (
    <div data-page="sample-parent-page">
      <p>{data}</p>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
```

```tsx
// parentData: 'parent page'
// data: 'child page'
export default function SampleChildPage() {
  const parentData = useRouteLoaderData("parent");
  const data = useLoaderData() as string;
  return <div data-page="sample-child-page">{`${parentData}, ${data}`}</div>;
}
```
