class AddIndextoTakenAt < ActiveRecord::Migration
  def change
    add_index :moon_images, :taken_at
  end
end
