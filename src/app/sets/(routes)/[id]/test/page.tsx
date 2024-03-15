"use client"

import React, { useState } from "react" ;
import useSWR from "swr" ;
import { LearningSetType } from "@/types/types" ;
import { findSetById, getSets } from '@/lib/utils' ;
import TestForm from "@/components/Practice/TestForm/TestForm" ;

const Test = ({ params }: { params: { id: string } }) => {
  const { data, error } = useSWR("sets", getSets) ;
  const learningSets: Array<LearningSetType> = data || [] ;
  const [disabled, setDisabled] = useState<Array<string>>([]) ;
  const [score, setScore] = useState<number>(0) ;
  const set = findSetById(params.id, learningSets) as LearningSetType ;
  const wordsTSX = set?.words.map(word => {
    return (
      <div key={word._id}>
        <TestForm
          translation={word.translation}
          name={word.name}
          id={word._id}
          setScore={setScore}
          setDisabled={setDisabled}
          wordsLength={set.words.length}
        />
      </div>
    ) ;
  }) ;

  return (
    <div>
      <h1 className="text-4xl text-center mt-4">Translate the following words:</h1>
      <h2 className="text-2xl text-center mt-4">Press <kbd>Space</kbd> to submit</h2>

      {wordsTSX} <br />
      {disabled.length === set?.words.length && <p className="text-center text-2xl mb-1 font-bold">Your final score is: {score} / 100</p>}
    </div>
  ) ;
}

export default Test ;