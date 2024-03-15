import { useParams } from "react-router-dom";

export default function DynamicSegmentExPage() {
  let { name } = useParams();
  console.log(name);

  return (
    <div data-page="dynamic-segment-ex-page">
      <h1>Dynamic Segment Example Page</h1>
      <p>{name}</p>
    </div>
  );
}
