import { Nunito } from "next/font/google"
import "./globals.css"
import Navbar from "./components/navbar/Navbar"
import RegisterModal from "./components/modals/RegisterModal"
import ToasterProvider from "./providers/ToasterProvider"
import LoginModal from "./components/modals/LoginModal"
import RentModal from "./components/modals/RentModal"
import getCurrentUser from "./actions/getCurrentUser"
import ClientOnly from "./components/ClientOnly"

export const metadata = {
  title: "AirBnB",
  description: "AirBnB clone",
}

const font = Nunito({
  subsets: ["latin"],
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
        {/* <ClientOnly> */}

        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        {/* </ClientOnly> */}
        {children}
      </body>
    </html>
  )
}
