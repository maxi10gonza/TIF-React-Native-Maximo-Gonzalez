import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTES_KEY = "photo_notes";

export const loadNotes = async () => {
  try {
    const data = await AsyncStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading notes:", error);
    return [];
  }
};

export const saveNotes = async (notes) => {
  try {
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes:", error);
  }
};

export const addNote = async (note) => {
  const notes = await loadNotes();
  const newNote = {
    id: Date.now().toString(),
    ...note,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  notes.push(newNote);
  await saveNotes(notes);
  return newNote;
};

export const updateNote = async (id, updates) => {
  const notes = await loadNotes();
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await saveNotes(notes);
    return notes[index];
  }
  return null;
};

export const deleteNote = async (id) => {
  const notes = await loadNotes();
  const filtered = notes.filter((note) => note.id !== id);
  await saveNotes(filtered);
};

export const getNoteById = async (id) => {
  const notes = await loadNotes();
  return notes.find((note) => note.id === id);
};
