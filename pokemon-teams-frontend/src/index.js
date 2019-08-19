const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')

///////// FETCH DATA /////////////

const fetchData = (URL) => {
    fetch(URL)
        .then(res => res.json())
        .then(trainers => {
            trainers.forEach(trainer => {
            renderTrainer(trainer)
        })
    })
}

fetchData(TRAINERS_URL)





////////////RENDER TRAINER NAME////////////

const renderTrainer = (trainer) => {
    ////////////// CREATE CARD /////////////
    const cardContainer = document.createElement('div')
    cardContainer.className = 'card'

    ////////////// RENDER TRAINER NAME ////////
    const h2 = document.createElement('h2')
    h2.innerText = trainer.name

    ////////////// ATTACH NAME TO THE CARD////////

    cardContainer.appendChild(h2)
    main.appendChild(cardContainer)

    /////////// CREATE POKEMON LIST ///////////

    const ul = document.createElement('ul')

    trainer.pokemons.forEach(pokemon => {
        const li = document.createElement('li')
        const button = document.createElement('button')
        button.className = "release"
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        button.innerText = "Release"
            button.addEventListener("click", event => {
                deletePokemon(event, pokemon)
            })
        li.appendChild(button)
        ul.appendChild(li)
        cardContainer.appendChild(ul)
    })

}

///////////////// DELETE POKEMON///////////////
const deletePokemon = (event, pokemon) => {
    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
        method: "DELETE"
    })
    .then(event.target.parentNode.remove())
}

//////////// CREATE POKEMON ///////////////



// Note to self = if it doesnt auto destroy, then declare the event explicity