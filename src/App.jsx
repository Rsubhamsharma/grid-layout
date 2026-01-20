import { useEffect, useState } from 'react'
import Card from './components/Card'
import './App.css'
import { data } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function App() {
  const [cards, setCards] = useState([])
  const navigate = useNavigate()

  const fetchCards = () => {
    axios.get('http://localhost:3000/features')
      .then(datas => setCards(datas.data))

  }
  useEffect(() => {
    fetchCards()
  }, [])


  const handleEdit = (id) => navigate(`/admin/${id}`)


  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/features/${id}`)
    fetchCards()
  }
  return (
    <>
      {console.log(data)}
      <div className='grid'>


        {cards.map((data) => {
          return <Card
            key={data.id}
            logoUrl={data.logo}
            heading={data.title}
            text={data.description}
            imageUrl={data.image}
            id={data.id}
            onEdit={handleEdit}
            onDelete={handleDelete}

          />

        })}
      </div>
    </>
  )
}

export default App
