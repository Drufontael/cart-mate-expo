export type Item = {
  id: string;
  name: string;
  quantity?: number;
  price?: number;
  purchased?: boolean;
};

export type ShoppingList = {
  id: string;
  name: string;
  items: Item[];
};
