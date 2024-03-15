'use client'

import { LearningSetType } from "@/types/types" ;
import { filterWordsByNumber } from "@/lib/utils" ;
import { useRouter } from "next/navigation" ;

const SetCard = ({ _id, description, title, words }: LearningSetType) => {
  const router = useRouter() ;

  return (
    <div 
      key={_id} 
      className="min-w-[200px] h-[144px] overflow-x-hidden items-center px-4 py-2 border-black border-2 cursor-pointer mr-1 rounded" 
      onClick={() => router.push(`/sets/${_id}`)}
    >
      <h1>{title}</h1>
      <h2>{description}</h2> <br />

      {
        filterWordsByNumber(words, 5).map(word => {
          return (
            <div key={word._id}>
              <h2>{word.name}{words.indexOf(word) !== words.length - 1 && ','}</h2>
            </div>
          ) ;
        })
      }

      { words.length > 5 && <h2>and more...</h2> }
    </div>
  ) ;
}

export default SetCard ;