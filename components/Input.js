/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import pp from "../images/profilePicture.png";
import React, { useState, useRef, useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

function Input() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojies, setShowEmojies] = useState(false);
  const [loading, setLoading] = useState(false);
  const filePickerReference = useRef(null);

  // Todo: Get better to understand what the fuck is going on here.
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  // * Using a file reader to read the selected file and display it
  const addImageToTweet = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  // ! This big boy handles sending the tweet, it creates a new collection in the firestore and uses the session data we got from using next-auth for the file
  const sendTweet = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojies(false);
  };

  // ! Need this to have access to the session data
  const { data: session } = useSession();
  return (
    <div
      className={`  p-4 flex space-x-3 items-center overflow-y-scroll ${
        loading && "opacity-60"
      } `}
    >
      <img
        src={session.user.image}
        alt=""
        className="rounded-full h-16 w-16 place-self-start"
      />

      <div className="w-full divide-y divide-gray-600">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            className="bg-transparent text-[#d9d9d9] tracking-wide outline-none min-h-[50px] text-xl w-full h-[40px] max-h-[200px]"
            placeholder="What's happening?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="2"
          ></textarea>
        </div>
        {selectedFile && (
          <div className="relative">
            <div
              className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
              onClick={() => setSelectedFile(null)}
            >
              <XIcon className="text-white h-5" />
            </div>
            <img
              src={selectedFile}
              alt=""
              className="rounded-2xl max-h-80 object-contain"
            />
          </div>
        )}
        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center space-x-4">
              <div
                className="icon"
                onClick={() => filePickerReference.current.click()}
              >
                <PhotographIcon className="icon" />
                <input
                  type="file"
                  hidden
                  onChange={addImageToTweet}
                  ref={filePickerReference}
                />
              </div>
              <div className="icon rotate-90">
                <ChartBarIcon className="icon" />
              </div>
              <div
                className="icon"
                onClick={() => setShowEmojies(!showEmojies)}
              >
                <EmojiHappyIcon className="icon" />
              </div>
              {showEmojies && (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px",
                  }}
                  theme="dark"
                />
              )}
              <div className="icon">
                <CalendarIcon className="icon" />
              </div>
            </div>
            <button
              className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md 
            hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!input.trim() && !selectedFile}
              onClick={sendTweet}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
