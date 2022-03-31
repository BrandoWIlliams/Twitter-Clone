import Head from "next/head";
import Login from "./Login";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { useRouter } from "next/router";
import Widgets from "../components/Widgets";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { authUser } from "../atoms/firebaseAuthAtom";
import useFirebaseAuth from "../components/hooks/useFirebaseAuth";

export default function Home({ trendingResults, followingResults, providers }) {
  const { user, load } = useFirebaseAuth();

  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const auth = getAuth();
  const router = useRouter();
  useEffect(() => {
    if (user == null) {
      router.push("/Login");
    }
  }, []);

  if (user == null) {
    // router.push("/Login");
    // return <Login />;
  }

  return (
    <div>
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="overflow-hidden bg-black min-h-screen flex ">
        <button
          className="text-white border bg-red-500 w-96 h-40"
          onClick={() => {
            signOut(auth)
              .then(() => {
                // Sign-out successful.
                console.log("completed");
              })
              .catch((error) => {
                // An error happened.
                console.log(error);
              });
          }}
        >
          Logout
        </button>

        {/* <Sidebar /> */}
        {/* The main feed - always visible  */}
        {/* <Feed /> */}
        {/* Suggested bar on the right - hidden on mobile */}
        {/* <Widgets
          trendingResults={trendingResults}
          followResults={followingResults}
        /> */}

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

  return {
    props: {
      trendingResults,
      followingResults,
    },
  };
}
