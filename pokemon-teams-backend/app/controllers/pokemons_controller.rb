class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: PokemonSerializer.new(pokemons)
  end

  def create
    @trainer = Trainer.find_by(id: params[:trainer_id])
    if @trainer.pokemons.length < 6
      newPokemon = Pokemon.randomPokemon(params[:trainer_id])
      if newPokemon.save
        render json: newPokemon
      end
    else
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.delete
  end
end
