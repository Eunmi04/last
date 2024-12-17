interface Board {
    _id: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
  }
  
  export function convertDocToObj(doc: Board) {
    return {
      _id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      createdAt: doc.createdAt || '',
      updatedAt: doc.updatedAt || '',
    }
  }
  