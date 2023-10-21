import Swal from "sweetalert2";

export const showSuccessAlert = (
  t,
  title,
  text,
  confirmButtonText,
  onConfirm
) => {
  Swal.fire({
    icon: "success",
    title: t(title),
    text: t(text),
    showConfirmButton: true,
    confirmButtonText: t(confirmButtonText),
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    }
  });
};
