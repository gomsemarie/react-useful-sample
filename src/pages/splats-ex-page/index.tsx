import { useParams } from "react-router-dom";

export default function SplatsExPage() {
  let { org, "*": splat } = useParams();

  return (
    <div data-page="splats-ex-page">
      <h1>Splats Example Page</h1>
      <p>{splat}</p>
    </div>
  );
}
