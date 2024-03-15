'use client'

import { usePathname, useRouter } from "next/navigation" ;
import { PiCardsDuotone } from "react-icons/pi" ;
import { TbAssembly } from "react-icons/tb" ;
import { IoDocuments } from "react-icons/io5" ;

const Button = ({ role }: { role: string }) => {
  const router = useRouter() ;
  const pathname = usePathname() ;

  return (
    <div className="flex justify-center items-center border-2 border-black rounded cursor-pointer hover:bg-gray-200 active:bg-gray-300" onClick={() => router.push(`${pathname}/${role.toLowerCase()}`)}>
      {
        role === 'Flashcards' &&
        <PiCardsDuotone color="#3b4bc6" size={20} />
      }
      
      {
        role === 'Learn' &&
        <TbAssembly color="#4255FF" size={20} />
      }

      {
        role === 'Test' &&
        <IoDocuments color="#4255FF" size={20} />
      }

      <div className="ml-1 text-2xl">{role}</div>
    </div>
  ) ;
}

export default Button ;