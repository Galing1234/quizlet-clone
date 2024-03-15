import Link from "next/link" ;
import SetCard from "@/components/Main/SetCard/SetCard" ;
import { getSets } from "@/lib/utils" ;
import { LearningSetType } from "@/types/types" ;

const HomePage = async () => {
  const sets = await getSets() ;
  const setsCorrected = sets.reverse() ;
  const learningSetsTSX = setsCorrected.map((set: LearningSetType) => {
    return (
      <div key={set._id}>
        <SetCard
          {...set}
        />
      </div>
    ) ;
  }) ;

  return (
    <div className="mx-3 relative">
      <h1 className="text-2xl my-1">SETS</h1>

      <div className="flex flex-basis-[100px] overflow-auto flex-shrink-0 flex-grow-0">
        {learningSetsTSX}
      </div>
      
      <Link
        href="/sets/create-set"
        className="absolute top-0 right-0 text-2xl"
      >Add</Link>
    </div>
  ) ;
}

export default HomePage ;