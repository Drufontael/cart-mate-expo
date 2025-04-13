import { getDatabase, ref, set, get, remove } from "firebase/database";
import { Item, ShoppingList } from "../../types/types";

// Salva ou atualiza uma lista
export const saveListToFirebase = async (
  userId: string,
  list: ShoppingList
) => {
  const db = getDatabase();
  const listRef = ref(db, `shoppingLists/${userId}/lists/${list.id}`);
  await set(listRef, list);
};

// Busca todas as listas que pertencem ao usuário ou foram compartilhadas com ele
export const getListsFromFirebase = async (
  userId: string,
  userEmail: string
): Promise<ShoppingList[]> => {
  const db = getDatabase();
  const snapshot = await get(ref(db, "shoppingLists"));
  if (!snapshot.exists()) return [];

  const allData = snapshot.val();
  const userLists: ShoppingList[] = [];

  for (const ownerId in allData) {
    const userListsObj = allData[ownerId]?.lists;
    if (!userListsObj) continue;

    for (const listId in userListsObj) {
      const list = userListsObj[listId];
      const isOwner = ownerId === userId;
      const isSharedWithUser = list.sharedWith?.includes(userEmail);
      if (isOwner || isSharedWithUser) {
        userLists.push({
          ...list,
          id: listId,
        });
      }
    }
  }

  return userLists;
};

// Atualiza apenas os itens de uma lista
export const updateItemsInList = async (
  userId: string,
  lists: ShoppingList[],
  selectedListId: string,
  newItems: Item[]
) => {
  const updatedLists = lists.map((list) =>
    list.id === selectedListId ? { ...list, items: newItems } : list
  );
  const updatedList = updatedLists.find((list) => list.id === selectedListId);
  if (updatedList) {
    await saveListToFirebase(userId, updatedList);
  }
  return updatedLists;
};

export const deleteListFromFirebase = async (
  ownerId: string,
  listId: string
) => {
  const db = getDatabase();
  const listRef = ref(db, `shoppingLists/${ownerId}/lists/${listId}`);
  await remove(listRef);
};
