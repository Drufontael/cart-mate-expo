import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useShoppingList } from "../hooks/useShoppingList";
import HeaderBar from "../components/HeaderBar";

export default function ListDetailsScreen() {
  const { lists, selectedListId, shareListWith, removeSharedEmail, items } =
    useShoppingList();

  const [emailToShare, setEmailToShare] = useState("");

  const selectedList = lists.find((list) => list.id === selectedListId);

  if (!selectedList) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
    <View style={{ flex: 1, padding: 20 }}>
      <HeaderBar label="Detalhes da Lista" />

      <Text style={{ fontSize: 16, marginBottom: 8 }}>
        Nome: {selectedList.name}
      </Text>
      <Text>Itens: {items.length}</Text>
      <Text>
        Criada em: {new Date(selectedList.createdAt).toLocaleString()}
      </Text>
      <Text>
        Atualizada em: {new Date(selectedList.updatedAt).toLocaleString()}
      </Text>

      <View style={{ marginTop: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
          Compartilhada com:
        </Text>

        <FlatList
          data={selectedList.sharedWith || []}
          keyExtractor={(email) => email}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 4,
              }}
            >
              <Text>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveEmail(item)}>
                <Text style={{ color: "red" }}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ fontStyle: "italic" }}>
              Nenhum compartilhamento ainda.
            </Text>
          }
        />

        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <TextInput
            value={emailToShare}
            onChangeText={setEmailToShare}
            placeholder="Digite o email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              flex: 1,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              padding: 8,
              marginRight: 8,
            }}
          />
          <TouchableOpacity
            onPress={handleAddEmail}
            style={{
              backgroundColor: "#007AFF",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white" }}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
