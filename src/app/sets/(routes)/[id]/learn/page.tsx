"use client"

import { useState, useEffect } from "react" ;
import useSWR from "swr" ;
import LearnButton from "@/components/Practice/LearnButton/LearnButton" ;
import { findSetById, shuffle, getRandomWords, getSets } from "@/lib/utils" ;
import { LearningSetType } from "@/types/types" ;

const LearningPage = ({ params }: { params: { id: string } }) => {
  const { data, error } = useSWR("sets", getSets) ;
  const learningSets: Array<LearningSetType> = data || [] ;
  const [currentPage, setCurrentPage] = useState<number>(1) ;
  const [isDisabled, setIsDisabled] = useState<boolean>(false) ;
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]) ;
  const set = findSetById(params.id, learningSets) as LearningSetType ;

  let wordsTSX: JSX.Element = <div></div> ;

  useEffect(() => {
    if (set && set.words.length >= 4) {
      const randomNumber1 = getRandomWords(set.words, [set.words[currentPage - 1].translation]) ;
      const randomNumber2 = getRandomWords(set.words, [
        set.words[currentPage - 1].translation,
        set.words[randomNumber1]?.translation
      ]) ;
      const randomNumber3 = getRandomWords(set.words, [
        set.words[currentPage - 1].translation,
        set.words[randomNumber1]?.translation,
        set.words[randomNumber2]?.translation,
      ]) ;
      
      setRandomNumbers(shuffle([randomNumber1, randomNumber2, randomNumber3, currentPage - 1])) ;
    }
  }, [set, currentPage]) ;

  if (set) {
    if (set?.words.length < 4) return <h2>You need to have at least 4 words in your set to start a learn.</h2> ;

    const randomWords = randomNumbers.map(number => set.words[number].translation) ;

    wordsTSX = (
      <div className="text-center">
        <h1 className="text-3xl mb-2 mt-1">{set.words[currentPage - 1].name}</h1>

        <div className="grid grid-cols-2 justify-items-center gap-[10px] mx-4">
          {randomWords.map((word, index) => (
            <LearnButton
              key={index}
              word={word}
              isCorrect={set.words[currentPage - 1].translation === word}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              wordsLength={set.words.length}
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
            />
          ))}
        </div>
      </div>
    ) ;
  }

  return (
    <>
      <div>{wordsTSX}</div>
    </>
  ) ;
}

export default LearningPage ;
