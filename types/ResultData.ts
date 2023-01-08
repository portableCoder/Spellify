type ResultData = {
    avgPct: number,
    words: Array<{
        input: string,
        actualWord: string,
        score: number
    }>
}
export type { ResultData }