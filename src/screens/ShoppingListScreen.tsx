import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Item } from "../../types/types";
import { useShoppingListContext } from "../contexts/ShoppingListContext";
import HeaderBar from "../components/HeaderBar";

export default function ShoppingListScreen() {
  const {
    lists,
    selectedListId,
    items,
    newItem,
    setNewItem,
    priceInput,
    setPriceInput,
    quantityInput,
    setQuantityInput,
    newId,
    editingItemId,
    addOrUpdateItem,
    removeItem,
    togglePurchased,
    startEdit,
    total,
    estimatedTotal,
  } = useShoppingListContext();

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => togglePurchased(item.id)}
        onLongPress={() => startEdit(item)}
        style={{ flex: 1 }}
      >
        <Text
          style={[
            styles.itemText,
            item.purchased && {
              textDecorationLine: "line-through",
              color: "#888",
            },
          ]}
        >
          {item.name}
        </Text>
        <Text style={styles.subItemText}>
          Quantidade: {item.quantity} | Preço: R$ {item.price?.toFixed(2)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Text style={{ fontSize: 22 }}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderBar
        label={lists.find((l) => l.id === selectedListId)?.name ?? "Nenhuma"}
      />

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <TextInput
        placeholder="Digite um item..."
        value={newItem.name}
        onChangeText={(name) => {
          setNewItem({ id: newId + "", name: name });
        }}
        style={styles.input}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Quantidade"
          value={quantityInput}
          onChangeText={(text) => {
            const onlyValidChars = text
              .replace(/[^0-9.,]/g, "")
              .replace(",", ".");
            setQuantityInput(onlyValidChars);
          }}
          keyboardType="numeric"
          style={[styles.input, { flex: 1 }]}
        />

        <TextInput
          placeholder="Preço (R$)"
          value={priceInput}
          onChangeText={(text) => {
            const onlyValidChars = text
              .replace(/[^0-9.,]/g, "")
              .replace(",", ".");
            setPriceInput(onlyValidChars);
          }}
          keyboardType="decimal-pad"
          style={[styles.input, { flex: 1 }]}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={addOrUpdateItem}
      >
        <Text style={styles.buttonText}>
          {editingItemId ? "Atualizar" : "Adicionar"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.totalText}>
        Total / Estimado: R$ {total.toFixed(2)} / R$ {estimatedTotal.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  item: {
    backgroundColor: "#e0f7fa",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subItemText: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    backgroundColor: "#00796b",
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    padding: 12,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});
