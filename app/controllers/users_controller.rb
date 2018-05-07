class UsersController < ApiController
  before_action :require_login, except: [:create]

  def create
    user = User.create!(user_params)
    render json: { token: user.auth_token }
  end


    def profile
    user = User.find_by_auth_token!(request.headers[:token])
    user_favorites = user.favorites
    render json: {
      user: { username: user.username, email: user.email, name: user.name },
      favorites: user_favorites }

  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :email,  :name)
  end

end
