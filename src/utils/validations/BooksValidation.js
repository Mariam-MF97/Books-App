import * as Yup from "yup";

export const BooksValidationSchema = (t) =>
  Yup.object().shape({
    title: Yup.string()
      .required(t("validation.required"))
      .matches(/^[a-zA-Z\s]+$/, t("validation.acceptCharactersOnly")),
    author: Yup.string()
      .required(t("validation.required"))
      .matches(/^[a-zA-Z\s]+$/, t("validation.acceptCharactersOnly")),
    category: Yup.string().required(t("validation.required")),
    price: Yup.number()
      .required(t("validation.required"))
      .typeError(t("validation.bookPriceNumber"))
      .test("is-valid-amount", t("validation.bookPriceFormat"), (value) => {
        const numberValue = parseFloat(value);
        if (isNaN(numberValue)) return false;
        return (numberValue * 100) % 1 === 0;
      }),
    pdf_file: Yup.string().required(t("validation.required")),
    cover_photo: Yup.string().required(t("validation.required")),
    version: Yup.string().required(t("validation.required")),
    old_version: Yup.string().optional(),
    edition: Yup.string(),
    isbn: Yup.string()
      .required(t("validation.required"))
      .matches(/^(\d-?){10,13}$/, t("validation.bookIsbnFormat")),
    release_date: Yup.string().optional(),
    brief: Yup.string()
      .required(t("validation.required"))
      .max(800, t("validation.bookBriefMaxLength")),
  });
