import { redirect } from 'next/navigation'
import uuid4 from 'uuid4'

const Home = () => {
   const id = uuid4()
   redirect(`/id/${id}`)
}

export default Home
