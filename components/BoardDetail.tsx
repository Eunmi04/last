'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'
import RemoveBtn from '@/components/RemoveBtn'

interface Board {
  _id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

export default function BoardDetail({ id }: { id: string }) {
  const router = useRouter()
  const [board, setBoard] = useState<Board | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await fetch(`/api/boards/${id}`)
        if (!res.ok) throw new Error('Failed to fetch board')
        const data = await res.json()
        setBoard(data.board)
        setError(null)
      } catch (error) {
        console.error(error)
        setError('게시판 불러오는데 실패했습니다')
      } finally {
        setLoading(false)
      }
    }

    fetchBoard()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <div className="mt-4 text-lg font-medium text-gray-700">
            게시판을 불러오는 중...
          </div>
          <div className="text-sm text-gray-500 mt-2">
            잠시만 기다려주세요
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
            게시판을 불러오는데 실패했습니다
          </div>
          <div className="text-gray-500">{error}</div>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            돌아가기
          </button>
        </div>
      </div>
    )
  }

  if (!board) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">🔍</div>
          <div className="text-lg font-medium text-gray-700 mb-2">
            게시판을 찾을 수 없습니다
          </div>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{board.title}</h1>
          <div className="flex items-center gap-4">
            <RemoveBtn 
              id={board._id} 
              onDelete={() => router.push('/board')}
            />
            <Link
              href={`/editBoard/${board._id}`}
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
        <p className="prose max-w-none mb-8 text-gray-600 whitespace-pre-wrap">{board.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
          <p>작성일: {new Date(board.createdAt).toLocaleDateString()}</p>
          <p>수정일: {new Date(board.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
