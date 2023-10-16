export interface ProductType {
  name: string;
  image: string;
  id: number;
  description: string;
  discount: number;
  price: number;
  editCategory: (id: number) => void;
  deleteCategory: (id: number) => void;
}


export interface ProductResponseType extends ProductType {
  createdAt: string;
}
