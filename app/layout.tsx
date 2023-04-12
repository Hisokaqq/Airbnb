import Model from './components/models/Model'
import RegisterModel from './components/models/RegisterModel'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import LoginModel from './components/models/LoginModel'
import getCurrentUser from './actions/getCurrentUser'
import RentModel from './components/models/RentModel'
export const metadata = {
  title: 'Airbnb',
  description: 'Hotel Booking',
}

const font = Nunito({
  subsets: ["latin"]
})
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        {/* <Model isOpan={true} title='Login'/> */}
        <ToasterProvider/>
        <RentModel/>
        <RegisterModel/>
        <LoginModel/>
        <Navbar currentUser={currentUser}/> 
        {children}

        </body>
    </html>
  )
}
