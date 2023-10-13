import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import BookForm from "../../components/BookForm";
import { useBookContext } from "../../context/BookContext";
import { BooksInitialValues } from "../../utils/initialValues/BooksInitialValues";
import { BooksValidationSchema } from "../../utils/validations/BooksValidation";
function AddBook() {
  const history = useNavigate();
  const { state, dispatch } = useBookContext();

  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: BooksInitialValues,
    resolver: yupResolver(BooksValidationSchema),
  });

  const onSubmit = (data) => {
    console.log("submit", data);
    const id = uuidv4();
    const newBook = { id, ...data };

    // Dispatch the "ADD_BOOK" action to add the new book to the state
    dispatch({ type: "ADD_BOOK", payload: newBook });

    Swal.fire({
      icon: "success",
      title: "Book Added!",
      text: "The book has been added successfully.",
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
      title="Add Book"
      control={control}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

export default AddBook;
