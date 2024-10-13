import { toast, Bounce } from "react-toastify";
import ExcelJS from "exceljs";

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

export async function readFirstColumnStream(file) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file);
  const worksheet = workbook.getWorksheet(1); // Obtener la primera hoja

  const columnValues = [];
  worksheet.eachRow((row) => {
    columnValues.push(row.getCell(1).value); // Obtener la primera columna
  });

  return columnValues;
}
