export type WordType = { name: string, translation: string, _id: string } ;
export type LearningSetType = { title: string, description: string, words: Array<WordType>, _id: string } ;
export type BotType = { difficulty: "Easy" | "Hard" | "Strong" | "Impossible", id: string } ;