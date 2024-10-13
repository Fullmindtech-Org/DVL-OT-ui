import React, { useState } from "react";
import { uploadFileToServer } from "../lib/actions";

const UploadButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Por favor selecciona un archivo primero.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      await uploadFileToServer(selectedFile);
      setMessage("Archivo subido exitosamente");
    } catch (error) {
      setMessage("Error al subir el archivo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Subiendo..." : "Subir archivo"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadButton;
