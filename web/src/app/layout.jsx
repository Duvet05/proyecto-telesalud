"use client"
import { useState } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'


import Sidebar from '@/components/sidebar/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen)
  }

  return (
    <html lang="en">
      <head>
        <title>SANAMA</title>
      </head>
      <body className={`${inter.className} flex  transition-all ease-linear duration-300`}>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="min-h-screen box-border w-full border-[40px] border-slate-300 bg-slate-200">
          {children}
        </main>
      </body>
    </html >
  )
}
