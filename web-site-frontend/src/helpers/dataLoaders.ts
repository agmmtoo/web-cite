import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom'
import { getNoteByKey } from '../api/notes.api'

export async function noteLoader({ params, request: { signal } }: LoaderFunctionArgs): Promise<LoaderFunction> {
  return await getNoteByKey(params.key, signal)
}
