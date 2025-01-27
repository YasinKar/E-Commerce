type Gender = 'Male' | 'Female';

export interface Comment {
  id: number;
  title: string;
  message: number;
  user: string
  replies: Comment[];
  recommend: boolean
  date: string
  likes: number
  dislikes: number
}

export interface Color {
  id: number;
  color_name: string;
  color_code: string;
}

export interface Size {
  id: number;
  size: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string | null;
  brand?: string | null;
  tags?: { id: number, tag: string }[];
  gender?: Gender | null;
  colors?: Color[];
  sizes?: Size[];
  slug: string;
  stars: number;
  inventory?: number;
  discounted_price?: number;
  information: { id: number, key: string, value: string }[]
  images: { id: number, image: string }[]
  comments: Comment[]
}