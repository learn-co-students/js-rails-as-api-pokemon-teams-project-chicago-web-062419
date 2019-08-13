const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let mainContainer = document.querySelector("main")

const getTrainers = () => {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => createCards(trainers))
}

const createCards = (trainers) => {
    trainers.forEach(trainer => {
        let trainerCard = document.createElement("div")
        trainerCard.className = "card"
        let teamCaptain = document.createElement("h2")
        teamCaptain.innerHTML = trainer.name
        let addButton = document.createElement("button")
        addButton.innerText = "Add Pokemon"
        addButton.addEventListener("click", () => addPokemon(event, trainer))
        trainerCard.append(teamCaptain, addButton, createPokemonList(trainer))
        mainContainer.appendChild(trainerCard)
    })
}

const addPokemon = (event, trainer) => {
    fetch("http://localhost:3000/pokemons", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            "trainer_id": trainer.id
        })
    })
    .then(res => res.json())
    .then(pokemon => {
        console.log(pokemon)
        let trainerCard = event.target.parentNode
        let pokeList = trainerCard.querySelector('ul')
        pokeList.appendChild(buildPokeLine(pokemon))
    })
}

const removePokemon = (event, pokemon_id) => {
    fetch(`http://localhost:3000/pokemons/${pokemon_id}`, {
        method: "DELETE"
    }).then(event.target.parentNode.remove())
}

const createPokemonList = (trainer) => {
    pokeList = document.createElement("ul")
    trainer.pokemons.forEach(pokemon => {
        pokeList.appendChild(buildPokeLine(pokemon))
    })
    return pokeList
}

const buildPokeLine = (pokemon) => {
    pokeLine = document.createElement("li")
    pokeLine.innerText = pokemon.nickname + "(" + pokemon.species + ")"
    let removeButton = document.createElement("button")
    removeButton.className = "release"
    removeButton.innerText = "Release"
    removeButton.addEventListener("click", () => removePokemon(event, pokemon.id))
    pokeLine.appendChild(removeButton)
    return pokeLine
}





getTrainers()