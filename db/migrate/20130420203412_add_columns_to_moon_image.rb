class AddColumnsToMoonImage < ActiveRecord::Migration
  def change
    add_column :moon_images, :taken_at, :datetime
    add_column :moon_images, :kml_link, :string
  end
end
