import connectMongoDB from '@/libs/mongodb';
import Board from '@/models/board';
import { NextRequest, NextResponse } from 'next/server';

// GET 요청: 특정 ID의 게시판 가져오기
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongoDB();
    const board = await Board.findById(params.id); // params.id 사용

    if (!board) {
      return NextResponse.json({ message: 'Board not found!' }, { status: 404 });
    }
    
    return NextResponse.json({ board });
  } catch (error) {
    console.error('Error in GET /api/boards/[id]:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE 요청: 특정 ID의 게시판 삭제하기
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongoDB();
    const { id } = await params; // params를 await하여 id를 가져옵니다.

    const deletedBoard = await Board.findByIdAndDelete(id);
    
    if (!deletedBoard) {
      return NextResponse.json({ message: 'Board not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Board deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting board:', error);
    return NextResponse.json({ message: 'Failed to delete board' }, { status: 500 });
  }
}
