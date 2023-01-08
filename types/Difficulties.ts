
type Difficulty = "easy" | "medium" | "hard"
export type {
    Difficulty
}
const Difficulties = ['easy', 'medium', 'hard'] as const
export default Difficulties