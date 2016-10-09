# frozen_string_literal: true
class OrderingHelper

	def initialize(equipment_model)
		@equipment_model = equipment_model
		@category_id = @equipment_model.category_id
		@category_count = EquipmentModel.where(category_id: @category_id, deleted_at: nil).count
		@ordering = @equipment_model.ordering
	end

	def assign_order
		@equipment_model.update_attribute('ordering', @category_count + 1)
		#@equipment_model.save()
		#return { result: nil, error: error } if error
		#reservation_transaction
		self
	end
	def up
    	unless @ordering <= 1
    		target = EquipmentModel.where(category_id: @category_id,
	                                      ordering: @ordering - 1,
	                                      deleted_at: nil).first
    		@equipment_model.update_attribute('ordering', @ordering - 1)
    		@equipment_model.save
	        target.update_attribute('ordering', @ordering)
	        target.save
	    end
	    self
    end
    def down
    	unless @ordering >= @category_count
    		target = EquipmentModel.where(category_id: @category_id,
	                                      ordering: @ordering + 1,
	                                      deleted_at: nil).first
    		@equipment_model.update_attribute('ordering', @ordering + 1)
    		@equipment_model.save
	        target.update_attribute('ordering', @ordering)
	        target.save
	    end
	    self
    end
    def verify_order
	    ms = EquipmentModel.where(category_id: @category_id, deleted_at: nil)
	    ords = ms.map(&:ordering).sort
	   # binding.pry
	    return unless ords != (1..ords.length).to_a
	    deleted = EquipmentModel.where(category_id: @category_id)
	                            .where('deleted_at IS NOT NULL')
	    deleted.each do |d_model|
	      d_model.update_attribute('ordering', -1)
	      d_model.save
	    end
	    duplicates = ords.find_all { |e| ords.rindex(e) != ords.index(e) }
	    out_of_bounds = ords.find_all { |e| e > @category_count or e < 1}
	    duplicates.uniq.each do |dup|
	      duplicates.delete_at(duplicates.index(dup))
	    end
	    missing = (1..ords.length).to_a - ords
	    (duplicates + out_of_bounds).each do |dup|
	      model = EquipmentModel.where(category_id: @category_id, ordering: dup).first
	      model.update_attribute('ordering', missing.shift)
	      model.save
	    end
	    self
	end
	def deactivate_order
    	ms = EquipmentModel.where(category_id: @category_id)
                           .where('ordering > ?', @ordering)
     	ms.each do |m|
        	m.update_attribute('ordering', m.ordering - 1)
    	end
    	@equipment_model.update_attribute('ordering', -1)
    	self
	end
end