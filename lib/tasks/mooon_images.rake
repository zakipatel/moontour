require 'csv'

namespace :populate do
  desc "Populate moon images"
  task :moon_images => :environment do
    CSV.foreach('./app/assets/csvs/moon_9.csv', headers: true, :header_converters => :symbol) do |csv_obj|
     if csv_obj[:kml_link] && csv_obj[:kml_link].present?
      puts "#{csv_obj[:image_id]}"
      MoonImage.create(:taken_at => csv_obj[:taken_utc],
                       :kml_link => csv_obj[:kml_link],
                       :center_lng => csv_obj[:center_lng],
                       :center_lat => csv_obj[:center_lat],
                       :nadir_lng => csv_obj[:nadir_lng],
                       :nadir_lat => csv_obj[:nadir_lat],
                       :corner1_lng => csv_obj[:corner1_lng],
                       :corner1_lat => csv_obj[:corner1_lat],
                       :corner2_lng => csv_obj[:corner2_lng],
                       :corner2_lat => csv_obj[:corner2_lat],
                       :corner3_lng => csv_obj[:corner3_lng],
                       :corner3_lat => csv_obj[:corner3_lat],
                       :corner4_lng => csv_obj[:corner4_lng],
                       :corner4_lat => csv_obj[:corner4_lat],
                       :altitude => csv_obj[:altitude],
                       :lens_size => csv_obj[:lens_size],
                       :frame_width => csv_obj[:frame_width],
                       :frame_height => csv_obj[:frame_height],
                       :mission_name => csv_obj[:mission_name],
                       :spacecraft => csv_obj[:spacecraft],
                       :camera_dir => csv_obj[:camera_dir],
                       :orbit_num => csv_obj[:orbit_num],
                       :image_link => csv_obj[:image_link])
     end
    end
  end
end
