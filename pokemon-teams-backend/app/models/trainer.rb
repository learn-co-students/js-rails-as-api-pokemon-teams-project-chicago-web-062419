class Trainer < ApplicationRecord
  has_many :pokemons, before_add: :validate_pokemons_limit

  private

  def validate_pokemons_limit(pokemons)
    raise Exception.new if pokemons.size >= 6
  end
end
