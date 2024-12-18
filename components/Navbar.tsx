'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FiAlignJustify } from 'react-icons/fi';

export default function Naver() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrollingDown(true);
    } else {
      setScrollingDown(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <nav className={`fixed top-0 left-0 right-0 py-4 px-6 flex items-center justify-between z-50 text-white bg-black transition-transform duration-300 ${scrollingDown ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="font-bold text-2xl">
          <Link href=".">PORTFOLIO</Link>
        </div>
        <div className="hidden lg:flex space-x-4">
          <div className="flex gap-4 items-center">
            <Link href="/team" className='text-white hover:text-gray-300 hover:underline'>TEAM</Link>
            <Link href="/project" className='text-white hover:text-gray-300 hover:underline'>PROJECT</Link>
            <Link href="/board" className='text-white hover:text-gray-300 hover:underline'>BOARD</Link>
          </div>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white"
          >
            <FiAlignJustify size={24} />
          </button>
        </div>
      </nav>

      {/* 조건부 메뉴 표시 - 모바일 메뉴 */}
      {menuOpen && (
        <div className="lg:hidden fixed right-0 top-16 bg-white p-6 rounded-md shadow-md w-64 z-50"> 
          <div className="flex flex-col space-y-4">
            <Link href="/team" className='text-gray-800 hover:text-gray-600 hover:underline py-2'>TEAM</Link>
            <Link href="/project" className='text-gray-800 hover:text-gray-600 hover:underline py-2'>PROJECT</Link>
            <Link href="/board" className='text-gray-800 hover:text-gray-600 hover:underline py-2'>BOARD</Link>
          </div>
        </div>
      )}
    </div>
  );
}
