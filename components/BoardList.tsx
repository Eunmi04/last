'use client';
import { useState, useEffect, useCallback } from 'react';
import RemoveBtn from './RemoveBtn'; // RemoveBtn 컴포넌트 import
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

interface Board {
  _id: string;
  title: string;
  createdAt: string;
}

export default function BoardList() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 기본 URL 설정
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://last-ivory.vercel.app';

  const fetchBoards = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/boards`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }

      const data = await res.json();
      setBoards(data.boards || []);
      setError(null);
    } catch (error) {
      console.error('Error loading boards:', error);
      setError(error instanceof Error ? error.message : '게시판을 불러오는데 실패했습니다');
      setBoards([]);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const handleDeleteBoard = async (boardId: string) => {
    try {
      const res = await fetch(`${apiUrl}/api/boards/${boardId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`삭제 실패: ${res.status}`);
      }

      setBoards(prevBoards => prevBoards.filter(board => board._id !== boardId));
    } catch (error) {
      console.error('Error deleting board:', error);
      alert('게시판 삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="text-center">
          <div className="relative flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
            <div className="mt-4 text-lg font-medium text-gray-700">게시판을 불러오는 중...</div>
            <div className="mt-2 text-sm text-gray-500">잠시만 기다려주세요</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <div className="text-lg font-medium text-black mb-2">게시판을 불러오는데 실패했습니다</div>
          <div className="text-gray-500">{error}</div>
          <button onClick={() => fetchBoards()} className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!boards.length) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">📝</div>
          <div className="text-lg font-medium text-black mb-2">아직 작성된 게시판이 없습니다</div>
          <Link href="/addBoard" className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
            첫 게시판 작성하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-6">게시판 목록</h1>

      {/* 게시판 카드 그리드 */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-full px-4">
        {boards.map((board) => (
          <li
            key={board._id}
            className="flex flex-col justify-between items-start bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            style={{ height: '200px', width: '200px' }} // 정사각형 모양 유지
          >
            <span className="text-xl font-semibold text-black">{board.title}</span>
            <span className="text-sm text-gray-500">{new Date(board.createdAt).toLocaleDateString()}</span>
            <RemoveBtn id={board._id} onDelete={() => handleDeleteBoard(board._id)} />
          </li>
        ))}
      </ul>

      {/* 추가 버튼 */}
      <Link
        href="/addBoard"
        className="fixed bottom-8 right-8 bg-gray-600 text-white rounded-full p-4
        hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl
        transform hover:-translate-y-1 group flex items-center gap-2"
      >
        <FiPlus className="w-6 h-6" />
        <span className="hidden group-hover:inline whitespace-nowrap pr-2">
          기록장 쓰기
        </span>
      </Link>
    </div>
  );
}
