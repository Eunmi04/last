'use client'

import { useRouter } from 'next/navigation'
import { HiOutlineTrash } from 'react-icons/hi'

interface RemoveBtnProps {
  id: string;
  onDelete: () => void; // onDelete prop 추가
}

export default function RemoveBtn({ id, onDelete }: RemoveBtnProps) {
  const router = useRouter()

  async function removeBoard() {
    const confirmed = confirm(`정말로 ${id} 게시판을 삭제하시겠습니까?`)
    if (confirmed) {
      try {
        const res = await fetch(`/api/boards/${id}`, {
          method: 'DELETE',
        })
        if (!res.ok) {
          throw new Error('게시판 삭제에 실패했습니다.')
        }
        onDelete(); // 삭제 후 onDelete 호출
      } catch (error: unknown) { // error의 타입을 unknown으로 설정
        console.error(error)
        alert(error instanceof Error ? error.message : '게시판 삭제 중 오류가 발생했습니다.')
      }
    }
  }

  return (
    <button className="text-red-400" onClick={removeBoard}>
      <HiOutlineTrash size={24} />
    </button>
  )
}
