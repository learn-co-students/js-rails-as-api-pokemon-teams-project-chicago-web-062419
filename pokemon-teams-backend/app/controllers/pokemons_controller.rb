class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end
    
    def show
        pokemon = Pokemon.find_by(params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def create
        
        trainer = Trainer.find_by(id: params[:trainer_id])
        if trainer.pokemon.length < 6
            pokemon = Pokemon.randomPokemon(params[:trainer_id])
            pokemon.save
        else 
            raise "Your party is full!"
            
        end
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
    end
end
