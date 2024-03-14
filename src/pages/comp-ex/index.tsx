import React from "react";
import Input from "../../component/input";

function CompExPage(props: {}) {
  return (
    <div>
      <Input />
      <Input.CustomNumber regex={RegExp("")} />
      <Input.Number regex={RegExp("")} />
    </div>
  );
}

export default CompExPage;
