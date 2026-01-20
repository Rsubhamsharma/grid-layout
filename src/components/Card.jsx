import React from 'react'

function Card({ id, heading, text, onEdit, onDelete, logoUrl, imageUrl }) {


  return (
    <div className="card">
      <div className="text-container">
        <img src={logoUrl} alt={heading} className="logo" height="60" width="60" />
        <div className="text text-content">
          <h2>{heading} <br /></h2>
          <hr />
          <p>{text}</p>
        </div>
      </div>
      <div className="image">
        <img src={imageUrl} alt={heading} height="100%" width="60%" />
      </div>
      <div className='buttons'>
        <button className='edit-btn' onClick={() => {
          onEdit(id)
        }}>Edit
        </button>
        <button className='delete-btn' onClick={() => { onDelete(id) }}>Delete

        </button>
      </div>
    </div>
  )
}

export default Card
