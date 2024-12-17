import BoardDetail from '@/components/BoardDetail'

export default async function BoardPage({ params }: { params: { id: string } }) {
  const id = (await params).id
  return <BoardDetail id={id} />
}