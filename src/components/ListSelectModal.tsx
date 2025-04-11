import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { ShoppingList } from "../../types/types";

interface ListSelectModalProps {
  visible: boolean;
  lists: ShoppingList[];
  selectedListId: string | null;
  onSelectList: (listId: string) => void;
  onCreateList: (listName: string) => void;
  onDeleteList: (listId: string) => void;
  onClose: () => void;
}

export default function ListSelectModal({
  visible,
  lists,
  selectedListId,
  onSelectList,
  onCreateList,
  onDeleteList,
  onClose,
}: ListSelectModalProps) {
  const [newListName, setNewListName] = useState("");

  const handleCreateList = () => {
    if (newListName.trim() === "") {
      Alert.alert("Por favor, insira um nome para a lista.");
      return;
    }
    onCreateList(newListName.trim());
    setNewListName("");
  };

  const handleDeleteList = (listId: string) => {
    Alert.alert(
      "Apagar lista",
      "Você tem certeza que deseja apagar esta lista?",
      [
        { text: "Cancela", style: "cancel" },
        { text: "OK", onPress: () => onDeleteList(listId) },
      ],
      { cancelable: false }
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Selecione uma Lista</Text>
          <FlatList
            data={lists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.listItem,
                  selectedListId === item.id && styles.selectedItem,
                ]}
                onPress={() => onSelectList(item.id)}
                onLongPress={() => handleDeleteList(item.id)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          <TextInput
            style={styles.input}
            placeholder="Novo nome da lista"
            value={newListName}
            onChangeText={setNewListName}
            onSubmitEditing={handleCreateList}
          />
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateList}
          >
            <Text style={styles.createButtonText}>Criar Lista</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  selectedItem: {
    backgroundColor: "#e0f7fa",
  },
  listText: {
    fontSize: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 15,
    padding: 10,
    borderRadius: 6,
  },
  createButton: {
    backgroundColor: "#4caf50",
    marginTop: 10,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#333",
  },
});
