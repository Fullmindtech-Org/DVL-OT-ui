import { toast, Bounce } from "react-toastify";
import { saveAs } from "file-saver";

export function generatePagination(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      2,
      " ...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    " ...",
    totalPages,
  ];
}

export function showToast(type, message) {
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  if (type === "success") {
    toast.success(message, toastOptions);
  } else if (type === "error") {
    toast.error(message, toastOptions);
  }
}

export async function generateAndDownloadPDF(ot) {
  try {
    fetch("http://localhost:8080/generar-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ot),
    })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        saveAs(blob, `${ot.orden_trabajo_id}.pdf`);
      })
      .catch((error) => console.error("Error:", error));
  } catch (error) {
    console.error("Error generating or downloading PDF:", error);
    showToast("error", "Error al generar el PDF");
  }
}
