'use client'

import { useState, useEffect } from 'react'
import { FiPlus } from 'react-icons/fi'
import { FiFeather } from "react-icons/fi";
import Link from 'next/link'

interface Board {
  _id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  isStarred?: boolean
  folderId: string
}

export default function BoardList() {
  const [boards, setBoards] = useState<Board[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBoards = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/boards', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      })

      if (!res.ok) {
        throw new Error('서버 연결에 실패했습니다')
      }

      const data = await res.json()

      if (!data.boards) {
        throw new Error('데이터 형식이 올바르지 않습니다')
      }

      setBoards(data.boards)
      setError(null)
    } catch (error: any) {
      console.error('Error loading boards:', error)
      setError(error.message || '메모를 불러오는데 실패했습니다')
      setBoards([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBoards()
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="text-center">
          <div className="relative flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div className="mt-4 text-lg font-medium text-gray-700">
              기록장을 불러오는 중...
            </div>
            <div className="mt-2 text-sm text-gray-500">
              잠시만 기다려주세요
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <div className="text-lg font-medium text-gray-700 mb-2">
            기록장을 불러오는데 실패했습니다
          </div>
          <div className="text-gray-500">{error}</div>
          <button
            onClick={() => fetchBoards()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  if (!boards.length) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">📝</div>
          <div className="text-lg font-medium text-gray-700 mb-2">
            아직 작성된 기록장이 없습니다
          </div>
          <Link
            href="/addBoard"
            className="inline-block mt-4 px-4 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-500 transition-colors"
          >
            첫 기록장 작성하기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">게시판 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl w-full">
        {boards.map((board) => (
          <Link key={board._id} href={`/boards/${board._id}`}>
            <div className="group relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{board.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{new Date(board.createdAt).toLocaleDateString()}</p>
              {/* 핀 아이콘 추가 */}
              <FiFeather size={20} className="absolute top-4 right-4 text-purple-400 opacity-70" />
              {/* 추가 설명 또는 정보를 여기에 배치 */}
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/addBoard"
        className="fixed bottom-8 right-8 bg-purple-400 text-white rounded-full p-4
          hover:bg-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl
          transform hover:-translate-y-1 group flex items-center gap-2"
      >
        <FiPlus className="w-6 h-6" />
        <span className="hidden group-hover:inline whitespace-nowrap pr-2">
          게시판 쓰기
        </span>
      </Link>
    </div>
  )
}
