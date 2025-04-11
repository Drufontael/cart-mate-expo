import { createContext, useContext } from "react";
import { useShoppingList } from "../hooks/useShoppingList";

const ShoppingListContext = createContext<ReturnType<
  typeof useShoppingList
> | null>(null);

export const ShoppingListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const shoppingList = useShoppingList();
  return (
    <ShoppingListContext.Provider value={shoppingList}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingListContext = () => {
  const context = useContext(ShoppingListContext);
  if (!context)
    throw new Error(
      "useShoppingListContext deve ser usado dentro de ShoppingListProvider"
    );
  return context;
};
