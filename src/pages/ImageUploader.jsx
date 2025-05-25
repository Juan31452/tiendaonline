// components/ImageUploader.jsx
import { useState } from "react";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [folder, setFolder] = useState("pedidos"); // Carpeta por defecto

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mi_preset"); // Reemplaza con el tuyo

    const res = await fetch("https://api.cloudinary.com/v1_1/dgplca5we/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUrl(data.secure_url);
  };
  return (
      <div className="p-3 border rounded">
      <h4>Subir imagen a Cloudinary</h4>

      <div className="mb-2">
        <label>Carpeta:</label>
        <input
          type="text"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="form-control"
          placeholder="Ej: pedido, etc."
        />
      </div>

      <div className="mb-2">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <button onClick={handleUpload} className="btn btn-primary">
        Subir imagen
      </button>

      {url && (
        <div className="mt-3">
          <p><strong>Imagen subida:</strong></p>
          <img src={url} alt="subida" className="img-fluid mb-2" />
          <p><code>{url}</code></p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
