import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUser = () => {
  const USER_ID = "@userId";
  const USER_EMAIL = "@userEmail";
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const id = await AsyncStorage.getItem(USER_ID);
      const email = await AsyncStorage.getItem(USER_EMAIL);
      if (email) setEmail(email);
      if (id) setUserId(id);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogin = async (navigation: any) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const uid = userCredential.user.uid;
      setUserId(uid);
      await AsyncStorage.setItem(USER_ID, uid);
      await AsyncStorage.setItem(USER_EMAIL, email.trim());
      navigation.replace("AppRoutes");
    } catch (error: any) {
      console.error("Login error:", error.message);
      Alert.alert("Erro ao fazer login", error.message);
    }
  };

  const handleRegister = async (navigation: any) => {
    if (!displayName || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await updateProfile(userCredential.user, {
        displayName: displayName.trim(),
      });

      Alert.alert("Conta criada com sucesso!");
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Erro ao cadastrar", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem(USER_ID);
      setUserId(null);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error("Logout error:", error.message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    displayName,
    setDisplayName,
    handleLogin,
    handleRegister,
    userId,
    logout,
    loading,
    setLoading,
  };
};
