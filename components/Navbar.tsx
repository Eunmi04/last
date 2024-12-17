'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { FiAlignJustify } from 'react-icons/fi'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

export default function Naver() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 py-6 px-8 flex items-center justify-between z-50 text-purple-700 bg-white">
        <div className="text-purple-700 font-bold  text-2xl">
          <Link href=".">PORTFOLIO</Link>
        </div>
        <div className="hidden lg:flex space-x-4">
          <div className="flex gap-4 items-center">
            <div>
              <Link href="/team" className='hover:text-purple-400 hover:underline'>TEAM</Link>
            </div>
            <div>
              <Link href="/project" className='hover:text-purple-400 hover:underline'>PROJECT</Link>
            </div>
            <div>
              <Link href="/board" className='hover:text-purple-400 hover:underline'>BOARD</Link>
            </div>
            {status === 'authenticated' ? (
              <>
                <div className="flex gap-2 items-center">
                  <Image
                    className="rounded-full"
                    src={session?.user?.image ?? '/default-avatar.png'}
                    width={40}
                    height={40}
                    alt={session?.user?.name ?? 'user'}
                  />
                  <span className="text-white font-bold">
                    {session?.user?.name}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-purple-300 hover:bg-purple-400 text-white px-4 py-2 rounded-md text-lg font-bold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-purple-300 hover:bg-purple-400 text-white px-4 py-2 rounded text-lg font-bold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-purple-500"
          >
            <FiAlignJustify size={24} />
          </button>
        </div>
      </nav>

      {/* 조건부 메뉴 표시 - 모바일 메뉴 */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col space-y-2 mt-4 bg-white p-4 rounded-md shadow-md">
          <div className="flex gap-4 items-center">
            {status === 'authenticated' ? (
              <>
                <div className="flex gap-2 items-center">
                  <Image
                    className="rounded-full"
                    src={session?.user?.image ?? '/default-avatar.png'}
                    width={40}
                    height={40}
                    alt={session?.user?.name ?? 'user'}
                  />
                  <span className="text-black font-bold">
                    {session?.user?.name}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-lg font-bold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-lg font-bold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
