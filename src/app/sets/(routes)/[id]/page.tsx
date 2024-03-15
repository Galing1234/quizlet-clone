import Button from "@/components/Practice/RoleButton/RoleButton" ;
import { findSetById, getSets } from "@/lib/utils" ;

const LanguageSet = async ({ params }: { params: { id: string } }) => {
  const learningSets = await getSets() ;
  const set = findSetById(params.id, learningSets) ;

  if (!set) {
    return <div>Set not found!</div> ;
  }

  const setWordsTSX = set?.words.map(word => {
    return (
      <div key={word._id} className="flex items-center">
        <h1 className="flex-1 text-center">{word.name}</h1>
        <h2 className="flex-1 text-center">&#10230;</h2>
        <h1 className="flex-1 text-center">{word.translation}</h1>
      </div>
    ) ;
  }) ;

  return (
    <div className="mx-3 text-center">
      <h1 className="text-3xl my-1">WORDS</h1>

      <div className="border-2 border-black rounded overflow-y-auto max-h-[125px]">
        {setWordsTSX}
      </div>

      <h1 className="text-3xl my-1">PRACTICE</h1>

      <div className="grid grid-cols-2 gap-1">
        <Button role="Flashcards" />
        <Button role="Learn" />
        <Button role="Test" />
      </div> <br />
    </div>
  ) ;
}

export default LanguageSet ;