import { useEffect, useState } from 'react'
import Card from './components/Card'
import './App.css'

function App() {
  const [datas, setDatas] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    fetch('https://krds-assignment.github.io/aoc/api-assets/data.json')
    .then(res=>res.json())
    .then(data=>setDatas(data.features))
  }, [])
  
  return (
    <div className='grid'>
      {datas.map((data)=>{
        return <Card 
          key={data.title}
          logoUrl={data.logo}
          heading={data.title}
          text={data.desc}
          imageUrl={data.image}
        />
      })}
    </div>
  )
}

export default App
