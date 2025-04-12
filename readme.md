# 🛒 Cart Mate

**Cart Mate** é um aplicativo de lista de compras compartilhável desenvolvido com **Expo** e **TypeScript**, utilizando **Firebase** para autenticação e armazenamento em tempo real.
![CartMate Logo](./assets/icon.png)

---

## 🚀 Tecnologias Utilizadas

- [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/)
- TypeScript
- Firebase Authentication
- Firebase Realtime Database
- React Navigation (Stack & Drawer)
- Context API
- AsyncStorage (armazenamento local)

---

## ✅ Funcionalidades Implementadas

- [x] Tela de Login
- [x] Tela de Registro de Usuário
- [x] Autenticação com Firebase
- [x] Armazenamento local do `userId`
- [x] Criação e seleção de listas de compras
- [x] Exclusão de listas
- [x] Lembrar última lista acessada
- [x] Menu lateral com navegação entre:
  - Lista de Compras
  - Minhas Listas
  - Sair (Logout)
- [x] Logout que limpa dados locais e retorna ao login
- [x] Navegação condicional com base no login

---

## 🧭 Funcionalidades Planejadas

- [ ] Compartilhamento de listas entre usuários
- [ ] Permissões de edição e visualização
- [ ] Histórico de compras
- [ ] Interface personalizada por lista (cores/ícones)
- [ ] Otimização offline

---

## 📁 Estrutura de Pastas

```bash
├── .gitignore
├── App.tsx
├── app.config.js
├── assets
    ├── adaptive-icon.png
    ├── favicon.png
    ├── icon.png
    └── splash-icon.png
├── firebase.ts
├── index.ts
├── package-lock.json
├── package.json
├── readme.md
├── src
    ├── components
    │   ├── HeaderBar.tsx
    │   └── ListSelectModal.tsx
    ├── contexts
    │   ├── AuthContext.tsx
    │   └── ShoppingListContext.tsx
    ├── hooks
    │   ├── useShoppingList.ts
    │   └── useUser.ts
    ├── navigation
    │   ├── AppNavigator.tsx
    │   ├── AppRoutes.tsx
    │   ├── PrivateNavigator.tsx
    │   └── types.ts
    ├── screens
    │   ├── LoginScreen.tsx
    │   ├── LogoutScreen.tsx
    │   ├── MyListsScreen.tsx
    │   ├── RegisterScreen.tsx
    │   └── ShoppingListScreen.tsx
    └── services
    │   └── firebaseService.ts
├── tsconfig.json
└── types
    └── types.ts
```

---

## 🛡️ Segurança

🔐 Os dados sensíveis como as chaves do Firebase estão protegidos via `.env` e **não são versionados**.

---

Feito com 💙 por Eduardo Estigarribia
