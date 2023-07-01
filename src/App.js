import { useEffect, useContext } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import BooksContext from "./context/books";

function App() {
  console.clear();

  const { fetchBooks } = useContext(BooksContext);

  //Don't Do this❌❌❌:
  //fetchBooks();
  //calling fetchBooks inside App.js file. If you do this, our app component will make hundreds or thousands of requests per second as it rerenders. So we need to call the fetchBooks() only one time when our app renders on screen for first time.
  //Solution to above problem: useEffect() function
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList />
      <BookCreate />
    </div>
  );
}

export default App;
