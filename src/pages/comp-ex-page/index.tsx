import Input from "../../component/input";

export default function ComponentExPage() {
  return (
    <div data-page="component-ex-page">
      <Input />
      <Input.CustomNumber regex={RegExp("")} />
      <Input.Number regex={RegExp("")} />
    </div>
  );
}
