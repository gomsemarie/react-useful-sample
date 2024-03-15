import { useLayoutEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

export default function LoaderParentExPage() {
  const data = useLoaderData() as string;

  // useLayoutEffect로 랜더링 이전에 데이터를 확인할 수 있음
  useLayoutEffect(() => {
    console.log(data);
  }, []);

  return (
    <div data-page="loader-parent-ex-page">
      <h1>Loader Parent Example Page</h1>
      <p>{data}</p>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
