import { useState } from "react" ;
import { WordType } from "@/types/types" ;

interface Props {
  translation: string ;
  name: string ;
  id: string ;
  setScore: React.Dispatch<React.SetStateAction<number>> ;
  setDisabled: React.Dispatch<React.SetStateAction<Array<string>>> ;
  wordsLength: number ;
}

const TestForm = ({ translation, name, id, setScore, setDisabled, wordsLength }: Props) => {
  const [formData, setFormData] = useState<string>("") ;
  const [isDisabled, setIsDisabled] = useState<boolean>(false) ;

  console.log(formData.toLowerCase().replace(/[^\p{L}]/gu, '') == translation.toLowerCase().replace(/[^\p{L}]/gu, ''))

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(e.target.value) ;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault() ;

    setIsDisabled(true) ;
    setDisabled(prevIsDisabled => { 
      return [
        ...prevIsDisabled, 
        id
      ] ;
    }) ;

    // ,

    if (formData.toLowerCase().replace(/[^\p{L}]/gu, '') == translation.toLowerCase().replace(/[^\p{L}]/gu, '')) {
      setScore(prevScore => prevScore + Number((100 / wordsLength).toFixed(2))) ;
    }
  }

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <h2 className="mb-3 mt-4 text-3xl">{name}</h2>

      <input 
        type="text" 
        disabled={isDisabled} 
        value={formData} 
        onChange={handleChange} 
        className="border-black border-2 rounded px-2 py-1" 
      />
    </form>
  ) ;
}

export default TestForm ;