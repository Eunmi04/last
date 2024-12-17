import EditBoardForm from '@/components/EditBoardForm'
const apiUrl = process.env.API_URL
const getBoardById = async (id: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/boards/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch board.')
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
export default async function EditBoard({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const { board } = await getBoardById(id)
  const { title, description } = board
  return <EditBoardForm id={id} title={title} description={description} />
}

