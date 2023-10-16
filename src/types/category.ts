export interface CategoryType {
  id: number;
  name: string;
  image: string;
  editCategory: (id: number) => void;
  deleteCategory: (id: number) => void;
}

export interface CategoryResponseType extends CategoryType {
  createdAt: string;
}
