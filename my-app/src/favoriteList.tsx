import { Note } from "./types";
import React from "react";
import "./App.css";

interface Favprops {
  notes: Note[];
  favorites: number[];
}

export const FavoritesList: React.FC<Favprops> = ({ notes, favorites }) => {
  const favoriteNotes = notes.filter((note) => favorites.includes(note.id));

  return (
    <div className="favorites-list">
      <h3 style={{margin: "5px"}}>List of Favorites</h3>
      <ul>
        {favoriteNotes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
};
