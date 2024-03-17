import { useState } from "react";
import Input from "../../component/input";

export default function ComponentExPage() {
  const [valA, setValA] = useState<string | number>("");
  const [valB] = useState<string>("으악새는 으악하고 웁니다");

  return (
    <div data-page="component-ex-page">
      {/* value, onChange를 모두 넘겨주는 경우 */}
      <Input value={valA} onChange={setValA} />
      {/* onChange만 넘겨주는 경우 */}
      <Input.Number
        onChange={(value) => {
          console.log(value);
        }}
        unit="원"
      />
      {/* value만 넘겨주는 경우 */}
      <Input.CustomStyleVariation value={valB} />
    </div>
  );
}
