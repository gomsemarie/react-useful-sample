# React recoil 전역 상태관리 라이브러리

```tsx
import { atom } from "recoil";

export interface IContentTypes {
  name: string;
  status: boolean;
  message: string;
}

//recoil state 생성
export const contentState = atom<IContentTypes>({
  key: "content",
  default: {
    name: "test",
    status: false,
    message: "",
  },
});
```

```tsx
import { selector } from "recoil";

export const sampleSelector = selector<IContentTypes>({
  key: "sampleSelector",
  get: ({ get }) => get(sampleState) * 2,
  set: ({ set }, newValue) => set(sampleState, newValue / 2),
});
```

```tsx
import { useState, useEffect } from 'react';

//state, recoil import
import { contentState } from './state';
import { useSetRecoilState, useRecolValue } from 'recoil';

export default function sample() {

    const [reqContent, setReqContent] = useState({
        name: "sample",
        status: true,
        message: "테스트 메세지"
    });

    //recoil 사용 선언부
    const setContent = useSetRecoilState(contentState);
    const content = useRecolValue(contentState);

    useEffect(()=>{
        //recoil setting
        setContent(reqContent);
    },[])

    return (
    	{content && (
        	<div>
            	{content.name},
                {content.status},
                {content.message}
            </div
        )}
    );
}
```
