import { AnimateSharedLayout, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import Header from "../components/Header";
import { StorageData } from "../util/hooks/StorageData";
import useLocalStorage from "../util/hooks/useLocalStorage";
import useStore from "../util/hooks/useStore";

const PreviousGames = () => {
  const [storage, setStorage] = useLocalStorage<StorageData[]>("results", []);
  const [state, setState] = useState<StorageData[]>([]);

  useEffect(() => {
    setState(storage);
  }, []);

  const { setRes } = useStore();

  return (
    <div>
      <Header />
      <div className="capitalize text-2xl md:text-3xl text-center p-2">
        previous games
      </div>

      <div>{state.length == 0 ? "No Data" : ""}</div>
      {state.length > 0 && (
        <AnimateSharedLayout>
          <motion.div
            layout
            className="flex flex-col gap-y-5 items-center justify-center w-full"
          >
            {state.map((el, i) => {
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              } as Intl.DateTimeFormatOptions;
              const dt = new Date(el.date).toLocaleDateString(
                undefined,
                options
              );
              let grad = "from-pink-500 to-red-500";
              const diff = el.difficulty;
              if (diff == "hard") {
                grad = "from-pink-500 to-red-500";
              }
              if (diff == "medium") {
                grad = "from-blue-500 to-violet-500";
              }
              if (diff == "easy") {
                grad = "from-cyan-500 to-violet-500";
              }
              return (
                <motion.div
                  key={i}
                  className={`w-full flex justify-between flex-row rounded-md md:w-1/2 p-4 bg-gradient-to-r ${grad}`}
                >
                  <div>
                    <div className="text-2xl">{dt}</div>

                    <div className="text-xl">
                      Score: {el.data.avgPct.toFixed(2)}%
                    </div>
                    {el.difficulty && (el.difficulty as string) !== "" && (
                      <div className="text-xl capitalize">
                        Difficulty: {el.difficulty}
                      </div>
                    )}
                    <Link
                      href="/result"
                      onClick={() => {
                        setRes(
                          el.data.words.map((w) => ({
                            done: true,
                            input: w.input,
                            word: w.actualWord,
                          })),
                          el.difficulty || "",
                          true
                        );
                      }}
                      className="text-bold"
                    >
                      View Results {">"}
                    </Link>
                  </div>
                  <div>
                    <button
                      className="md:text-2xl"
                      onClick={() => {
                        let nState = [...state.filter((el, j) => j !== i)];
                        setState(nState);
                        setStorage(nState);
                      }}
                    >
                      {" "}
                      <BsTrash />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimateSharedLayout>
      )}
    </div>
  );
};

export default PreviousGames;
