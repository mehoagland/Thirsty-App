class DrinksController < ApplicationController

  # GET /api/drinks
  def index
    @drinks = Drink.all
    render json: @drinks
  end

  # GET /api/drink/:id
  def show
    @drink = Drink.find(params[:id])
    render json: @drink
  end
end
