import { Nunito } from "next/font/google"
import "./globals.css"
import Navbar from "./components/navbar/Navbar"
import RegisterModal from "./components/modals/RegisterModal"
import ToasterProvider from "./providers/ToasterProvider"
import LoginModal from "./components/modals/LoginModal"
import RentModal from "./components/modals/RentModal"
import getCurrentUser from "./actions/getCurrentUser"
import { Analytics } from "@vercel/analytics/react"
import SearchModal from "./components/modals/SearchModal"

export const metadata = {
  title: "NewBieNB",
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
      <head />
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <Analytics mode="production" />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
