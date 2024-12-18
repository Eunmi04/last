import connectMongoDB from '@/libs/mongodb';
import Board from '@/models/board';
import { NextRequest, NextResponse } from 'next/server';

// GET 요청: 모든 게시판 가져오기
export async function GET() {
  try {
    await connectMongoDB();
    const boards = await Board.find().sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      boards: boards,
    });
  } catch (error) {
    console.error('Error in GET /api/boards:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch boards',
      boards: [],
    }, { status: 500 });
  }
}

// POST 요청: 새로운 게시판 생성
export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json(); // 제목만 받음
    if (!title) {
      return NextResponse.json(
        { message: 'Title is required' },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const newBoard = await Board.create({ title }); // 새로운 게시판 생성
    return NextResponse.json({ message: 'Board created', board: newBoard }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/boards:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
