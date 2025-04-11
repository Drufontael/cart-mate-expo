import { ShoppingListProvider } from "../contexts/ShoppingListContext";
import PrivateNavigator from "./PrivateNavigator";

export default function AppRoutes() {
  return (
    <ShoppingListProvider>
      <PrivateNavigator />
    </ShoppingListProvider>
  );
}
