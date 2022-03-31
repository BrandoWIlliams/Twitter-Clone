import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import MobileTopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.css";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Widgets from "../components/Widgets";
import axios from "axios";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import { authState } from "../atoms/authAtom";
export default function Home({ trendingResults, followingResults, providers }) {
  const { data: session } = useSession();
  const [loggedIn, setLoggedIn] = useRecoilState(authState);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const auth = getAuth();

  //* Basic check to see if the user is authorised. If not send him to login page
  // if (!loggedIn) {
  //   return <Login />;
  // }
  if (!loggedIn) {
    return <Login />;
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
