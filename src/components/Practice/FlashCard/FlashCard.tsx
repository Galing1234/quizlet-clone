'use client'

import { useState } from "react" ;
import { WordType } from "@/types/types" ;

const FlashCard = ({ name, translation, _id }: WordType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false) ;

  return (
    <div 
      className="flex justify-center items-center border-black border-2 rounded w-[100%] h-[200px] cursor-pointer relative" 
      onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
    >
      <div className="font-bold text-4xl">
        { !isOpen && <h2>{name}</h2> }
        { isOpen && <h2>{translation}</h2> }
      </div>

      <h3 className="absolute bottom-0 left-auto right-auto">Click to swipe</h3>
    </div>
  ) ;
}

export default FlashCard ;