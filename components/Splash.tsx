import { motion } from 'framer-motion'
import React from 'react'

const Splash = () => {
    return (
        <motion.div initial={{
            opacity: 1,
            width: "full",
        }} animate={{
            opacity: 0,
            width: 0
        }} transition={{ delay: 1, duration: 0.5 }}
            className='top-0 left-0 z-50 w-full h-full absolute bg-zinc-800 flex text-7xl justify-center items-center'>

            <motion.div initial={{
                y: -100,
            }} animate={{ y: 0 }} transition={{

                duration: 1
            }}>Splash</motion.div>

        </motion.div>
    )
}

export default Splash