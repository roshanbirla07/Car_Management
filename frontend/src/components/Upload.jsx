import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Upload = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fileHandler = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + images.length > 10) {
      toast.error("You can only upload a maximum of 10 images.");
      return;
    }

    const newImages = selectedFiles.map((file) => ({ file }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`images[${index}][file]`, image.file);
      formData.append(`images[${index}][title]`, title);
      formData.append(`images[${index}][description]`, description);
    });

    

    try {
      const response = await fetch("http://localhost:3000/blinkit/imageUpload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast.success(data.message);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto bg-white rounded-lg shadow-lg space-y-4">
      <input
        type="file"
        onChange={fileHandler}
        multiple
        className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />

      <input
        type="text"
        placeholder="Title for all images"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />

      <textarea
        placeholder="Description for all images"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Upload
      </button>
    </form>
  );
};

export default Upload;
