import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";

export default function LogoutScreen() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  useEffect(() => {
    logout().then(() => {
      navigation.goBack; // ou até: navigation.goBack()
    });
  }, []);

  return null;
}
