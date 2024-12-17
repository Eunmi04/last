'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddBoard() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !description) {
      alert('Title and description are required.')
      return; // 추가: 유효성 검사 후 함수 종료
    }
    try {
      const res = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })
      if (res.ok) {
        router.push('/board')
      } else {
        throw new Error('Failed to create a board')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">게시판 작성하기</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="border border-slate-500 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
          type="text"
          placeholder="게시판 제목"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          className="border border-slate-500 p-4 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
          placeholder="게시판 설명"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          value={description}
        />
        <button
          className="bg-purple-400 text-white font-bold px-6 py-3 rounded-md shadow hover:bg-purple-500 transition duration-200"
          type="submit"
        >
          작성하기
        </button>
      </form>
    </div>
  )
}
