import { useState, useEffect } from "react";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { Item, ShoppingList } from "../../types/types";
import {
  getListsFromFirebase,
  saveListToFirebase,
  deleteListFromFirebase,
} from "../services/firebaseService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../contexts/AuthContext";

export const useShoppingList = () => {
  const LIST_ID = "@listId";
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [selectedListId, setSelectedListId] = useState("1");
  const [items, setItems] = useState<Item[]>([]);
  const [newId, setNewId] = useState(nanoid());
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [newItem, setNewItem] = useState<Item>({ id: "", name: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newListName, setNewListName] = useState("");
  const { userId, email } = useAuth();

  const sortItemsByName = (items: Item[]) =>
    [...items].sort((a, b) =>
      a.name.localeCompare(b.name, "pt", { sensitivity: "base" })
    );

  useEffect(() => {
    const fetchLists = async () => {
      if (!userId) return;

      const firebaseLists = await getListsFromFirebase(userId, email);

      if (firebaseLists.length === 0) {
        const timestamp = new Date().toISOString();
        const defaultList: ShoppingList = {
          id: nanoid(),
          ownerId: userId,
          name: "Lista Padrão",
          items: [],
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        await saveListToFirebase(userId, defaultList);
        setLists([defaultList]);
        setSelectedListId(defaultList.id);
        setItems([]);
        await AsyncStorage.setItem(LIST_ID, defaultList.id);
        return;
      }

      setLists(firebaseLists);

      const storedId = await AsyncStorage.getItem(LIST_ID);
      const updatedSelected = firebaseLists.find(
        (list) => list.id === (storedId || selectedListId)
      );
      if (updatedSelected) {
        setSelectedListId(updatedSelected.id);
        setItems(sortItemsByName(updatedSelected.items));
      }
    };

    fetchLists();
  }, [userId, selectedListId]);

  useEffect(() => {
    saveItemsToStorage(items);
  }, [items]);

  useEffect(() => {
    const fetchSelectedListId = async () => {
      const id = await AsyncStorage.getItem(LIST_ID);
      if (id) setSelectedListId(id);
    };
    fetchSelectedListId();
  }, []);

  useEffect(() => {
    const saveSelectedListId = async () => {
      await AsyncStorage.setItem(LIST_ID, selectedListId);
    };
    saveSelectedListId();
  }, [selectedListId]);

  const saveItemsToStorage = async (data: Item[]) => {
    if (!userId) return;
    const timestamp = new Date().toISOString();
    const updatedLists = lists.map((list) =>
      list.id === selectedListId
        ? { ...list, items: data, updatedAt: timestamp }
        : list
    );
    setLists(updatedLists);
    await saveListToFirebase(
      userId,
      updatedLists.find((list) => list.id === selectedListId)!
    );
  };

  const createList = async () => {
    if (!newListName.trim()) return;

    const timestamp = new Date().toISOString();

    const newList: ShoppingList = {
      id: nanoid(),
      ownerId: userId,
      name: newListName,
      items: [],
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setLists((prev) => [...prev, newList]);
    setNewListName("");
    setSelectedListId(newList.id);
    setItems([]);

    await saveListToFirebase(userId, newList);
  };

  const deleteList = async (id: string) => {
    const ownerId = lists.find((list) => list.id === id)?.ownerId;
    if (!ownerId) return;
    await deleteListFromFirebase(ownerId, id);
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
    if (id === selectedListId && updatedLists.length > 0) {
      setSelectedListId(updatedLists[0].id);
      setItems(sortItemsByName(updatedLists[0].items));
    } else if (updatedLists.length === 0) {
      setSelectedListId("");
      setItems([]);
    }
  };

  const shareListWith = async (email: string) => {
    if (!userId || !email.trim()) return;

    const targetList = lists.find((list) => list.id === selectedListId);
    if (!targetList) return;

    const updatedList: ShoppingList = {
      ...targetList,
      sharedWith: [
        ...(targetList.sharedWith || []),
        email.trim().toLowerCase(),
      ],
      updatedAt: new Date().toISOString(),
    };

    const updatedLists = lists.map((list) =>
      list.id === selectedListId ? updatedList : list
    );

    setLists(updatedLists);
    await saveListToFirebase(userId, updatedList);
  };

  const addOrUpdateItem = () => {
    const nameTrimmed = newItem.name.trim();
    if (!nameTrimmed) return;

    const quantityParsed = parseInt(quantityInput) || 1;
    const priceParsed = parseFloat(priceInput.replace(",", "."));
    const idParsed = editingItemId ? editingItemId : newId;

    const itemToAdd: Item = {
      id: idParsed,
      name: nameTrimmed,
      quantity: quantityParsed,
      price: isNaN(priceParsed) ? 0 : priceParsed,
      purchased: false,
    };

    if (editingItemId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItemId ? { ...item, ...itemToAdd } : item
        )
      );
    } else {
      setItems((prev) => sortItemsByName([...prev, itemToAdd]));
      setNewId(nanoid());
    }

    setEditingItemId(null);
    setNewItem({ id: "", name: "" });
    setPriceInput("");
    setQuantityInput("");
  };

  const togglePurchased = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const startEdit = (item: Item) => {
    setEditingItemId(item.id);
    setNewItem({ id: item.id, name: item.name });
    setPriceInput(item.price?.toString() ?? "");
    setQuantityInput(item.quantity?.toString() ?? "");
  };

  const total = items.reduce((acc, item) => {
    const itemTotal = item.purchased
      ? (item.price || 0) * (item.quantity || 1)
      : 0;
    return acc + itemTotal;
  }, 0);

  const estimatedTotal = items.reduce((acc, item) => {
    const itemTotal = (item.price || 0) * (item.quantity || 1);
    return acc + itemTotal;
  }, 0);

  return {
    lists,
    setLists,
    selectedListId,
    setSelectedListId,
    items,
    setItems,
    newItem,
    setNewItem,
    quantityInput,
    setQuantityInput,
    priceInput,
    setPriceInput,
    editingItemId,
    addOrUpdateItem,
    removeItem,
    togglePurchased,
    startEdit,
    total,
    estimatedTotal,
    sortItemsByName,
    setEditingItemId,
    saveItemsToStorage,
    newId,
    setNewId,
    deleteList,
    isModalVisible,
    setIsModalVisible,
    newListName,
    setNewListName,
    createList,
  };
};
