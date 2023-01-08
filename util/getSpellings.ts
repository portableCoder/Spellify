


import getRandom from '../util/getRandom'
import randomWords from 'random-words'
import { Spelling } from '../types/Spellings'
import { Difficulty } from '../types/Difficulties'
export default function getSpellings(difficulty: Difficulty) {

    if (!difficulty) {
        return null
    }
    const easy = difficulty === 'easy'
    const medium = difficulty === 'medium'
    const hard = difficulty === 'hard'
    let lCount = 0
    let minWordLength = 0
    let maxWordLength = 0
    if (easy) {
        lCount = getRandom(5, 10)
        minWordLength = 5
        maxWordLength = 7
    }
    else if (medium) {
        lCount = getRandom(10, 15)
        minWordLength = 6
        maxWordLength = 8
    }
    else if (hard) {
        minWordLength = 10
        maxWordLength = 20
        lCount = getRandom(10, 20)
    }
    const spellings: Spelling[] = new Array(lCount).fill(0).map((el) => ({
        input: '',
        word: '',
        done: false
    })
    )
    let words: string[] = []
    while (words.length !== lCount) {
        words = randomWords({
            exactly: lCount,
            max: maxWordLength,
            min: minWordLength,

        })

    }
    for (let i = 0; i < words.length; i++) {
        let w: string = words[i]
        while (w.length < minWordLength) {
            w = randomWords({
                exactly: 1,
                min: minWordLength,
                max: maxWordLength
            })[0]

        }
        spellings[i].word = w.toUpperCase()
    }

    return spellings
}