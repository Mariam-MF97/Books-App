import Swal from "sweetalert2";

export const handleDelete = (bookId, dispatch, history, url) => {
  Swal.fire({
    title: "Delete Book",
    text: "Are you sure you want to delete this book?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "No, keep it",
  }).then((result) => {
    if (result.isConfirmed) {
      // Dispatch an action to remove the book from the state using the book's id
      dispatch({ type: "DELETE_BOOK", payload: bookId });
      Swal.fire("Deleted!", "The book has been deleted.", "success");
      if (url) {
        history(url);
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "The book has not been deleted.", "error");
    }
  });
};
