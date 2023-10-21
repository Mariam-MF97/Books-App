import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BookForm from "../../components/BookForm";
import { useBookContext } from "../../context/BookContext";
import { BooksInitialValues } from "../../utils/initialValues/BooksInitialValues";
import { BooksValidationSchema } from "../../utils/validations/BooksValidation";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useBookContext();

  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: BooksInitialValues,
    resolver: yupResolver(BooksValidationSchema),
  });

  useEffect(() => {
    // Dispatch "VIEW_BOOK" action with the book ID to get Book data
    dispatch({ type: "VIEW_BOOK", payload: id });
    reset(state.viewedBook);
  }, [id, dispatch, state.viewedBook]);

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
        navigate("/books-list");
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
