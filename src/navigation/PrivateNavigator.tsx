import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import MyListsScreen from "../screens/MyListsScreen";
import LogoutScreen from "../screens/LogoutScreen";
import { DrawerParamList } from "./types";

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function PrivateNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="ShoppingList"
        component={ShoppingListScreen}
        options={{ title: "Lista de Compras" }}
      />
      <Drawer.Screen
        name="MyLists"
        component={MyListsScreen}
        options={{ title: "Minhas Listas" }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{ title: "Sair" }}
      />
    </Drawer.Navigator>
  );
}
