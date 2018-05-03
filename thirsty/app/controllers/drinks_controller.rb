class DrinksController < ApplicationController

  # GET /api/drinks
  before_action :require_login, except: [:index, :show]

  def index
    drinks = Drink.all
    render json: { drinks: drinks }
  end

  def show
    drink = Drink.find(params[:id])
    drink_user = drink.user
    render json: { drink: drink, username: drink_user.username }
  end

  def create
    drink = Drink.new(drink_params)
    drink.user = current_user

    if drink.save
      render json: {
        message: 'ok',
        drink: drink,
      }
    else
      render json: {message: 'Could not create drink'}
    end
  end

  private
  def drink_params
    params.require(:drink).permit(:name, :description)
  end
end
