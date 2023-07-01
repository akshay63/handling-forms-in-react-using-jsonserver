import { useState } from "react";
import useBooksContext from "../hooks/use-books-context";

function BookCreate() {
  const [title, setTitle] = useState("");
  const { createBook } = useBooksContext();

  const handlerChange = (event) => {
    setTitle(event.target.value);
  };

  const handlerSubmit = (event) => {
    event.preventDefault(); //your form will automatically submit the form when browser is refreshed
    createBook(title);
    setTitle(""); //clearing the text input after we create a book data
  };

  return (
    <div className="book-create">
      <h3>Add a Book</h3>
      <form onSubmit={handlerSubmit}>
        <label>Title</label>
        <input className="input" value={title} onChange={handlerChange} />
        <button className="button">Create!</button>
      </form>
    </div>
  );
}
export default BookCreate;
