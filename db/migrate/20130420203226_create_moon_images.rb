class CreateMoonImages < ActiveRecord::Migration
  def change
    create_table :moon_images do |t|

      t.timestamps
    end
  end
end
