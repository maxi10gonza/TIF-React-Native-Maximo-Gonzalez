import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";
import { addNote } from "../utils/storage";

export default function CreateScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setCameraActive(false);
    }
  };

  const takePhoto = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert("Permiso requerido", "Se necesita acceso a la cámara");
        return;
      }
    }
    setCameraActive(true);
  };

  const capturePhoto = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        setImageUri(photo.uri);
        setCameraActive(false);
      } catch (_error) {
        Alert.alert("Error", "No se pudo capturar la foto");
      }
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Ingresa un título");
      return;
    }
    if (!imageUri) {
      Alert.alert("Error", "Captura o selecciona una imagen");
      return;
    }

    try {
      await addNote({
        title: title.trim(),
        description: description.trim(),
        imageUri,
      });
      Alert.alert("Éxito", "Nota creada correctamente", [
        { text: "OK", onPress: () => router.push("/") },
      ]);
    } catch (_error) {
      Alert.alert("Error", "No se pudo guardar la nota");
    }
  };

  if (cameraActive && permission?.granted) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          ref={(ref) => setCameraRef(ref)}
          style={styles.camera}
          facing="back"
        >
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCameraActive(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
        <View style={styles.captureBar}>
          <TouchableOpacity style={styles.captureButton} onPress={capturePhoto}>
            <View style={styles.captureInner} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {imageUri ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <TouchableOpacity
              style={styles.changeImageButton}
              onPress={() => setImageUri(null)}
            >
              <Text style={styles.changeImageText}>Cambiar imagen</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Selecciona una imagen</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={takePhoto}
              >
                <Text style={styles.buttonText}>Tomar foto</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={pickImage}
              >
                <Text style={styles.buttonText}>De galería</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa un título"
          value={title}
          onChangeText={setTitle}
          maxLength={50}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Ingresa una descripción"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          maxLength={500}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Nota</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
  },
  imageContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#e0e0e0",
  },
  changeImageButton: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  changeImageText: {
    color: "#6366f1",
    fontWeight: "bold",
  },
  imagePlaceholder: {
    height: 250,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#6366f1",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#e0e7ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  descriptionInput: {
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  captureBar: {
    backgroundColor: "#000",
    paddingVertical: 20,
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ddd",
  },
});
