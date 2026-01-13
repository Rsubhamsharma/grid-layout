import React from 'react'

function Card({logoUrl,heading,text,imageUrl}) {
  return (
    <div className="card">
        <div className="text-container">
            <img src={logoUrl} alt={heading} className="logo" height="60" width="60"/>
            <div className="text">
                <h2>{heading} <br /></h2>
                <hr />
                <p>{text}</p>
            </div>
        </div>
        <div className="image">
            <img src={imageUrl} alt={heading} height="80%" width="150px" />
        </div>
    </div>
  )
}

export default Card
