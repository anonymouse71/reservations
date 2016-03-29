class AddOrdering < ActiveRecord::Migration
  def change
  	add_column :equipment_models, :ordering, :integer
  end
end
