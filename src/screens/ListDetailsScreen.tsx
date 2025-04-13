import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useShoppingListContext } from "../contexts/ShoppingListContext";
import { useAuth } from "../contexts/AuthContext";
import HeaderBar from "../components/HeaderBar";

export default function ListDetailsScreen() {
  const { lists, selectedListId, shareListWith, removeSharedEmail, items } =
    useShoppingListContext();
  const { userId } = useAuth();

  const [emailToShare, setEmailToShare] = useState("");

  const selectedList = lists.find((list) => list.id === selectedListId);

  if (!selectedList) {
    return (
      <View style={styles.centered}>
        <Text>Nenhuma lista selecionada.</Text>
      </View>
    );
  }

  const handleAddEmail = () => {
    if (!emailToShare.trim()) return;
    shareListWith(emailToShare);
    setEmailToShare("");
  };

  const handleRemoveEmail = (email: string) => {
    removeSharedEmail(email);
  };

  return (
    <View style={styles.container}>
      <HeaderBar label="Detalhes da Lista" />

      <Text style={styles.title}>
        Nome: <Text style={styles.bold}>{selectedList.name}</Text>
      </Text>
      <Text style={styles.detail}>Itens: {items.length}</Text>
      <Text style={styles.detail}>
        Criada em: {new Date(selectedList.createdAt).toLocaleString()}
      </Text>
      <Text style={styles.detail}>
        Atualizada em: {new Date(selectedList.updatedAt).toLocaleString()}
      </Text>

      <View style={{ marginTop: 24 }}>
        <Text style={styles.sectionTitle}>Compartilhada com:</Text>

        <FlatList
          data={selectedList.sharedWith || []}
          keyExtractor={(email) => email}
          renderItem={({ item }) => (
            <View style={styles.sharedItem}>
              <Text style={styles.sharedEmail}>{item}</Text>
              {userId === selectedList.ownerId && (
                <TouchableOpacity onPress={() => handleRemoveEmail(item)}>
                  <Text style={styles.removeText}>Remover</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum compartilhamento ainda.</Text>
          }
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={emailToShare}
            onChangeText={setEmailToShare}
            placeholder="Digite o email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleAddEmail}
          >
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sharedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e0f7fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  sharedEmail: {
    fontSize: 16,
  },
  removeText: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
  emptyText: {
    fontStyle: "italic",
    color: "#777",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: "#00796b",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
