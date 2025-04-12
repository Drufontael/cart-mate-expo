import { getDatabase, ref, set, get, remove } from "firebase/database";
import { Item, ShoppingList } from "../../types/types";

export const saveListToFirebase = async (id: any, list: ShoppingList) => {
  const db = getDatabase();
  const listRef = ref(db, `shoppingLists/${list.ownerId}/lists/${list.id}`);
  await set(listRef, list);
};

export const getListsFromFirebase = async (
  userId: string,
  userEmail: string
): Promise<ShoppingList[]> => {
  const db = getDatabase();
  const snapshot = await get(ref(db, "shoppingLists"));
  if (!snapshot.exists()) return [];
  const allData = snapshot.val();
  const userList: ShoppingList[] = [];
  for (const ownerId in allData) {
    const lists = allData[ownerId];
    for (const listId in lists) {
      const list = lists[listId];
      const isOwner = ownerId === userId;
      const isSharedWithUser = list.sharedWith?.includes(userEmail);
      if (isOwner || isSharedWithUser) {
        userList.push(list);
      }
    }
  }
  return userList;
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

export const deleteListFromFirebase = async (ownerId: any, listId: string) => {
  const db = getDatabase();
  const listRef = ref(db, `shoppingLists/${ownerId}/lists/${listId}`);
  await remove(listRef);
};
