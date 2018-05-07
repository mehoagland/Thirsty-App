class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.string :drink_id
      t.string :name
      t.string :url
      t.belongs_to :user
      t.timestamps
    end
  end
end
