class TrainersController < ApplicationController

    def index 
       trainers = Trainer.all 
       render json: trainers, include: :pokemons
    end

    # def show 
    #     trainer = Trainer.find(params[:id])
    #     render json: trainer.to_json(:include => {
    #         :pokemons => {:only => [:id, :species, :nickname, :trainer_id]
    #         }
    #     }, :except => [:created_at, :updated_at])
    # end

end
