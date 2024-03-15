import { Outlet } from "react-router-dom";

export default function SampleLayout() {
  return (
    <div>
      <h1>Sample Layout</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
