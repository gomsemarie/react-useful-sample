import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages";
import CompExPage from "./pages/comp-ex";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      // 기존의 Route를 createRoutesFormElements에 전달하기
      <Route path="/">
        <Route path="" element={<HomePage />} />
        <Route path="comp-ex" element={<CompExPage />} />
        {/* ... etc. */}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
