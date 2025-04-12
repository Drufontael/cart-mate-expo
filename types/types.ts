export type Item = {
  id: string;
  name: string;
  quantity?: number;
  price?: number;
  purchased?: boolean;
};

export interface ShoppingList {
  id: string;
  ownerId: string;
  name: string;
  items: Item[];
  createdAt: string;
  updatedAt: string;
  sharedWith?: string[];
}
