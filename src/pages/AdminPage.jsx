import axios from 'axios'
import React, { use } from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './AdminPage.css'


function AdminPage() {
  const { id } = useParams()
  const [cards, setCards] = useState([])
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState('')
  const [image, setImage] = useState('')


  const fetchCards = () => {
    axios.get('http://localhost:3000/features')
      .then(datas => setCards(datas.data))

  }
  useEffect(() => {
    fetchCards()
  }, [])

  useEffect(() => {
    if (id && cards.length > 0) {
      const card = cards.find(c => String(c.id) === String(id))

      if (card) {
        setTitle(card.title)
        setDescription(card.description)
        setLogo(card.logo)
        setImage(card.image)
        setEditingId(String(card.id))
      }
    }
  }, [id, cards])
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Data now contains the Base64 strings for logo and image if they were updated
    const data = { title, description, logo, image }
    try {
      if (editingId) {

        await axios.put(`http://localhost:3000/features/${editingId}`, data)
        setTitle('')
        setDescription('')
        setLogo('')
        setImage('')
        setEditingId(null)
      }
      else {

        await axios.post('http://localhost:3000/features', data)
        setTitle('')
        setDescription('')
        setLogo('')
        setImage('')
      }
      fetchCards()

    } catch (error) {
      console.log('Error submitting form:', error.message)
      if (error.response && error.response.status === 404) {
        console.log(error.message)
      }
    }
  }

  const handleFileChange = (e, setFunction) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFunction(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleEdit = async (card) => {

    setTitle(card.title)
    setDescription(card.description)
    setLogo(card.logo)
    setImage(card.image)
    setEditingId(String(card.id))
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/features/${id}`)
      fetchCards()
    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div className='admin-container'>

      <form onSubmit={handleSubmit} className='form'>
        <h2 className='heading'>{editingId ? 'Edit Card' : 'Add New Card'}</h2>

        <div className='logo-image' >

          <label>Logo Image:</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setLogo)} />

        </div>

        <input type='text' placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder='Enter Description ' value={description}
          onChange={(e) => setDescription(e.target.value)} />

        <div className='main-image'>
          <label >Main Image:</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImage)} />

        </div>

        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>
      <hr />
      <div className="card-list">


      </div>
    </div>
  )
}

export default AdminPage
