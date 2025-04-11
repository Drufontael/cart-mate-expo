import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

interface Props {
  label?: string;
}

export default function HeaderBar({ label }: Props) {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <View style={styles.label}>
        <Text style={styles.title}>CartMate</Text>
        <Text style={{ fontSize: 18, color: "#00796b" }}>{label}</Text>
      </View>
      <View style={{ width: 30 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  menuIcon: {
    fontSize: 28,
    color: "#00796b",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00796b",
  },
  label: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
