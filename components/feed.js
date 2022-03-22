import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Input from "./Input";
import Post from "./Post";
import TopBar from "./topBar";

function Feed() {
  const [posts, setPosts] = useState([]);
  // * Creates a listener that will re-render the div that maps through the posts everytime a new post is added
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );
  return (
    <div className=" h-screen overflow-y-auto md:w-[900px] sm:w-full flex-grow border-x  border-gray-600 ">
      <TopBar />
      <div className="hidden md:block">
        <Input />
      </div>
      <div className="pb-72">
        {/* //! Maps through the posts in the firestore */}
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
      {/* //! Remove Scroll bar or change scroll bar */}
    </div>
  );
}

export default Feed;
