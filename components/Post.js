import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";
import rtIcon from "../images/retweetIcon.svg";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  LogoutIcon,
  RefreshIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { db } from "../firebase";
import Input from "../components/Input";

function Post({ id, post, postPage }) {
  // const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [replyInput, setReplyInput] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  // const likePost = async () => {
  //   if (liked) {
  //     await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
  //   } else {
  //     await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
  //       username: session.user.name,
  //     });
  //   }
  // };

  const sendReplyTweet = async (e) => {
    e.preventDefault();

    // await addDoc(collection(db, "posts", id, "comments"), {
    //   comment: replyInput,
    //   username: session.user.name,
    //   tag: session.user.tag,
    //   userImg: session.user.image,
    //   timestamp: serverTimestamp(),
    // });
    setReplyInput("");
  };

  return (
    <div
      className={`p-3 ${
        !postPage && "cursor-pointer hover:bg-[#0c0b0b]"
      } flex border-b border-gray-500 `}
      // onClick={() => router.push(`/${id}`)}
    >
      {!postPage && (
        <img
          src={post?.userImg}
          alt=""
          className="h-11 w-11 rounded-full mr-4"
        />
      )}
      <div className="flex flex-col space-y-2 w-full ">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt="Profile Pic"
              className="h-11 w-11 rounded-full mr-4"
            />
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !postPage && "inline-block"
                }`}
              >
                {post?.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
              >
                @{post?.tag}
              </span>
            </div>
            {!postPage && " · "}

            <span className="hover:underline text-sm sm:text-[15px]">
              {!postPage && (
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
              )}
            </span>
            {!postPage && (
              <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                {post?.text}
              </p>
            )}
          </div>
          <div className="icon group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        {postPage && (
          <p className="text-[#d9d9d9] mt-0.5 text-xl">{post?.text}</p>
        )}
        <img
          src={post?.image}
          alt=""
          className="rounded-2xl  max-h-[500px] max-w-[350px] lg:max-w-md lg:max-h-[600px] xl:max-w-md 2xl:max-w-md xl:max-h-[700px] md:max-w-md object-fill "
        />
        {postPage && (
          <div className=" border-b border-zinc-800">
            <p className="text-gray-500 py-2 text-[15px] border-b border-zinc-800">
              <Moment format="HH:mm · MMM · DD, YYYY · ">
                {post?.timestamp?.toDate()}
              </Moment>
              Twitter for iphone lol
            </p>
            <p className="text-white py-4">
              11.5K <span className="spanComments">Retweets</span>
              872 <span className="spanComments">Quote Tweets</span>
              200.5k <span className="spanComments">Likes</span>
            </p>
          </div>
        )}
        <div
          className={`text-[#6e767d] flex justify-between ${
            !postPage && `w-8/12 pt-3 `
          } ${postPage && "px-8 border-b border-zinc-800 w-full py-4"}`}
        >
          <div
            className="flex items-center group"
            onClick={(e) => {
              e.stopPropagation();
              setPostId(id);
              setIsOpen(true);
            }}
          >
            <div className="icon2 group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>

          {/* {session.user.uid === post?.id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", id));
                router.push("/");
              }}
            >
              <div className="icon2 group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1 group">
              <div className="icon2 group-hover:bg-green-500/10">
                <RefreshIcon className="h-5 group-hover:text-green-500 " />
              </div>
            </div>
          )} */}

          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon2 group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <div className="icon2 group">
            <LogoutIcon className="h-5 group-hover:text-[#1d9bf0] -rotate-90" />
          </div>
          {/* <div className="icon2 group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div> */}
        </div>
        {postPage && (
          <div className="py-2 flex space-x-3 items-center">
            {/* <img
              src={session.user.image}
              alt=""
              className="rounded-full h-14 w-14 place-self-start"
            /> */}
            <textarea
              className="bg-transparent mt-3 text-[#d9d9d9] tracking-wide outline-none min-h-[50px] text-lg w-full h-[40px] max-h-[200px]"
              placeholder="Tweet your reply"
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              rows="2"
            ></textarea>
            <button
              className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md 
            hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!replyInput.trim()}
              onClick={sendReplyTweet}
            >
              Reply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
