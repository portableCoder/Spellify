import { Difficulty } from "../../types/Difficulties"
import { ResultData } from "../../types/ResultData"

type StorageData = {
    data: ResultData,
    difficulty: Difficulty | '',
    date: number
}
export type {
    StorageData
}