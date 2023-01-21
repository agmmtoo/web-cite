import { useParams } from 'react-router-dom'

export default function Auth() {
  const params = useParams()
  return (
    <>
      <div>{JSON.stringify(params)}</div>
    </>
  )
}
