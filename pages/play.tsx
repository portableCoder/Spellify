import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { NextPage } from "next";
import {
  BsChevronLeft,
  BsChevronRight,
  BsPlayFill,
  BsStopFill,
} from "react-icons/bs";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Spelling } from "../types/Spellings";
import getSpellings from "../util/getSpellings";
import clsx from "clsx";
import useStore from "../util/hooks/useStore";
import { Difficulty } from "../types/Difficulties";

const Play = (props: NextPage) => {
  let router = useRouter();
  const { res } = useStore();
  useEffect(() => {
    if (router.isReady) {
      // if store has a result,it means the user chose to practice, thus we do not need to redirect

      if (res.length > 0) {
        setState((prev) => ({ ...prev, spellings: res }));
      } else {
        if (!router.query) {
          router.push("/");
        } else if (!router.query.difficulty) {
          router.push("/");
        } else if (typeof router.query.difficulty !== "string") {
          router.push("/");
        } else {
          const spellings = getSpellings(router.query.difficulty as Difficulty);
          if (spellings === null) {
            router.push("/");
          } else setState((prev) => ({ ...prev, spellings }));
        }
      }
    }
  }, [router.isReady]);
  const [state, setState] = useState(() => {
    let spellings: Spelling[] = [];
    return {
      spellings,
      index: 0,
    };
  });

  const { spellings, index } = state;
  const { setRes, difficulty } = useStore();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [soundPlaying, setSoundPlaying] = useState(false);
  //stores current letter, character by character
  let [currentInput, setCurrentInput] = useState<string[]>([]);
  useEffect(() => {
    if (state.spellings[index])
      //stores input refs to switch back and forth between them
      inputRefs.current = inputRefs.current.slice(
        0,
        state.spellings[index].word.length
      );
  }, [state.index]);

  useEffect(() => {
    setCurrentInput((prev) => {
      if (spellings[index]) {
        if (spellings[index].input.length > 0) {
          return spellings[index].input.split("");
        } else {
          return new Array(spellings[index].word.length).fill("");
        }
      } else {
        return prev;
      }
    });
  }, [state]);
  const [delay, stagger] = [0.2, 0.2];
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
        duration: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  };
  let done = false;
  if (spellings[index]) {
    done = spellings[index].done;
  }
  const [buttonsVisible, setbuttonsVisible] = useState(true);
  function playSound() {
    let utterance = new SpeechSynthesisUtterance(spellings[index].word);
    utterance.onend = (ev) => {
      setSoundPlaying(false);
    };
    speechSynthesis.speak(utterance);
    setSoundPlaying(true);
  }
  useEffect(() => {
    if (state) {
      if (state.spellings[index]) {
        if (state.spellings[index].done === false) {
          playSound();
        }
      }
    }
  }, [state]);
  return (
    <>
      <Header showCounter index={index} total={spellings.length} />
      <div className="absolute right-6 md:right-24 top-10"></div>
      <div className="h-full flex items-center  flex-col -my-16 md:-my-20">
        <div className="flex my-auto items-center justify-center flex-col gap-y-5">
          <div>
            <button
              disabled={soundPlaying}
              onClick={() => {
                playSound();
              }}
              className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl bg-zinc-800"
            >
              {soundPlaying ? <BsStopFill /> : <BsPlayFill />}
            </button>
          </div>
          {spellings.length > 0 && (
            <AnimateSharedLayout>
              <motion.div
                layout
                className="w-full text-md  md:text-xl flex flex-row items-center justify-center  gap-x-3"
              >
                {new Array(spellings[index].word.length)
                  .fill(0)
                  .map((el, i) => {
                    const correct =
                      spellings[index].input[i] === spellings[index].word[i];
                    const done = spellings[index].done;
                    const cl = clsx({
                      "border-red-500": done && !correct,
                      "border-green-500": done && correct,
                    });
                    return (
                      <motion.input
                        disabled={state.spellings[index].done}
                        ref={(ref) => {
                          inputRefs.current[i] = ref;
                        }}
                        layout
                        onKeyUp={(e) => {
                          if (e.key == "Backspace") {
                            const inp = inputRefs.current[i];
                            if (inp) {
                              if (inp.value === "" && currentInput[i] === "") {
                                let prev = inputRefs.current[i - 1];
                                if (prev) {
                                  prev.focus();
                                }
                              }
                            }
                          }
                        }}
                        key={i}
                        value={currentInput[i] || ""}
                        onChange={(e) => {
                          console.log("e,string", e.target.value);
                          let r = inputRefs.current;
                          let c = [...currentInput];
                          c[i] = e.target.value[0];
                          if (c[i]) {
                            c[i] = c[i].toUpperCase();
                          } else {
                            c[i] = "";
                          }
                          if (r) {
                            if (r[i] && c[i] !== "") {
                              let nextInput = r[i + 1];
                              if (nextInput) {
                                nextInput.focus();
                              }
                            }
                            if (r[i] && c[i] === "") {
                              let prev = r[i - 1];
                              if (prev) {
                                prev.focus();
                              }
                            }
                          }
                          setCurrentInput(c);
                        }}
                        type="text"
                        className={`border-2 border-white ${cl} focus:border-orange-500 uppercase  rounded-sm w-full md:w-16 md:h-12 text-center text-white p-2 focus:outline-none bg-transparent`}
                      />
                    );
                  })}
              </motion.div>
            </AnimateSharedLayout>
          )}
          {(!buttonsVisible || done) && (
            <AnimateSharedLayout>
              <motion.div
                variants={container}
                layout
                className="flex text-md  md:text-2xl md:justify-center flex-row items-start justify-between"
              >
                {spellings[index].word.split("").map((el, i) => (
                  <motion.div
                    key={i}
                    className={`rounded-sm w-full md:w-16 md:h-12 text-center text-gray-300 p-2 `}
                    variants={item}
                  >
                    {el}
                  </motion.div>
                ))}
              </motion.div>
            </AnimateSharedLayout>
          )}
        </div>
        {buttonsVisible && (
          <div className="md:w-1/2  w-full  mx-auto flex flex-row   my-20  justify-between text-xl md:text-3xl">
            {index == 0 && <div></div>}
            {index > 0 && (
              <motion.button
                animate={{
                  opacity: index > 0 ? 1 : 0,
                }}
                disabled={index === 0}
                transition={{
                  duration: 0.3,
                }}
                onClick={() => {
                  setState((prev) => ({ ...prev, index: prev.index - 1 }));
                }}
                className="p-4 bg-gradient-to-br border from-orange-500 rounded-md to-purple-500"
              >
                {" "}
                <BsChevronLeft />{" "}
              </motion.button>
            )}
            {
              <button
                onClick={() => {
                  /*
                                    here, the mechanism of changing the current spelling forward
                                    backward takes place. The way the actual spelling is displayed
                                    before switching is handled here.
                                    after all the spellings are done, it gets pushed to global state,
                                    and to result page
                                */
                  if (!spellings[index].done) {
                    setbuttonsVisible(false);

                    setTimeout(() => {
                      setState((prev) => {
                        let newSpellings = [...spellings];
                        newSpellings[index].done = true;
                        newSpellings[index].input = currentInput.join("");
                        let n = prev.index + 1;
                        if (!spellings[n]) {
                          setRes(
                            [...spellings],
                            router.query.difficulty as Difficulty,
                            false
                          );
                          router.replace("/result");
                          return { ...prev };
                        }
                        return { ...prev, index: n, spellings: newSpellings };
                      });
                      setbuttonsVisible(true);
                    }, delay * 1000 + stagger * 1000 * spellings[index].word.length);
                  } else {
                    let n = index + 1;
                    if (!spellings[n]) {
                      setRes(
                        [...spellings],
                        (router.query.difficulty || difficulty) as Difficulty,
                        false
                      );
                      router.replace("/result");
                    } else {
                      setState((prev) => ({ ...prev, index: n }));
                    }
                  }
                }}
                className="p-4 rounded-md bg-gradient-to-br from-orange-500 to-purple-500"
              >
                {index === spellings.length - 1 ? "Finish" : <BsChevronRight />}
              </button>
            }
          </div>
        )}
      </div>
    </>
  );
};

export default Play;
