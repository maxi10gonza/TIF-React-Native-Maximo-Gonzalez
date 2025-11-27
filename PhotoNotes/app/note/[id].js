import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getNoteById, deleteNote } from "../../utils/storage";

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState(null);
  const router = useRouter();

  const loadNote = useCallback(async () => {
    const loadedNote = await getNoteById(id);
    setNote(loadedNote);
  }, [id]);

  useEffect(() => {
    loadNote();
  }, [loadNote]);

  const handleDelete = () => {
    Alert.alert(
      "Eliminar nota",
      "¿Estás seguro de que deseas eliminar esta nota?",
      [
        { text: "Cancelar", onPress: () => {} },
        {
          text: "Eliminar",
          onPress: async () => {
            await deleteNote(id);
            router.push("/");
          },
          style: "destructive",
        },
      ]
    );
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: note.imageUri }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.date}>
          {new Date(note.createdAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <View style={styles.divider} />
        <Text style={styles.description}>{note.description}</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push(`/edit/${id}`)}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#e0e0e0",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#6366f1",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
