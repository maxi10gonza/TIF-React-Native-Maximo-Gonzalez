import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6366f1",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Mis Notas",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: "Nueva Nota",
        }}
      />
      <Stack.Screen
        name="note/[id]"
        options={{
          title: "Detalle de Nota",
        }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{
          title: "Editar Nota",
        }}
      />
    </Stack>
  );
}
