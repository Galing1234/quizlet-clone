import { BotType, LearningSetType, WordType } from "@/types/types" ;

export function filterWordsByNumber(words: Array<WordType>, number: number) {
  const filteredWords = words.filter(word => words.indexOf(word) > -1 && words.indexOf(word) < number) ;

  return filteredWords ;
} 

export function findSetById(id: string, learningSet: Array<LearningSetType>) {
  return learningSet.find(set => set._id === id) ;
}

export async function getSets() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/`, { next: { revalidate: 1 } }) ;
  const data = await res.json() ;

  return data.sets ;
}

export function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length, randomIndex ;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex) ;
    currentIndex-- ;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]] ;
  }

  return array ;
}

export function getRandomWords(words: Array<WordType>, alreadyWords: Array<string>): number {  
  const randomNumber = Math.floor(Math.random() * words.length) ;

  if (!alreadyWords.includes(words[randomNumber].translation)) return randomNumber ;

  return getRandomWords(words, alreadyWords) ;
}

export function getRobotType(number: number): BotType["difficulty"] | void {
  switch (number) {
    case 0: 
      return "Easy" ;
    case 1:
      return "Hard" ;
    case 2:
      return "Strong" ;
    case 3:
      return "Impossible" ;
    default:
      return ;
  }
}