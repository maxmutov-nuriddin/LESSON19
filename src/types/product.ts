export interface ProductType {
  id: string;
  name: string;
  image: string;
  description: string;
  discount: number;
  price: string;
}

export interface ProductResponseType extends ProductType {
  createdAt: string;
}
