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
import { useTranslation } from "react-i18next";
import { showSuccessAlert } from "../../utils/functions/showSuccessAlert";

function AddBook() {
  const navigate = useNavigate();
  const { dispatch } = useBookContext();
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: BooksInitialValues,
    resolver: yupResolver(BooksValidationSchema(t)),
  });

  const onSubmit = (data) => {
    const id = uuidv4();
    const newBook = { id, ...data };

    // Dispatch the "ADD_BOOK" action to add the new book to the state
    dispatch({ type: "ADD_BOOK", payload: newBook });

    showSuccessAlert(t, "bookAdded", "bookAddedSuccess", "ok", () =>
      navigate("/books-list")
    );
  };
  return (
    <BookForm
      title={t("addBook")}
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      t={t}
    />
  );
}

export default AddBook;
