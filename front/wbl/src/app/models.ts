export interface Category{
  id: number;
  name: string;
  description: string;
  img: string;
}

export interface  Bus{
  id: number;
  category: number;
  name: string;
  description: string;
  price: number;
  img: string;
  user: null;
}

export interface Token{
  access: string;
  refresh: string;
}

