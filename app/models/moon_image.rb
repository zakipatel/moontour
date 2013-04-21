class MoonImage < ActiveRecord::Base
  attr_protected
  scope :taken_between, lambda {|start_time, end_time| where('taken_at > ? AND taken_at < ?',start_time,end_time) }
  scope :for_lat_lon, lambda {|lat, lon, range| where('center_lat BETWEEN ? AND ?',lat-range, lat+range).
                                                    where('center_lng BETWEEN ? AND ?',lon-range, lon+range)}
end
