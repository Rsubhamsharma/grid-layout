const grid = document.getElementById('grid')

const fetchData = async () => {
  try {
    const res = await fetch('https://krds-assignment.github.io/aoc/api-assets/data.json')
    
    const data = await res.json()
    console.log('Fetched data:', data)
    const items = data.features || []
    showCards(items)
  } catch (err) {
    console.error('Fetch error:', err)
    
  }
}

function showCards(items){
 


  items.forEach(item => {
    const title = item.title 
    const description = item.desc 
    const imgUrl = item.image 
    const logoUrl = item.logo 

    const card = document.createElement('div')
    card.className = 'card'

   
    const text = document.createElement('div')
    text.className = 'text'

   
    if (logoUrl) {
      const logo = document.createElement('img')
      logo.className = 'logo'
      logo.src = logoUrl
      logo.alt = `${title} logo`
    text.appendChild(logo)
    }

    const h3 = document.createElement('h3')
    h3.className = 'heading'
    h3.textContent = title

    const h6 = document.createElement('h6')
    h6.className = 'subtext'
    h6.textContent = description

    text.appendChild(h3)
    text.appendChild(h6)

    
    const media = document.createElement('div')
    media.className = 'media'

    if (imgUrl){
      const img = document.createElement('img')
      img.src = imgUrl
      img.alt = title
      media.appendChild(img)
    }


    card.appendChild(text)
    card.appendChild(media)

    grid.appendChild(card)
  })


}

fetchData()
