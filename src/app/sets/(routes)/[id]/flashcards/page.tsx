'use client'

import { useEffect, useState } from "react" ;
import { findSetById } from "@/lib/utils" ;
import FlashCard from "@/components/Practice/FlashCard/FlashCard" ;
import { LearningSetType } from "@/types/types" ;
import LastNext from "@/components/Practice/FlashCard/LastNext" ;

const Flashcards = ({ params }: { params: { id: string } }) => {
  const [learningSets, setLearningSets] = useState<Array<LearningSetType>>([]) ;
  const [currentPage, setCurrentPage] = useState(1) ;
  const set = findSetById(params.id, learningSets) as LearningSetType ;

  useEffect(() => {
    async function getSets() {
      const res = await fetch("http://localhost:3000/api", { next: { revalidate: 1 } }) ;
      const data = await res.json() ;

      setLearningSets(data.sets) ;
    }

    getSets() ;
  }, []) ;

  return (
    <div className="flex flex-col items-center my-1 mx-3">
      <FlashCard {...set?.words[currentPage - 1]} />
      <LastNext setCurrentPage={setCurrentPage} currentPage={currentPage} length={set?.words.length} />
    </div>
  ) ;
}

export default Flashcards ;