import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { useShoppingListContext } from "../contexts/ShoppingListContext";

import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../navigation/types";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import HeaderBar from "../components/HeaderBar";

export default function MyListsScreen() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const {
    lists,
    setSelectedListId,
    setItems,
    sortItemsByName,
    deleteList,
    newListName,
    setNewListName,
    createList,
  } = useShoppingListContext();

  const handleSelectList = (listId: string) => {
    setSelectedListId(listId);
    const selectedList = lists.find((l) => l.id === listId);
    if (selectedList) {
      setItems(sortItemsByName(selectedList?.items ?? []));
    }
    navigation.jumpTo("ShoppingList");
  };

  const handleOpenDetails = (listId: string) => {
    const selectedList = lists.find((l) => l.id === listId);
    if (selectedList) {
      //navigation.navigate("ListDetails", { list: selectedList });
    }
  };

  const handleDelete = (listId: string) => {
    Alert.alert("Excluir lista", "Tem certeza que deseja excluir esta lista?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => deleteList(listId),
      },
    ]);
  };

  const handleCreateList = () => {
    if (newListName.trim() !== "") {
      createList();
      navigation.navigate("ShoppingList");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar label="Minhas Listas" />
      <FlatList
        data={lists}
        keyExtractor={(list) => list.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => handleSelectList(item.id)}
            >
              <Text style={styles.listName}>{item.name}</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => handleOpenDetails(item.id)}
                style={{ marginRight: 30 }}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color="#00796b"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={22} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.newListContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova Lista..."
          placeholderTextColor="#999"
          value={newListName}
          onChangeText={setNewListName}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleCreateList}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e0f2f1",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  listName: {
    fontSize: 18,
    color: "#004d40",
  },
  deleteButton: {
    fontSize: 20,
  },
  selectButton: {
    flex: 1,
  },
  newListContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#00796b",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
