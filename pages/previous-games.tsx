import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { StorageData } from '../util/hooks/StorageData'
import useLocalStorage from '../util/hooks/useLocalStorage'
import useStore from '../util/hooks/useStore'

const PreviousGames = () => {
    const [storage, setStorage] = useLocalStorage<StorageData[]>('results', [])
    const [state, setState] = useState<StorageData[]>([])

    useEffect(() => {
        setState(storage)
    }, [])
    const { setRes } = useStore()
    return (
        <div>
            <div className='capitalize text-2xl'>previous games</div>

            <div>{state.length == 0 ? 'No Data' : ''}</div>
            {state.length > 0 && <div className='flex flex-col gap-y-5 items-center justify-center w-full'>
                {state.map((el) => {
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    //@ts-ignore
                    const dt = new Date(el.date).toLocaleDateString(undefined, options)
                    return <motion.div onDragEnd={(el) => {
                        console.log(el.detail)
                    }} dragConstraints={{
                        left: -25,
                        right: 25,
                        top: 0,
                        bottom: 0
                    }} drag="x" className='w-full rounded-md md:w-1/2 p-4 bg-gradient-to-r from-violet-500 to-emerald-500'>
                        <div className='text-2xl'>
                            {dt}
                        </div>

                        <div className='text-xl'>
                            Score: {el.data.avgPct}%
                        </div>
                        <div className='text-xl'>
                            Difficulty: {el.difficulty}
                        </div>
                        <Link href='/result' onClick={() => {
                            setRes(el.data.words.map((w) => ({ done: true, input: w.input, word: w.actualWord })), el.difficulty || '')

                        }} className='text-bold'>
                            View Results {'>'}
                        </Link>

                    </motion.div>
                })}
            </div>}
        </div>
    )
}

export default PreviousGames