import { Film } from "./film";

export class FilmData {

  // Source: https://swapi.py4e.com/api/films/
  static films: Film[] = [
    { id: 1, title: "A New Hope" },
    { id: 2, title: "The Empire Strikes Back" },
    { id: 3, title: "Return of the Jedi" },
    { id: 4, title: "The Phantom Menace" },
    { id: 5, title: "Attack of the Clones" },
    { id: 6, title: "Revenge of the Sith" },
    { id: 7, title: "The Force Awakens" },
  ]
}