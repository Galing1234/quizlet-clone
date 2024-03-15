'use client'

import { useState, Dispatch, SetStateAction, useRef } from "react" ;

interface Props { 
  word: string ;
  isCorrect: boolean ;
  setCurrentPage: Dispatch<SetStateAction<number>> ;
  wordsLength: number ;
  currentPage: number ;
  setIsDisabled: Dispatch<SetStateAction<boolean>> ;
  isDisabled: boolean ;
}

const LearnButton = ({ 
  word, 
  isCorrect, 
  setCurrentPage, 
  wordsLength, 
  currentPage,
  setIsDisabled,
  isDisabled
}: Props) => {
  const [isClicked, setIsClicked] = useState(false) ;
  const audioRef = useRef(null) ;
  const correctStyles = {
    backgroundColor: "#0F0",
    color: "#FFF"
  }
  const incorrectStyles = {
    backgroundColor: "#F00",
    color: "#FFF"
  }

  function play(action: 0 | 1) {
    if (action === 0) {
      const audio = document.getElementById('a1') as HTMLAudioElement ;
      audio.play() ;

      return ;
    }

    const audio = document.getElementById('a2') as HTMLAudioElement ;
    audio.play() ;
  }

  return (
    <>
      <button 
        disabled={isDisabled}
        className="border-black border-2 rounded w-full text-ellipsis hover:bg-gray-100 active:bg-gray-200" 
        style={
          isClicked 
            ? isCorrect 
              ? correctStyles  
              : incorrectStyles  
            : isDisabled && isCorrect ? correctStyles : {}
        }
        onClick={() => { 
          setIsClicked(true) ; 
          setIsDisabled(true) ;

          if (isCorrect) play(0) ;
          else play(1) ;

          const interval = setInterval(() => {          
            if (!(currentPage + 1 > wordsLength)) {
              setIsClicked(false) ;
              setIsDisabled(false) ;
              setCurrentPage(prevPage => prevPage + 1) ;
            }

            clearInterval(interval) ;
          }, 1000) ;
        }}
      >
        {word && word}
      </button>
      <audio id='a1'>
        <source src='/check-mark-sound-effect.mp3' type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>

      <audio id='a2'>
        <source src='/buzzer-or-wrong-answer-sound-effect.mp3' type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>
    </>
    
  ) ;
}

export default LearnButton ;

// FINISH FOR TOMORROW!