'use client'

import { useState } from "react" ;
import { useRouter } from "next/navigation" ;
import { LearningSetType } from "@/types/types" ;

const CreateSet = () => {
  const [formData, setFormData] = useState<Omit<LearningSetType, "_id">>({
    title: '',
    description: '',
    words: []
  }) ;
  const [currentWord, setCurrentWord] = useState<number>(0) ;
  const router = useRouter() ;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target ;

    if (name === "translation" || name === "name") {
      const updatedWords = [...formData.words] ;

      updatedWords[currentWord] = {
        ...updatedWords[currentWord],
        [name]: value
      } ;

      setFormData(prevFormData => ({
        ...prevFormData,
        words: updatedWords
      })) ;

      return ;
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    })) ;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault() ;
    setCurrentWord(prevWord => prevWord + 1) ;
  }

  async function handleFinalSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    const res = await fetch('http://localhost:3000/api/', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }) ;
    const data = await res.json() ;

    router.push("/") ;
    router.refresh() ;

    return data ;
  }
  
  return (
    <>
      <form onSubmit={handleSubmit} className="m-1">
        <input name="title" placeholder="enter title here..." value={formData.title} onChange={handleChange} /> <br />
        <input name="description" placeholder="enter description here..." value={formData.description} onChange={handleChange} /> <br /> <br />
        <input
          name='name'
          placeholder="enter name here..."
          value={formData.words[currentWord]?.name || ''}
          onChange={handleChange} 
        />
        <input
          name='translation'
          placeholder="enter translation here..."
          className="mr-1"
          value={formData.words[currentWord]?.translation || ''}
          onChange={handleChange}
        /> <br />
        <button type="submit">Add Word</button>
      </form>

      <button onClick={handleFinalSubmit}>Final Submit!</button>
    </>
  ) ;
}

export default CreateSet ;