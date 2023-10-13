import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import BookForm from "../../components/BookForm";
import { useBookContext } from "../../context/BookContext";
import { BooksValidationSchema } from "../../utils/validations/BooksValidation";

function EditBook() {
  const { id } = useParams();
  console.log("bookId", id);
  const history = useNavigate();
  const { state, dispatch } = useBookContext();
  console.log("state", state);
  const [bookData, setBookData] = useState(null);

  console.log("bookData", bookData);
  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: bookData,
    resolver: yupResolver(BooksValidationSchema),
  });

  useEffect(() => {
    // Dispatch "VIEW_BOOK" action with the book ID to get Book data
    dispatch({ type: "VIEW_BOOK", payload: id });
  }, [id, dispatch]);

  useEffect(() => {
    setBookData(state.viewedBook);
    reset(state.viewedBook);
  }, [state.viewedBook]);

  const onSubmit = (data) => {
    // Dispatch the "EDIT_BOOK" action to edit the book
    dispatch({ type: "EDIT_BOOK", payload: { id, ...data } });

    Swal.fire({
      icon: "success",
      title: "Book Updated!",
      text: "The book has been updated successfully.",
      showConfirmButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        history("/books-list");
      }
    });
  };

  return (
    <BookForm
      title="Edit Book"
      control={control}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

export default EditBook;
