import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { AuthUserProvider } from "../atoms/firebaseAuthAtom";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
