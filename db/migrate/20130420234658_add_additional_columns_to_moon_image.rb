class AddAdditionalColumnsToMoonImage < ActiveRecord::Migration
  def change
    add_column :moon_images, :center_lng, :float
    add_column :moon_images, :center_lat, :float
    add_column :moon_images, :nadir_lng, :float
    add_column :moon_images, :nadir_lat, :float
    add_column :moon_images, :corner1_lng, :float
    add_column :moon_images, :corner1_lat, :float
    add_column :moon_images, :corner2_lng, :float
    add_column :moon_images, :corner2_lat, :float
    add_column :moon_images, :corner3_lng, :float
    add_column :moon_images, :corner3_lat, :float
    add_column :moon_images, :corner4_lng, :float
    add_column :moon_images, :corner4_lat, :float
    add_column :moon_images, :altitude, :float
    add_column :moon_images, :lens_size, :integer
    add_column :moon_images, :frame_width, :float
    add_column :moon_images, :frame_height, :float
    add_column :moon_images, :mission_name, :string
    add_column :moon_images, :spacecraft, :string
    add_column :moon_images, :camera_dir, :string
    add_column :moon_images, :orbit_num, :integer
    add_column :moon_images, :image_link, :string
  end
end
