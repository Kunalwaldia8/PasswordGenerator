import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("abcd");
  const [numberAllowed, setnumberAllowed] = useState(true);
  const [characterAllowed, setcharacterAllowed] = useState(true);

  useCallback(generatePassword, [
    length,
    numberAllowed,
    characterAllowed,
    setPassword,
  ]);
  function generatePassword() {
    let s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";
    if (characterAllowed) {
      s += "@#!$%^&*";
    }
    if (numberAllowed) {
      s += "0123456789";
    }

    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * s.length + 1);
      pass += s[random];
    }
    setPassword(pass);
  }

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, characterAllowed]);

  const passwordRef = useRef(null);
  const copyText = () => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div>
      <div className=" text-white w-full h-full rounded-2xl bg-slate-500 mx-2 px-1 my-2 py-2">
        <h2 className="text-xl my-2">Passoword generator</h2>

        <form className="mx-2 my-2">
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
            <input
              type="text"
              id="search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={password}
              readOnly
              ref={passwordRef}
            />
            <button
              type="button"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={copyText}
            >
              Copy
            </button>
          </div>
        </form>
        <div className="flex justify-center gap-x-2 mx-2 px-1 my-2 py-2">
          <div className="flex items-center justify-center gap-x-1 ">
            <input
              id="large-range"
              type="range"
              min={8}
              max={100}
              value={length}
              class="w-24  h-2 px-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer  dark:bg-gray-700"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label for="steps-range" class="px-2 mb-6">
              length:{length}
            </label>
          </div>
          <div className=" ml-5 flex items-center justify-center gap-x-1 ">
            <input
              id="default-checkbox"
              type="checkbox"
              defaultChecked={numberAllowed}
              class="px-1 mb-6 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label
              for="default-checkbox"
              class="px-1 mb-6 text-sm font-medium text-white-900 dark:text-gray-300"
            >
              Numbers
            </label>
          </div>
          <div className=" ml-5 flex items-center justify-center gap-x-1 ">
            <input
              id="Characters"
              type="checkbox"
              defaultChecked={characterAllowed}
              class="px-1 mb-6 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={() => {
                setcharacterAllowed((prev) => !prev);
              }}
            />
            <label
              for="Characters"
              class="px-1 mb-6 text-sm font-medium text-white-900 dark:text-gray-300"
            >
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
