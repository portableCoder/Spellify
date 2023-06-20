import create from 'zustand'
import { Difficulty } from '../../types/Difficulties'
import { Spelling } from '../../types/Spellings'
import getSpellings from '../getSpellings'
type Store = {
    res: Spelling[],
    difficulty: Difficulty | '',
    setRes: (spellings: Spelling[], difficulty: Difficulty | '', isSaved: boolean) => void,
    isSaved: boolean
}
let dummySpellingsRemoveThis = getSpellings('medium') as Spelling[]
dummySpellingsRemoveThis = dummySpellingsRemoveThis.map((el) => {
    const len = el.word.length
    const start = Math.random() * (len - 1)
    const end = Math.random() * (len - 3)
    el.input = el.word.substring(start, end)
    return el
})
const useStore = create<Store>()((set) => ({
    res: [],
    difficulty: '',
    isSaved: false,
    setRes(spellings, difficulty, isSaved) {

        set(() => {
            return { res: spellings, difficulty, isSaved }
        })
    }
}))
export default useStore