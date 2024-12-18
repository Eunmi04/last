import React from 'react'
import BoardList from '@/components/BoardList'



export default function BoardPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
        </div>
        <BoardList />
      </div>
    </div>
  )
}