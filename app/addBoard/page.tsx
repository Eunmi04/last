'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBoardPage() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      alert('Title is required');
      return;
    }

    setLoading(true); // 요청 시작 시 로딩 상태 설정

    try {
      const res = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }), // 제목만 포함
      });

      if (!res.ok) {
        // 응답이 성공적이지 않을 경우
        const errorData = await res.text(); // 텍스트로 응답 받기
        throw new Error(errorData || 'Failed to create a board');
      }

      router.push('/board'); // 성공 시 홈으로 이동
      router.refresh(); // 페이지 새로고침
    } catch (error: unknown) { // Use unknown instead of any
      console.error(error);
      if (error instanceof Error) {
        alert(error.message); // 사용자에게 에러 메시지 표시
      } else {
        alert('An unknown error occurred'); // Fallback for non-Error objects
      }
    } finally {
      setLoading(false); // 요청 완료 후 로딩 상태 해제
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold mb-8">게시판 작성하기</h1>
      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-gray-800 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
          placeholder="게시판 제목"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          className={`bg-black text-white font-bold px-6 py-3 rounded-md transition duration-200 hover:bg-gray-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="submit"
          disabled={loading}
        >
          {loading ? '작성 중...' : '게시판 작성'}
        </button>
      </form>
    </div>
  );
}

