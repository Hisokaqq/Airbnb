import Model from './components/models/Model'
import RegisterModel from './components/models/RegisterModel'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
export const metadata = {
  title: 'Airbnb',
  description: 'Hotel Booking',
}

const font = Nunito({
  subsets: ["latin"]
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <Model isOpan={true} title='Login'/> */}
        <ToasterProvider/>
        <RegisterModel/>
        <Navbar/> 
        {children}

        </body>
    </html>
  )
}
