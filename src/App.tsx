import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import CompExPage from "./pages/comp-ex";

function App() {
  return (
    // <BrowserRouter basename="/app">
    <BrowserRouter>
      <Routes>
        <Route path="/" errorElement={<ErrorBoundary />}>
          <Route path="" element={<HomePage />} />
          <Route path="comp-ex" element={<CompExPage />} />
          // Path - dynamic segment
          <Route
            path="users/:id"
            element={<HomePage />}
            // 페이지 컴포넌트가 생성되기 전에 컴포넌트에 데이터를 전달한다
            // 해당 페이지에서 useLoaderData()로 데이터를 가져올 수 있음
            // 하위 라우트에서 useRouteLoaderData('id')로 상위 라우트의 데이터를 가져올 수 있음(<Router id={id} /> 필요)
            // useLayoutEffect로 랜더링 이전에 데이터를 확인할 수 있음
            loader={async ({ params }) => {
              // return fetch(`/fake/api/${params.id}.json`);
              console.log(params.id);
            }}
          />
          // Splats - star segment(*)
          <Route path="splats/*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function ErrorBoundary() {
  return <h1>Something went wrong.</h1>;
}

export default App;
