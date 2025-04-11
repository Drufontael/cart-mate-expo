import { getDatabase, ref, set, get, remove } from "firebase/database";
import { Item, ShoppingList } from "../../types/types";

export const saveListToFirebase = async (id: any, list: ShoppingList) => {
  const db = getDatabase();
  const listRef = ref(db, `${id}/lists/${list.id}`);
  await set(listRef, list);
};

export const getListsFromFirebase = async (
  id: any
): Promise<ShoppingList[]> => {
  const db = getDatabase();
  const snapshot = await get(ref(db, `${id}/lists`));
  const data = snapshot.val();
  return data ? Object.values(data) : [];
};

export const updateItemsInList = async (
  id: any,
  lists: ShoppingList[],
  selectedListId: string,
  newItems: Item[]
) => {
  const updatedLists = lists.map((list) =>
    list.id === selectedListId ? { ...list, items: newItems } : list
  );
  await saveListToFirebase(
    id,
    updatedLists.find((list) => list.id === selectedListId)!
  );
  return updatedLists;
};

export const deleteListFromFirebase = async (id: any, listId: string) => {
  const db = getDatabase();
  const listRef = ref(db, `${id}/lists/${listId}`);
  await remove(listRef);
};
