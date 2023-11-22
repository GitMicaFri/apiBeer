// Variabler som går till våra DOM-element
const buttons = document.querySelectorAll('button')
const imgElement = document.querySelector('img')
const beerName =  document.querySelector('h4')
const beerTag = document.querySelector('p')
const beerDescription = document.querySelector('.description')

// Variabler - API som vi ska hämta och vår placeholder för bilden
const api = 'https://api.punkapi.com/v2/beers/random';
const placeHolderPic = './placeholderbeer.png'

//Async function som tar upp en ny bärs från vår API
const renderNewBeer = async () => {
    try {
        const response = await fetch(api);
        const data = await response.json();

        //Kontrollerar om det finns data
        if (data && data.length) { 
            // Destructureing
            const { name, image_url, tagline, description } = data[0]

            //Skapa ett objekt med ölinfo
            const beerObject = {
                beerName: name,
                beerImage: image_url == null ? placeHolderPic: image_url,
                beerTag: tagline,
                beerDesc: description,
            };

            //Returnera ölobjektet
            return beerObject;

        } else {
            console.log('Ingen öl hittades')
        }
    } catch (error) {
        console.log('Det blev ett fel vid hämtning av öl:', error)
    }
}

buttons.forEach(btn => {
    btn.addEventListener('click', async () => {        
        if ( btn.id === 'new') {
            //Återställer värden som vi vill ha som grund
            beerDescription.classList.add('hidden')
            beerTag.classList.remove('hidden')
            document.querySelector('#info').textContent = 'More info'

            try {
                const newBeer = await renderNewBeer();

            //Uppdatera elementen med den nya ölinformationen
            imgElement.src = newBeer.beerImage
            beerName.textContent = newBeer.beerName
            beerTag.textContent = newBeer.beerTag
            beerDescription.textContent = newBeer.beerDesc

            } catch (error) {
                console.log('Fel vid hämtning av ny öl:', error)
            }
        } else if ( btn.id === 'info' ) {
            
            //Kontrollerar vad som händer om man klickar på infoknappen
            btn.textContent = btn.textContent === 'Less info' ? 'More info' : 'Less info' 
            document.querySelectorAll('p').forEach((pElement) => {
                pElement.classList.toggle('hidden')
            })
        }
    })
})