import { useEffect, useState } from 'react'
import Card from './components/Card'
import './App.css'
import { useQueryClient,useQuery } from '@tanstack/react-query'

import axios from 'axios'

function App() {
  const [cards, setCards] = useState([])
  // const queryClient = useQueryClient()

  const fetchCards = () => {
    axios.get('http://localhost:3000/features')
      .then(datas => setCards(datas.data))
  }
  // const {data ,is} = useQuery({queryKey:['Cards'],queryFn:fetchCards()})
  useEffect(() => {
    fetchCards();

  }, [])
  return (
    <>
      <div className='grid'>
        {cards.filter(card => card.active !== false).map((data) => {
          return <Card
            key={data.id}
            logoUrl={data.logo}
            heading={data.title}
            text={data.description}
            imageUrl={data.image}
            id={data.id}
            color={data.color}
          />
        })}
      </div>
    </>
  )
}

export default App



