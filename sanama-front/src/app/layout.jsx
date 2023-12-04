'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import NextBreadcrumb from '@/components/NextBreadcrumb'
import { Toaster } from 'sonner'
import Navbar from '@/components/navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
	return (
		<html lang="es">
			<head>
				<title>Sanama</title>
			</head>

			<body className={`${inter.className} bg-[#EFEFEF] w-auto h-screen`}>
				<Navbar />
				<main className={`h-screen`}>
					<div className="grid grid-cols-[1fr_10fr_1fr]">
						<div></div>
						<div>
							{
								<NextBreadcrumb
									homeElement={''}
									separator={<span>/</span>}
									activeClasses="text-gray-700 font-extrabold text-md"
									containerClasses="flex py-5 bg-transparent rounded-t-md text-black"
									listClasses="px-4 text-md text-slate-700 hover:text-blue-700"
									capitalizeLinks
								/>
							}

							{children}
						</div>
						<div></div>
					</div>
					<Toaster position="top-right" richColors visibleToasts={12}/>
				</main>
			</body>
		</html>
	)
}
