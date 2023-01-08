import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { BsCheck } from 'react-icons/bs'
type CheckProps = {
    check?: boolean,
    onChange?: (e: boolean) => void
}
const Check = ({ check, onChange }: CheckProps) => {

    return (
        <button onClick={() => {
            if (onChange) {
                onChange(!check)
            }

        }} className={`md:w-8 md:h-8 h-6 w-6 text-base md:text-xl flex items-center justify-center border border-zinc-800 rounded-full ${clsx({ "bg-indigo-500": check })}`}>
            {check && <BsCheck />}

        </button>
    )
}

export default Check