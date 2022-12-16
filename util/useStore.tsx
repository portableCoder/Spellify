import create from 'zustand'
type Store = { finished: boolean, play: boolean, setPlay(): void, setFinished: () => void }
const useStore = create<Store>()((set) => ({
    play: false,
    finished: true,
    setPlay: () => set((prev) => ({ play: !prev.play })),
    setFinished: () => set((prev) => ({ finished: !prev.finished }))
}))
export default useStore