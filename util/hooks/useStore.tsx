import create from 'zustand'
import { Difficulty } from '../../types/Difficulties'
import { Spelling } from '../../types/Spellings'
import getSpellings from '../getSpellings'
type Store = {
    res: Spelling[],
    difficulty: Difficulty | '',
    setRes: (spellings: Spelling[], difficulty: Difficulty | '') => void
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
    setRes(spellings, difficulty) {

        set(() => {
            return { res: spellings, difficulty }
        })
    }
}))
export default useStore