'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
interface EditBoardFormProps {
  id: string
  title: string
  description: string
}
export default function EditBoardForm({
  id,
  title,
  description,
}: EditBoardFormProps) {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/boards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newDescription }),
      })
      if (!res.ok) {
        throw new Error('Failed to update board')
      }
      router.push('/board')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            className="border border-slate-500 p-4"
            type="text"
            placeholder="Board Title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTitle(e.target.value)
            }
            value={newTitle}
          />
          <textarea
            className="border border-slate-500 p-4 h-32"
            placeholder="Board Description"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setNewDescription(e.target.value)
            }
            value={newDescription}
          />
          <button
            className="bg-purple-600 text-white font-bold px-6 py-3 w-fit rounded-md"
            type="submit"
          >
            수정하기
          </button>
        </form>
      )
    }
    