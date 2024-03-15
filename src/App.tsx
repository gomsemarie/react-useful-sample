import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { SampleLayout } from "./layouts";
import {
  ComponentExPage,
  DynamicSegmentExPage,
  ErrorPage,
  HomePage,
  LoaderChildExPage,
  LoaderParentExPage,
  NotFoundPage,
  OptionalSegmentExPage,
  SplatsExPage,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Error Boundary 처리 */}
      <Route errorElement={<ErrorPage />}>
        <Route path="/" element={<HomePage />} />
        {/* Dynamic Segment 예시 */}
        <Route path="/ds-ex/:name" element={<DynamicSegmentExPage />} />
        {/* Optional Segment 예시 */}
        <Route
          path="/os-ds-ex/:opt?/:req"
          element={<OptionalSegmentExPage />}
        />
        <Route
          path="/os-path-ex/opt?/:req"
          element={<OptionalSegmentExPage />}
        />
        {/* Splats 예시 */}
        <Route path="/splats-ex/*" element={<SplatsExPage />} />
        {/* Layout Routes 예시 */}
        <Route element={<SampleLayout />}>
          <Route path="/layout-ex" element={<h2>Layout Example</h2>} />
        </Route>
        {/* Index 예시 */}
        <Route path="/index-ex" element={<SampleLayout />}>
          <Route index element={<h2>Index Example</h2>} />
        </Route>
        {/* Loader 예시 */}
        <Route
          id="parent-loader-ex"
          path="/loader-ex"
          element={<LoaderParentExPage />}
          loader={async () => {
            return "loader parent response";
            // return fetch(`/fake/api/${params.id}.json`);
          }}
        >
          <Route
            path=":id"
            element={<LoaderChildExPage />}
            loader={async ({ params }) => {
              return `loader child response - ${params.id}`;
            }}
          />
        </Route>
        {/* Component 구조 예시 */}
        <Route path="/comp-ex" element={<ComponentExPage />} />
        {/* Not Found Page 예시 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
