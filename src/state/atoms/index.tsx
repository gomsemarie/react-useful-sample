import { useEffect, useRef, useState } from "react";
import { atom, selector, useRecoilState } from "recoil";

export interface IContentTypes {
  pageOption: {
    order: number;
  };
  listData: {}[];
  param: string;
}

// export const contentState = atom<IContentTypes>({
//   key: "content",
//   default: {
//     name: "test",
//     status: false,
//     message: "",
//   },
// });

// export const nameSelector = selector<IContentTypes["name"]>({
//   key: "contentStateSelector.name",
//   get: ({ get }) => {
//     const data = get(contentState);
//     return data.name;
//   },
//   set: ({ set }, newValue) => {
//     set(contentState, (s) => {
//       return {
//         ...s,
//         name: newValue as string,
//       };
//     });
//   },
// });

// function TestPage() {
//   const [a, setA] = useState<number>();
//   const [b, setB] = useRecoilState(contentState);

//   const [c, setC] = useState<string>("");
//   const [d, setD] = useState<string>("");

//   const [e, setE] = useState<{
//     c: string;
//     d: string;
//   }>({
//     c: "",
//     d: "",
//   });

//   function setEC(val: string) {
//     setE({
//       ...e,
//       c: val,
//     });
//   }

//   function setED(val: string) {
//     setE({
//       ...e,
//       d: val,
//     });
//   }

//   <ReactSheet onChange={() => {
//     setState(1);

//   }}/>

//   function ReactSheet({ onChange }:{ onChange: () => void }) {
// useEffect(() => {
//     window.addEventListener("click", () => {
//       onChange();
//     }
// }, []);

//     return <div></div>
//   }

//   useEffect(() => {

//   }, [e]);

//   // ReactDOM
//   // DOM
//   const [_state, _setState] = useState<number>(0);
//   const state = useRef<number>(_state);
//   const setState = (value: number) => {
//     state.current = value;
//     _setState(value);
//   }

//   useEffect(() => {
//     console.log('asdsad');
//   }, [state])

//   return <div>{state.current}</div>

//   window.addEventListener("click", () => {
//     setState(1);
//   });

//   return (
//     <form>
//       <input
//         type="text"
//         value={e.c}
//         onChange={(ev) => {
//           setE({
//             ...e,
//             c: ev.target.value,
//           });
//         }}
//       />
//       <input type="text" value={e.d} onChange={(e) => setEC(e.target.value)} />
//       <button />
//     </form>
//   );
// }
