import axios from 'axios'
import React, { useState, useEffect } from 'react'


import './AdminPage.css'

function AdminPage() {
  const API_URL = 'http://192.168.1.92:3000/features'
  const [cards, setCards] = useState([])
  const [addCard, setAddCard] = useState(false)
  const [editCardId, setEditCardId] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    logo: "",
    color: "",
    image: "",
    active: true,
    logoName: "",
    imageName: ""
  })


  const fetchCards = async () => {
    const res = await axios.get(API_URL)
    setCards(res.data)
  }

  useEffect(() => {
    fetchCards()
  }, [])

  const resetForm = () => {
    setFormData({
    
      title: "",
      description: "",
      logo: "",
      color: "",
      image: "",
      active: true,
      logoName: "",
      imageName: ""
    })
    setAddCard(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(API_URL, newCard)
      resetForm()
      setCards(prev => [...prev, formData])
    }
    catch (error) {
      console.log('Submit error:', error.message)
    }
  }

const handleCardChange = (id, field, value) => {
    setEditCardId(id)
    setCards(prev =>
      prev.map((card,index) =>
        (card.id === id || !card.id ===id )? { ...card, [field]: value } : card
      )
    )
  }

  const handleCardImageChange = (e, id, field, index) => {
    const file = e.target.files[0]
    if (!file) return
    setEditCardId(id)
    const reader = new FileReader()
    reader.onloadend = () => {
      setCards(prev =>
        prev.map((card) =>
          (card.id === id || (!card.id ))
            ? { ...card, [field]: reader.result, [`${field}Name`]: file.name }
            : card
        )
      )
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async (card) => {
    try {
      const res = await axios.put(`${API_URL}/${card.id}`, card)
      setCards((prev) => prev.map(c => c.id === card.id ? res.data : c))
      setEditCardId(null)
    
    } catch (error) {
      console.log('Save error:', error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setCards((prev) => prev.filter(card => card.id !== id))
     
    } catch (error) {
      console.log('Delete error:', error.message)
    }
  }
const handleAdd = () => {
  if (!addCard) {
    setAddCard(true)
    const emptyCard = {
      title: "",
      description: "",
      logo: "",
      color: "",
      image: "",
      active: true,
      logoName: "",
      imageName: ""
    }
   
    setCards((prev) => [...prev, emptyCard])
 
  } else {
    setCards((prev) => prev.filter(card => card.id !== undefined && card.id !== null))
    setAddCard(false)
    resetForm()
  }
}

const handleAddCard = async (newCard) => {
  try {
    const res = await axios.post(`${API_URL}`, newCard)
    
    setAddCard(false)
    setCards(prev => prev.map (card => !card.id ? res.data : card))
    resetForm()
   
  } catch (error) {
    console.log('Add error:', error.message)
  }
}

  return (
    <>
      <div className='nav'>
        <h1 className='heading'>All Cards</h1>
        <button
          className='add-button'
          onClick={handleAdd}
        >
          {addCard ? 'Close Form' : 'Add a Card'}
        </button>
      </div>

      <div className='container'>

        {cards.map((card, index) => (
          <div key={card.id} className='admin-container'>
            <h3>Card {index + 1}</h3>

            <form className='form'onSubmit={handleSubmit}>
              <p className='image-name'> Selected Image : {card.logoName}</p>

              <input type="file" accept="image/*"
                onChange={(e) => handleCardImageChange(e, card.id, "logo", index)} />

              <input
                type='text'
                value={card.title}
                onChange={(e) => handleCardChange(card.id || index, "title", e.target.value)}
              />

              <input
                type="text"
                value={card.description}
                onChange={(e) => handleCardChange(card.id || index, "description", e.target.value)}
              />

              <input
                type="color"
                value={card.color}
                onChange={(e) => handleCardChange(card.id || index, "color", e.target.value)}
              />

              <div className='active-checkbox'>
                <label>Active:</label>
                <input
                  type="checkbox"
                  checked={card.active !== false}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    if (card.id) {
                      axios.put(`${API_URL}/${card.id}`, { ...card, active: newValue })
                        .then(() => setCards(prev => prev.map(c => c.id === card.id ? { ...c, active: newValue } : c)))
                    } else {
                      handleCardChange(card.id || index, "active", newValue)
                    }
                  }}
                />
              </div>

              <input type="file" accept="image/*"
                onChange={(e) => handleCardImageChange(e, card.id, "image", index)} />
              <p className='image-name'>Selected Image : {card.imageName}</p>
            </form>
            <div className='actions'>
             
              {card.id ? 
              <button onClick={() => handleDelete(card.id)}>Delete</button>
              : <button onClick={()=>handleAddCard(card)}>Add </button>
                }
            </div>


          </div>
        ))}

        

      </div>

      <div className='save-btn'>
        <button className="saveBtn" onClick={() => {
          const card = cards.find(card => card.id === editCardId)
          if (card) {
            handleSave(card)
          }
        }}>
          Save
        </button>
      </div>

    </>
  )
}

export default AdminPage