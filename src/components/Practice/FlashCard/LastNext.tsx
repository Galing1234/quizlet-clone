'use client'

import { SetStateAction } from "react" ;

interface Props {
  setCurrentPage: React.Dispatch<SetStateAction<number>> ;
  currentPage: number ;
  length: number ;
}

const LastNext = ({ setCurrentPage, currentPage, length }: Props) => {
  return (
    <div className="flex">
      <h1 className="mr-1 cursor-pointer" onClick={() => {
        if (currentPage - 1 !== 0) setCurrentPage(prevPage => prevPage - 1) ;
      }}>Last</h1>
      <h1 className="ml-1 cursor-pointer" onClick={() => {
        if (currentPage !== length) setCurrentPage(prevPage => prevPage + 1) ;
      }}>Next</h1>
    </div>
  ) ;
}

export default LastNext ;