class TrainersController < ApplicationController
  def index
    trainers = Trainer.all

    options = {
      :include => {
        :pokemons => { only: [:id, :species, :nickname, :trainer_id] },
      }, :except => [:created_at, :updated_at],
    }
    render json: trainers.to_json(options)
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    options = {
      :include => {
        :pokemons => { only: [:id, :species, :nickname, :trainer_id] },
      }, :except => [:created_at, :updated_at],
    }
    render json: trainer.to_json(options)
  end
end
