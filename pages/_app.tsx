import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Head from 'next/head'
import "@fontsource/inter";
import { useEffect, useRef, useState } from 'react'
import Splash from '../components/Splash'
const inTransitions = [2500, 0, -2500]
const outTransitions = [-2500, 0, 2500]
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const transition = useRef<typeof inTransitions>(inTransitions)
  const [shouldSplashPlay, setSplashPlay] = useState(true)
  useEffect(() => {
    router.beforePopState(({ as, options }) => {
      if (as !== router.asPath) {
        // Will run when leaving the current page; on back/forward actions
        if (transition.current === inTransitions) {
          transition.current = outTransitions
        } else {
          transition.current = inTransitions
        }
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);
  useEffect(() => {
    setTimeout(() => {
      setSplashPlay(false)
    }, 2000)
  }, [])
  const [initial, enter, exit] = transition.current
  return <AnimatePresence key={router.asPath}>
    <motion.div
      initial={{ x: initial }}
      animate={{ x: enter }}
      exit={{ x: exit }}
      transition={{
        duration: 0.3
      }}
      className='p-4 bg-zinc-900 w-screen font-inter h-screen text-white relative overflow-x-hidden'
    >

      {shouldSplashPlay && <Splash />}
      <Head>
        <title>Spellify</title>
        <meta name="description" content="Spellify - Level your spelling game up!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />

    </motion.div>
  </AnimatePresence>
}
