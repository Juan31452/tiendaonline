import { useState } from "react";

const ImageUploader = () => {
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const [folder, setFolder] = useState("pedido1");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (files.length === 0) return;

    setLoading(true);
    setUrls([]);

    const uploadPromises = Array.from(files).map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "mi_preset"); // Reemplaza con tu preset

      const publicId = `${folder}/${file.name.split('.').slice(0, -1).join('.')}`;
      formData.append("public_id", publicId);

      return fetch("https://api.cloudinary.com/v1_1/dgplca5we/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => data.secure_url);
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      setUrls(uploadedUrls);
    } catch (error) {
      console.error("Error al subir imágenes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 border rounded">
      <h4>Subir imágenes a Cloudinary</h4>

      <div className="mb-2">
        <label>Nombre de la carpeta:</label>
        <input
          type="text"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="form-control"
          placeholder="Ej: pedido23"
        />
      </div>

      <div className="mb-2">
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="form-control"
        />
      </div>

      <button
        onClick={handleUpload}
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? "Subiendo..." : "Subir imágenes"}
      </button>

      {loading && (
        <div className="mt-3 text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Subiendo imágenes, por favor espera...</p>
        </div>
      )}

      {urls.length > 0 && (
        <div className="mt-4">
          <h5>Imágenes subidas:</h5>
          {urls.map((url, index) => (
            <div key={index} className="mb-3">
              <img src={url} alt={`img-${index}`} className="img-fluid mb-2" />
              <code>{url}</code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
