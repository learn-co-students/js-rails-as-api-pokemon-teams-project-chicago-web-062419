class TrainersController < ApplicationController
    def index
        trainers = Trainer.all 
        options = {
            :include => {
            :pokemon => { only: [:id, :nickname, :species, :trainer_id]}
            }, :except => [:created_at, :updated_at]
        }
        render json: trainers.to_json(options)
    end

    def show
        trainer = Trainer.find(params[:id])
        options = {
            :include => {
            :pokemon => { only: [:id, :nickname, :species, :trainer_id]}
            }, :except => [:created_at, :updated_at]
        }
        render json: trainer.to_json(options)
    end
end
