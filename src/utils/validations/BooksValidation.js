import * as Yup from "yup";

export const BooksValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Book title is mandatory")
    .matches(/^[a-zA-Z\s]+$/, "Accepts only characters"),
  author: Yup.string()
    .required("Book author is mandatory")
    .matches(/^[a-zA-Z\s]+$/, "Accepts only characters"),
  category: Yup.string().required("Book Category is mandatory"),
  price: Yup.number()
    .required("Book price is mandatory")
    .typeError("Price must be a number")
    .test("is-valid-amount", "Invalid Price format (e.g., 20.00) ", (value) => {
      const numberValue = parseFloat(value);
      if (isNaN(numberValue)) return false;
      return (numberValue * 100) % 1 === 0;
    }),
  pdf_file: Yup.string().required("Book PDF is mandatory"),
  cover_photo: Yup.string().required("Cover photo is mandatory"),
  version: Yup.string().required("Book version is mandatory"),
  old_version: Yup.string().optional(),
  edition: Yup.string(),
  isbn: Yup.string()
    .required("Book ISBN is mandatory")
    .matches(
      /^(\d-?){10,13}$/,
      "ISBN format is invalid (e.g., 978-3-16-148410-0) min 10 and max 13 digits"
    ),
  release_date: Yup.string().optional(),
  brief: Yup.string()
    .required("Book brief is mandatory")
    .max(800, "Brief must be at most 800 characters"),
});
