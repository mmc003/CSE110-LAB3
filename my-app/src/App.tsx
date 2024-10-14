import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import React, { useState, useEffect, useContext } from "react";
import { FavoritesList } from "./favoriteList";

function App() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favoriteId) => favoriteId !== id)
        : [...prevFavorites, id]
    );
  };

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const [notes, setNotes] = useState(dummyNotesList);

  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.nonselect,
  };

  const [createNote, setCreateNote] = useState(initialNote);
  const [isEditing, setIsEditing] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (isEditing && noteToEdit) {
      const editNote = notes.map((note) =>
        note.id === noteToEdit.id ? { ...createNote, id: note.id } : note
      );
      setNotes(editNote);
      setIsEditing(false);
      setNoteToEdit(null);
    } else {
      const newNote = {
        ...createNote,
        id: notes.length + 1,
      };
      setNotes([...notes, newNote]);
    }

    setCreateNote(initialNote);
  };

  const deleteNoteHandler = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);

    const updatedFavorites = favorites.filter(
      (favoriteId) => favoriteId !== id
    );
    setFavorites(updatedFavorites);
  };

  const editNoteHandler = (note: Note) => {
    setCreateNote(note);
    setIsEditing(true);
    setNoteToEdit(note);
  };

  return (
    <div
      className={`app-container ${isDarkTheme ? "dark-theme" : "light-theme"}`}
    >
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            value={createNote.title}
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })
            }
            required
          ></input>
        </div>

        <div>
          <textarea
            placeholder="Note Contents"
            value={createNote.content}
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })
            }
            required
          ></textarea>
        </div>

        <div>
          <select
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({
                ...createNote,
                label: event.target.value as Label,
              })
            }
          >
            <option value={Label.nonselect}>Please Select an Option</option>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div>
          <button type="submit">
            {isEditing ? "Update Note" : "Create Note"}
          </button>
        </div>
        <FavoritesList notes={notes} favorites={favorites} />
      </form>

      <div
        className={`notes-grid ${isDarkTheme ? "dark-theme" : "light-theme"}`}
      >
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button onClick={() => toggleFavorite(note.id)}>
                {favorites.includes(note.id) ? "❤️" : "♡"}
              </button>
              <button onClick={() => deleteNoteHandler(note.id)}>X</button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
            <button className="edit" onClick={() => editNoteHandler(note)}>
              Edit
            </button>
          </div>
        ))}
      </div>

      <div>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </div>
  );
}

export default App;
