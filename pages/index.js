import Head from "next/head";
import Image from "next/image";
import Feed from "../components/feed";
import MobileTopBar from "../components/topBar";
import Sidebar from "../components/sidebar";
import Suggested from "../components/suggested";
import styles from "../styles/Home.module.css";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Widgets from "../components/Widgets";

export default function Home({ trendingResults, followingResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  //* Basic check to see if the user is authorised. If not send him to login page
  if (!session) {
    return <Login providers={providers} />;
  }
  return (
    <div>
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="overflow-hidden bg-black min-h-screen flex ">
        {/* Side Bar - hidden on mobile */}
        <Sidebar />
        {/* The main feed - always visible  */}
        <Feed />
        {/* Suggested bar on the right - hidden on mobile */}

        <Widgets
          trendingResults={trendingResults}
          followResults={followingResults}
        />
        {isOpen && <Modal />}
      </main>
    </div>
  );
}

//* Function that are called before the page is loaded on the client side (SSR)
// Todo: Why is it async here?
export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (tr) => tr.json()
  );
  const followingResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (fr) => fr.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followingResults,
      providers,
      session,
    },
  };
}
