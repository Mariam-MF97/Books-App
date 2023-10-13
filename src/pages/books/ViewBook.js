import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBookContext } from "../../context/BookContext";
import ViewBookForm from "../../components/ViewBookForm";

const ViewBook = () => {
  const { id } = useParams();
  const { state, dispatch } = useBookContext();

  useEffect(() => {
    // Use the "VIEW_BOOK" action to fetch the book data
    dispatch({ type: "VIEW_BOOK", payload: id });
  }, [id, dispatch]);

  return <ViewBookForm book={state.viewedBook} id={id} />;
};

export default ViewBook;
