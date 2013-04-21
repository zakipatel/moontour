# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130420234658) do

  create_table "moon_images", :force => true do |t|
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.datetime "taken_at"
    t.string   "kml_link"
    t.float    "center_lng"
    t.float    "center_lat"
    t.float    "nadir_lng"
    t.float    "nadir_lat"
    t.float    "corner1_lng"
    t.float    "corner1_lat"
    t.float    "corner2_lng"
    t.float    "corner2_lat"
    t.float    "corner3_lng"
    t.float    "corner3_lat"
    t.float    "corner4_lng"
    t.float    "corner4_lat"
    t.float    "altitude"
    t.integer  "lens_size"
    t.float    "frame_width"
    t.float    "frame_height"
    t.string   "mission_name"
    t.string   "spacecraft"
    t.string   "camera_dir"
    t.integer  "orbit_num"
    t.string   "image_link"
  end

  add_index "moon_images", ["taken_at"], :name => "index_moon_images_on_taken_at"

end
