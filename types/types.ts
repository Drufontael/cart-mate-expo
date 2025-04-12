export type Item = {
  id: string;
  name: string;
  quantity?: number;
  price?: number;
  purchased?: boolean;
};

export type SharedWith = {
  [userId: string]: true;
};

export interface ShoppingList {
  id: string;
  name: string;
  items: Item[];
  createdAt: string;
  updatedAt: string;
  sharedWith?: SharedWith;
}
