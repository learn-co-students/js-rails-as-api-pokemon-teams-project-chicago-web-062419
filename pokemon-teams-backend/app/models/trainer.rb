class Trainer < ApplicationRecord
    NUMBER_OF_PERMITTED_POKEMON = 6
    has_many :pokemon, before_add: :validate_pokemon_limit

    private

    def validate_pokemon_limit(pokemon)
      raise Exception.new if pokemon.size >= NUMBER_OF_PERMITTED_POKEMON
    end
end
