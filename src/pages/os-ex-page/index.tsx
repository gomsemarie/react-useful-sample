import { useParams } from "react-router-dom";

export default function OptionalSegmentExPage() {
  let { opt, req } = useParams();
  console.log(opt, req);

  return (
    <div data-page="optional-segment-ex-page">
      <h1>Optional Segment Example Page</h1>
      <p>{`${opt}, ${req}`}</p>
    </div>
  );
}
