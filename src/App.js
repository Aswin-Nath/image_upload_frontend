import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);  // To hold the selected image
  const [imageName, setImageName] = useState("");            // To hold the image name
  // const [imageType, setImageType] = useState("");            // To hold the image type (optional)
  const [uploadStatus, setUploadStatus] = useState(null);    // To display upload status
  const [imageUrl, setImageUrl] = useState("");              // To display the uploaded image URL

  // Handle image file selection
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);  // Store the selected file
  };

  // Handle image name input
  const handleNameChange = (e) => {
    setImageName(e.target.value);
  };

  // Handle image type input (optional)


  // Upload image to the server
  const handleUpload = async () => {
    if (!selectedImage || !imageName) {
      setUploadStatus("Please select an image and provide a name.");
      return;
    }
// 
    const formData = new FormData();
    formData.append("image", selectedImage);  // Add the file to formData
    formData.append("image_name", imageName);  // Add the image name

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post("https://git-auto.onrender.com/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",  // Set the correct content type for file upload
        },
      });

      setUploadStatus("Upload Successful!");
      setImageUrl(response.data.url);  // Store the uploaded image URL
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
