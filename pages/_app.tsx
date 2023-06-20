import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Head from 'next/head'
import "@fontsource/inter";
import { useEffect, useRef, useState } from 'react'
import Splash from '../components/Splash'

const outTransitions = [-2500, 0, 2500]
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return <AnimatePresence key={router.asPath}>
    <motion.div


      className='p-4 bg-zinc-900 w-screen font-inter h-screen text-white relative overflow-x-hidden'
    >

      <Head>
        <title>Spellify</title>
        <meta name="description" content="Spellify - Level your spelling game up!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />

    </motion.div>
  </AnimatePresence>
}
