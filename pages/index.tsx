import Head from 'next/head'

import { BsPauseFill, BsPlayFill, BsStopFill } from 'react-icons/bs'
import useStore from '../util/hooks/useStore';
import { RxLetterCaseCapitalize } from 'react-icons/rx'
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Splash from '../components/Splash';
import { useEffect } from 'react';
import Link from 'next/link';
//col 1 #1d1d42  col 2 #26264e
export default function Home() {
  const router = useRouter()
  const { setRes } = useStore()
  const pushDifficulty = (difficulty: string) => {
    return `/play?difficulty=${difficulty}`
  }
  useEffect(() => {

    setRes([], '')
  }, [])
  return (
    <>
      <Header />
      <div className=' text-xl md:text-2xl my-16 font-bold'>
        🙌 Welcome to Spellify. Choose a difficulty to play.
      </div>
      <div className='flex my-16 md:my-36 flex-col gap-y-12 md:w-1/2 w-full mx-auto md:text-xl '>
        <Link href={pushDifficulty('easy')} className='hover:border-none text-center  border border-white transition-all duration-200 bg-transparent hover:bg-gradient-to-r  from-emerald-400 via-green-500  to-cyan-500 p-4 rounded-md'>
          Easy
        </Link>
        <Link href={pushDifficulty('medium')} className=' text-center border hover:border-none border-white transition-all duration-200 bg-transparent hover:bg-gradient-to-r  from-orange-500 via-pink-500 to-purple-500 p-4 rounded-md'>
          Medium
        </Link>
        <Link href={pushDifficulty('hard')} className=' text-center border hover:border-none border-white transition-all duration-200 bg-transparent hover:bg-gradient-to-r  from-violet-500 to-pink-500 p-4 rounded-md'>
          Hard
        </Link>
        <Link href='/previous-games' className=' text-center border hover:border-none border-white transition-all duration-200 bg-transparent hover:bg-gradient-to-r  from-violet-500 to-pink-500 p-4 rounded-md'>
          View previous games
        </Link>
      </div>

    </>
  )
}
