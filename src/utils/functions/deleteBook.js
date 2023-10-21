import Swal from "sweetalert2";

export const handleDelete = (t, bookId, dispatch, navigate, url) => {
  Swal.fire({
    title: t("deleteBook"),
    text: t("deleteBookConfirmation"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: t("yesDelete"),
    cancelButtonText: t("noKeep"),
  }).then((result) => {
    if (result.isConfirmed) {
      // Dispatch an action to remove the book from the state using the book's id
      dispatch({ type: "DELETE_BOOK", payload: bookId });
      Swal.fire(t("deleted"), t("bookDeleted"), "success");
      if (url) {
        navigate(url);
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(t("cancelled"), t("notDeleted"), "error");
    }
  });
};
