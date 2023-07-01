import { createContext, useState, useCallback } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  //Fetching all books using API server + Fixing useEffect using useCallback function
  const fetchBooks = useCallback(async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  }, []);
  //  const stableFetchBooks = useCallback(fetchBooks, []);

  const editBookById = async (id, newTitle) => {
    //Editing book using API server
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });
    console.log(response);
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    //Deleting a book using API server
    await axios.delete(`http://localhost:3001/books/${id}`);
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };

  const createBook = async (title) => {
    //Creating book using API server
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });
    console.log(response);

    // console.log("Need to add book with:", title);

    //BAD CODE:
    // books.push({ id: 123, title: title });
    // console.log(books);
    // setBooks(books);

    //GOOD CODE:✔ more efficient and clean
    //LEARNING: As new JS syntax, if a property name has a same value as its name, then we can skip the assignment as just write the property
    // const updatedBooks = [...books, { id: 123, title: title }];
    // const updatedBooks = [
    //   ...books,
    //   { id: Math.round(Math.random() * 9999), title },
    // ];

    //newly updatedBooks after we created a request to API server and got response back
    const updatedBooks = [...books, response.data];

    setBooks(updatedBooks);
  };

  const valueToShare = {
    books,
    deleteBookById,
    editBookById,
    createBook,
    fetchBooks,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider }; //named export
export default BooksContext; //default export

//To import both above exports: use mixed imports-
//import {Provider}, BooksContext from "./books.js"
