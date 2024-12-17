import connectMongoDB from '@/libs/mongodb'
import Board from '@/models/board'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { newTitle: title, newDescription: description } =
      await request.json()
    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title and description are required' },
        { status: 400 }
      )
    }
    await connectMongoDB()
    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    )
    if (!updatedBoard) {
      return NextResponse.json({ message: 'Board not found' }, { status: 404 })
    }
    return NextResponse.json(
      { message: 'Board updated!', board: updatedBoard },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in PUT /api/boards/[id]:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await connectMongoDB()
    const board = await Board.findOne({ _id: id })
    if (!board) {
      return NextResponse.json({ message: 'Board not found!' }, { status: 404 })
    }
    return NextResponse.json({ board })
  } catch (error) {
    console.error('Error in GET /api/boards/[id]', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
