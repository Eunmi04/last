import connectMongoDB from '@/libs/mongodb'
import Board from '@/models/board'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json()
    if (!title || !description) {
      return NextResponse.json(
        {
          message: 'Title and description are required',
        },
        { status: 400 }
      )
    }
    await connectMongoDB()
    await Board.create({ title, description })
    return NextResponse.json({ message: 'Board created' }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/boards', error)
    return NextResponse.json(
      { message: 'Invalid server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectMongoDB()
    const boards = await Board.find()
    return NextResponse.json({ boards })
  } catch (error) {
    console.error('Error in GET /api/boards', error)
    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }
    await connectMongoDB()
    const deletedBoard = await Board.findByIdAndDelete(id)
    if (!deletedBoard) {
      return NextResponse.json({ message: 'Board not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Board deleted!' }, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/boards', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
