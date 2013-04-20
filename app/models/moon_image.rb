class MoonImage < ActiveRecord::Base
  attr_accessible :kml_link, :taken_at
  scope :taken_between, lambda {|start_time, end_time| where('taken_at > ? AND taken_at < ?',start_time,end_time) }
end
