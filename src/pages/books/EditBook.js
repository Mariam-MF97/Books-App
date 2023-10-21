import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BookForm from "../../components/BookForm";
import { useBookContext } from "../../context/BookContext";
import { BooksInitialValues } from "../../utils/initialValues/BooksInitialValues";
import { BooksValidationSchema } from "../../utils/validations/BooksValidation";
import { useTranslation } from "react-i18next";
import { showSuccessAlert } from "../../utils/functions/showSuccessAlert";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useBookContext();
  const { t } = useTranslation();

  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: BooksInitialValues,
    resolver: yupResolver(BooksValidationSchema(t)),
  });

  useEffect(() => {
    // Dispatch "VIEW_BOOK" action with the book ID to get Book data
    dispatch({ type: "VIEW_BOOK", payload: id });
    reset(state.viewedBook);
  }, [id, dispatch, state.viewedBook]);

  const onSubmit = (data) => {
    // Dispatch the "EDIT_BOOK" action to edit the book
    dispatch({ type: "EDIT_BOOK", payload: { id, ...data } });

    showSuccessAlert(t, "bookUpdated", "bookUpdatedSuccess", "ok", () =>
      navigate("/books-list")
    );
  };
  return (
    <BookForm
      title={t("editBook")}
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      t={t}
    />
  );
}

export default EditBook;
