/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { app } from "../firebase";
import { useRouter } from "next/router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const auth = getAuth();

  return (
    <div className="w-full h-screen bg-[#0d3f61]">
      <div className="w-full max-w-sm p-6 m-auto rounded-md shadow-md bg-gray-800  left-0 right-0 top-28 absolute">
        <h1 className="text-3xl font-semibold text-center text-white">
          Login to <span className="text-[#1d9bf0]">Twitter</span>
        </h1>

        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <div className="flex space-x-5">
              <label className="block text-sm text-gray-200 ">Username</label>
              {error == "auth/invalid-email" ? (
                <label className="text-red-500 text-sm">
                  Not a valid Email!
                </label>
              ) : null}
            </div>

            <input
              type="text"
              className="block w-full px-4 py-2 mt-2   border rounded-md bg-gray-800 text-gray-300 border-gray-600  focus:border-blue-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm text-gray-200">Password</label>
              {error == "auth/weak-password" ? (
                <label className="text-red-500 text-sm">6 characters!</label>
              ) : null}

              <a href="#" className="text-xs text-gray-400 hover:underline">
                Forget Password?
              </a>
            </div>

            <input
              type="password"
              className="block w-full px-4 py-2 mt-2   border rounded-md bg-gray-800 text-gray-300 border-gray-600  focus:border-blue-300 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  bg-blue-500 focus:outline-none focus:bg-gray-600"
              onClick={() => {
                signInWithEmailAndPassword(auth, email, password)
                  .then((response) => {
                    console.log(response);
                    router.push("/");
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    console.log("Username error: " + errorCode);
                    setError(errorCode);
                  });
              }}
            >
              Login
            </button>
          </div>
          {/* <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-600 focus:outline-none focus:bg-gray-600"
              onClick={() => {
                createUserWithEmailAndPassword(auth, email, password)
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    console.log("Register error: " + errorCode);
                    setError(errorCode);
                  });
              }}
            >
              Register
            </button>
          </div> */}
          <div>
            <h1 className="text-gray-400 text-center w-full text-xs py-3">
              Don&apos;t have an account? click{" "}
              <span className="text-[#1d9bf0] cursor-pointer">here</span> to
              make one
            </h1>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b border-gray-600 lg:w-1/5"></span>

          <a
            href="#"
            className="text-xs text-center uppercase text-gray-400 hover:underline"
          >
            or login with Social Media
          </a>

          <span className="w-1/5 border-b border-gray-600 lg:w-1/5"></span>
        </div>

        <div className="flex items-center mt-6 -mx-2">
          {/* //! Pretty UseLess as I only have one provider, but it maps through the list of providers to make a button for them */}
          {/* {Object.values(providers).map((provider) => (
            <button
              key={provider.id}
              type="button"
              className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
              </svg>

              <span className="hidden mx-2 sm:inline">
                Sign in with {provider.name}
              </span>
            </button>
          ))} */}
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          Don&apos;t have an account?
          <a href="#" className="font-medium text-gray-200 hover:underline">
            Create One
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
