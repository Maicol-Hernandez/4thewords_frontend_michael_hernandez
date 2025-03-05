export interface Legend {
  id: number,
  name: string,
  description: string,
  category: string,
  legend_date: string,
  province: string,
  canton: string,
  district: string,
  image_url: string,
  created_at: string,
  updated_at: string // ISO date string
}

export interface LegendFilters {
  name: string,
  category: string,
  province: string
  canton: string,
  district: string
  date: string // Format: "yyyy-MM-dd"
}
