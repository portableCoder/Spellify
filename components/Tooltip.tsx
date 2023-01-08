import React from 'react'

const Tooltip = ({ active, payload, label }: any) => {

    if (active && payload && payload.length) {
        const { actualWord, input, score } = payload[0].payload
        return (
            <div className="flex flex-col gap-y-3 focus:outline-none bg-zinc-800 p-2 text-xs md:text-base md:p-4 focus:ring-0">
                <h1 className="label text-md">{`Score: ${score.toFixed(0)}`}</h1>
                <p className="intro">{`Actual Spelling: ${actualWord}`}</p>
                <p className="desc"> {`Entered Spelling: ${input}`}</p>
            </div>
        );
    }

    return null;
};
export default Tooltip