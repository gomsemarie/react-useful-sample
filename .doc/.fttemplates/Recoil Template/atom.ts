import { atom } from 'recoil';
// import { recoilPersist } from 'recoil-persist' /* recoil-persist code */

// const { persistAtom } = recoilPersist(); /* recoil-persist code */

export interface I<FTName | pascalcase>State {
  anyKey: string;
}

const INIT_<FTName | constantcase>_STATE: I<FTName | pascalcase>State = {
  anyKey: '',
};

const <FTName | camelcase>State = atom<I<FTName | pascalcase>State>({
  key: '<FTName | camelcase>State',
  default: INIT_<FTName | constantcase>_STATE,
  // effects_UNSTABLE: [persistAtom], /* recoil-persist code */
});

export { <FTName | camelcase>State };
