export type Product = {
  _id: string,
  name: String,
  slug: string,
  brand: String,
  price: number,
  type: String,
  size: string[] | string;
  color: string[] | string;
  quantity: number
  };