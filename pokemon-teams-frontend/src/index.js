const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//select main content
const mainContainer = document.querySelector("main")
//makes a trainer card
const createTrainerCard = (trainer)=>{
    let card = document.createElement("div")
    let h4 = document.createElement("h4")
    let pokeList = document.createElement("ul")
    let button = document.createElement("button")

    card.id = trainer.id
    card.className = "card"
    h4.innerText = trainer.name
    button.innerText = "Add Pokemon"
    button.id = "add-pokemon"
    button.addEventListener("click", ()=>{
        fetch('http://localhost:3000/pokemons',{
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body:JSON.stringify({
                "trainer_id": trainer.id
            })
        })
        .then(res => res.json())
        .then(pokemon => {
            if(pokeList.childElementCount < 6){ 
                let removeButton = document.createElement("button")
                removeButton.innerText = "Release"
                removeButton.className = "release"
                removeButton.addEventListener("click", event =>{releasePokemon(event, pokemon.id)})
                let li = document.createElement("li")
                
                li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
                li.appendChild(removeButton)
                pokeList.appendChild(li)
            }
        })
    })
    //create pokemon list
    let listOfPokemon = trainer.pokemon.map(pokemon => pokemon)
    listOfPokemon.forEach(pokemon => {
        let removeButton = document.createElement("button")
        removeButton.innerText = "Release"
        removeButton.className = "release"
    
        removeButton.addEventListener("click", event =>{releasePokemon(event, pokemon.id)})
        let li = document.createElement("li")
        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        li.appendChild(removeButton)
        pokeList.appendChild(li)
    })
    card.append(h4, button, pokeList)
    mainContainer.appendChild(card)
   
}

function releasePokemon(event, pokemon_id){
    fetch(POKEMONS_URL + "/" + pokemon_id, {
        method: "DELETE"
    }).then(resp => event.target.parentNode.remove())
}

fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => {
        trainers.forEach(trainer => {
            createTrainerCard(trainer)
        })
    })

