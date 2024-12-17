'use server'
import connectMongoDB from '@/libs/mongodb'
import Board from '@/models/board'
import { revalidatePath } from 'next/cache'
import {convertDocToObj} from '@/libs/helpers'

export async function createBoard(title: string, description: string) {
  try {
    await connectMongoDB()
    const doc = await Board.create({ title, description })
    revalidatePath('/')
    return { success: true, board: convertDocToObj(doc) }
  } catch (error) {
    throw new Error(`토픽 생성에 실패했습니다: ${error}`)
  }
}// 2. 토픽 수정: Update (PUT)
export async function updateBoard(
  id: string,
  title: string,
  description: string
) {
  try {
    await connectMongoDB()
    const doc = await Board.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    )
    if (!doc) throw new Error('토픽을 찾을 수 없습니다')
    revalidatePath('/')
    return { success: true, board: convertDocToObj(doc) }
  } catch (error) {
    throw new Error(`토픽 수정에 실패했습니다: ${error}`)
  }
}
// 3. 단일 토픽 조회 (GET)
export async function getBoard(id: string) {
      try {
        await connectMongoDB()
        const doc = await Board.findById(id)
        if (!doc) throw new Error('토픽을 찾을 수 없습니다')
        return { success: true, board: convertDocToObj(doc) }
      } catch (error) {
        throw new Error(`토픽 조회에 실패했습니다: ${error}`)
      }
    }// 4. 모든 토픽 조회 (GET)
    export async function getAllBoards() {
      try {
        await connectMongoDB()
        const docs = await Board.find({}).sort({ createdAt: -1 })
        const boards = docs.map((doc) => convertDocToObj(doc))
        return { success: true, boards }
      } catch (error) {
        throw new Error(`토픽 목록 조회에 실패했습니다: ${error}`)
      }
    }// 5. 토픽 삭제: DELETE
    export async function deleteBoard(id: string) {
      try {
        await connectMongoDB()
        const doc = await Board.findByIdAndDelete(id)
        if (!doc) throw new Error('토픽을 찾을 수 없습니다')
        revalidatePath('/')
        return { success: true }
      } catch (error) {
        throw new Error(`토픽 삭제에 실패했습니다: ${error}`)
      }
    }