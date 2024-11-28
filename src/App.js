import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setImageName(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedImage || !imageName) {
      setUploadStatus("Please select an image and provide a name.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("image_name", imageName);

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post("https://git-auto.onrender.com/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadStatus("Upload Successful!");
      setImageUrl(response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("Upload Failed!");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Upload</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <input
          type="text"
          placeholder="Enter image name"
          value={imageName}
          onChange={handleNameChange}
        />
        <button onClick={handleUpload}>Upload Image</button>

        {uploadStatus && <p>{uploadStatus}</p>}

        {imageUrl && (
          <div>
            <h3>Uploaded Image:</h3>
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "500px", marginTop: "10px" }} />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
