import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <div><h1 className='text-rose-500 text-2xl'>Hello worlds</h1></div>
  )
}
