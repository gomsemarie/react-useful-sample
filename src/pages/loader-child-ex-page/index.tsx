import { useLayoutEffect } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";

export default function LoaderChildExPage() {
  const parentData = useRouteLoaderData("parent-loader-ex") as string;
  const data = useLoaderData() as string;

  // useLayoutEffect로 랜더링 이전에 데이터를 확인할 수 있음
  useLayoutEffect(() => {
    console.log(parentData, data);
  }, []);

  return (
    <div data-page="loader-child-ex-page">
      <h1>Loader Child Example Page</h1>
      <p>{`${parentData}, ${data}`}</p>
    </div>
  );
}
