import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import useStore from '../util/hooks/useStore'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, Label } from 'recharts';
import CustomTooltip from '../components/Tooltip';
import clsx from 'clsx';
import { BsAsterisk, BsX } from 'react-icons/bs';
import { ResultData } from '../types/ResultData';
import { motion } from 'framer-motion';
import Check from '../components/Check';
import { useRouter } from 'next/router';
import { Spelling } from '../types/Spellings';
import useLocalStorage from '../util/hooks/useLocalStorage';
import { StorageData } from '../util/hooks/StorageData';

const cols = ['text-red-500', 'text-yellow-500', 'text-emerald-500']

const Result = () => {
    const { res, setRes, difficulty } = useStore()
    const [selectedSpellings, setSelectedSpellings] = useState(new Array(res.length).fill(false))
    const [dat, setData] = useState<ResultData>({
        avgPct: 0,
        words: []
    })
    let { words: data, avgPct } = dat
    useEffect(() => {
        let a = [...selectedSpellings]
        let words = res.map((el, idx) => {
            const totalLetters = el.word.length
            let correctLetters = 0
            for (let i = 0; i < totalLetters; i++) {
                if (el.word[i] === el.input[i]) {
                    correctLetters++
                }
            }

            let acc = (correctLetters / totalLetters) * 100
            if (correctLetters === 0) {
                acc = 0
            }
            if (acc <= 40) {
                a[idx] = true
            }
            return {
                input: el.input,
                actualWord: el.word,
                score: acc
            }
        })
        setSelectedSpellings(a)
        setData({
            words,
            avgPct: words.reduce((prev, cur) => prev + cur.score, 0) / words.length

        })

    }, [])
    const [storage, setStorage] = useLocalStorage<StorageData[]>('results', [])
    useEffect(() => {
        if (res.length === 0) {
            router.replace('/')
        }
        return () => {
            let nStorage = [...storage]
            nStorage.push({
                data: dat,
                date: new Date().getTime(),
                difficulty
            })
            if (dat.words.length > 0) {
                setStorage(nStorage)
            }
        }
    }, [dat])
    const allCorrectSpellings = selectedSpellings.every((el) => el !== true)
    const q = selectedSpellings.filter((el) => el === true).length
    const router = useRouter()
    return (
        <>
            <Header />
            <div className='w-full h-1/2 md:w-1/2 -mx-2 md:mx-auto my-12'>
                <ResponsiveContainer width={'100%'} className={'  w-full  flex items-center justify-center'}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%" >

                                <stop offset="10%" stopColor='currentColor' className='text-indigo-500' />
                                <stop offset="100%" stopColor='currentColor' className='text-violet-500' />

                            </linearGradient>
                        </defs>
                        <Tooltip content={<CustomTooltip />} />
                        <YAxis>
                            <Label fill='#ffffff' className=' text-md md:text-2xl' angle={270} position='insideLeft' offset={10}
                                value="Score"
                                style={{ textAnchor: 'middle' }}></Label>
                        </YAxis>
                        <XAxis />
                        <Area type="monotone" dataKey="score" stroke="white" fillOpacity={1} fill="url(#lgrad)" />


                    </AreaChart>

                </ResponsiveContainer>

            </div>
            <div className='font-inter text-2xl md:text-5xl w-1/2 mx-auto flex flex-col items-center justify-start'>
                <div className='flex flex-col'>

                    <div className='flex gap-x-2 items-center justify-center'>
                        <div className={`${clsx([cols[0] && avgPct < 50, cols[1] && avgPct >= 50, cols[2] && avgPct >= 70])}`}>{avgPct.toFixed(1)}%</div>
                    </div>
                    <div
                        className='font-bold bg-gradient-to-bl from-orange-500 to-pink-500 bg-clip-text text-transparent '
                    >

                        ACCURACY</div>
                </div>
            </div>
            <div className='grid  grid-cols-1 md:grid-cols-2 w-full md:w-1/2 mx-auto  items-center justify-center'>
                {data.map((el, i) => <div className='flex flex-col gap-y-2 p-2' key={i}>
                    <div className='flex flex-row gap-x-2 justify-center' >
                        <Check check={selectedSpellings[i]} onChange={(b) => {
                            let newSelections = [...selectedSpellings]
                            newSelections[i] = b
                            setSelectedSpellings(newSelections)
                        }} />
                        <div className='flex flex-row gap-x-3 justify-center'>
                            {el.actualWord.split('').map((el, j) => <div className='w-2' key={j}>{el}</div>)}
                        </div>
                    </div>
                    <div className='flex flex-row gap-x-3 justify-center'>
                        <div className='opacity-0 text-md'>{i}</div>
                        {el.actualWord.split('').map((a, j) => {
                            let w = el.input[j] || ' '
                            const cl = clsx({
                                "border-red-500 text-red-500": el.input[j] !== a,
                                "border-green-500 text-green-500": el.input[j] === a
                            })
                            return <div className={`border-b w-2 ${cl} whitespace-pre text-center `} key={j}>
                                {w === ' ' ? <BsX width={2} className='text-center mx-auto' /> : w}
                            </div>
                        })}
                    </div>
                </div>)}
            </div>
            <div className='w-full md:w-1/2 mx-auto justify-between items-center flex my-12  text-md md:text-xl'>
                <button onClick={() => {
                    router.replace('/')
                }} className='duration-200 transform will-change-transform transition-transform hover:scale-125'> {"<"} Go back </button>

                {!allCorrectSpellings && <button onClick={() => {
                    let spellings = [...data]
                    let newState: Spelling[] = []
                    for (let i in spellings) {
                        let spell = spellings[i]
                        let selected = selectedSpellings[i]
                        if (selected) {
                            newState.push({ done: false, input: '', word: spell.actualWord })
                        }
                    }
                    setRes(newState, difficulty)
                    router.replace('/play')
                }} className='transform will-change-transform hover:scale-125 transition-transform duration-200'>  Practice Incorrect  Words {`(${q})`} {">"} </button>}

            </div>
        </>
    )
}

export default Result