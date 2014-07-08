Spree::OptionValue.class_eval do

  has_attached_file :image,
                    styles: { mini: '48x48>', small: '100x100>', product: '240x240>', large: '600x600>' },
                    default_style: :product,
                    url: '/spree/option_values/:id/:style/:basename.:extension',
                    path: ':rails_root/public/spree/option_values/:id/:style/:basename.:extension',
                    convert_options: { all: '-strip -auto-orient -colorspace sRGB' }

  def has_image?
    image_file_name && !image_file_name.empty?
  end

  default_scope { order("#{quoted_table_name}.position") }
  scope :for_product, lambda { |product| select("DISTINCT #{table_name}.*").where("spree_option_values_variants.variant_id IN (?)", product.variant_ids).joins(:variants) }
end
