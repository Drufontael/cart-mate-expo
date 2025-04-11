import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AppRoutes from "./AppRoutes";
import { useAuth } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { userId, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userId ? (
        <Stack.Screen name="AppRoutes" component={AppRoutes} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
