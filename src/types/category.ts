export interface CategoryType {
  id: string;
  name: string;
  image: string;
}

export interface CategoryResponseType extends CategoryType {
  createdAt: string;
}
