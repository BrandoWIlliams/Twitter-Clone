import { atom } from "recoil";

export const authUser = atom({
  key: "authUser",
  default: null,
});
export const loading = atom({
  key: "loading",
  default: true,
});
