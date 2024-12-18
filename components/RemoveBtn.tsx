'use client';

import { HiOutlineTrash } from 'react-icons/hi';

interface RemoveBtnProps {
  id: string;
  onDelete: () => void; // onDelete prop 추가
}

export default function RemoveBtn({ id, onDelete }: RemoveBtnProps) {
  

  async function removeBoard() {
    const confirmed = confirm(`정말로 ${id} 게시판을 삭제하시겠습니까?`);
    if (confirmed) {
      try {
        const res = await fetch(`/api/boards/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const errorData = await res.text(); // 텍스트로 응답 받기
          throw new Error(errorData || '게시판 삭제에 실패했습니다.');
        }

        onDelete(); // 삭제 후 onDelete 호출
        alert('게시판이 삭제되었습니다.'); // 성공 메시지 추가
      } catch (error) {
        console.error('Error removing board:', error);
        alert(error instanceof Error ? error.message : '게시판 삭제 중 오류가 발생했습니다.');
      }
    }
  }

  return (
    <button className="text-red-400" onClick={removeBoard}>
      <HiOutlineTrash size={24} />
    </button>
  );
}
