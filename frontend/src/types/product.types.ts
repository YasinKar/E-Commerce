type Gender = 'Male' | 'Female';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string | null;
  brand?: string | null;
  tags?: string[];
  gender?: Gender | null;
  colors?: string[];
  sizes?: string[];
  slug: string;
  stars: number;
  inventory?: number;
  discounted_price?: number;
}