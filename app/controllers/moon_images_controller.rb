class MoonImagesController < ApplicationController
  def query_on_time
    start_time = Time.at(params[:from].to_i) 
    end_time = Time.at(params[:from].to_i + 3600)
    moon_images = MoonImage.taken_between(start_time, end_time)
    kml_links = moon_images.collect(&:kml_link)

    respond_to do |format|
      format.json { render :json => kml_links.to_json }
    end
  end

  def query_on_coords
    lat = params[:lat]
    lon = params[:lon]

    moon_images = MoonImage.for_lat_lon(lat.to_f, lon.to_f, 3.5)
    debugger
    kml_links = moon_images.collect(&:kml_link)

    respond_to do |format|
      format.json { render :json => kml_links.to_json }
    end
  end
end
