import React, { useState } from "react";
import axios from "axios";
import "./AddItem.css";
import URL from "../../../enum/enum";
const AddItems = () => {
  const [saleName, setSaleName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const pickImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageUrl(reader.result);
        setImage(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = async () => {
    if (
      !saleName ||
      !price ||
      !quantity ||
      !description ||
      !productName ||
      !size ||
      !image
    ) {
      alert("Please fill in all the fields and upload an image.");
      return;
    }

    try {
      const payload = {
        Salee_Name: saleName,
        Price: price,
        Quantity: quantity,
        Description: description,
        Product_Name: productName,
        Size: size,
        Img: image,
      };

      const response = await axios.post(`${URL}/insertNewProduct`, payload);

      if (response.status === 200) {
        alert("Success: " + response.data.message);
      } else {
        alert("Failed to add the product.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("An error occurred while adding the product.");
    }
  };

  return (
    <div className="add-items-container">
      <h1 className="title">Add New Product</h1>

      <label className="label">Sale Name</label>
      <input
        className="input"
        type="text"
        placeholder="Enter sale name"
        value={saleName}
        onChange={(e) => setSaleName(e.target.value)}
      />

      <label className="label">Price</label>
      <input
        className="input"
        type="number"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label className="label">Quantity</label>
      <input
        className="input"
        type="number"
        placeholder="Enter quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <label className="label">Description</label>
      <textarea
        className="textarea"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label className="label">Product Name</label>
      <input
        className="input"
        type="text"
        placeholder="Enter product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <label className="label">Size</label>
      <input
        className="input"
        type="text"
        placeholder="Enter size (e.g., Small, Medium, Large)"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />

      <label className="label">Product Image</label>
      {uploadedImageUrl ? (
        <img src={uploadedImageUrl} alt="Preview" className="image-preview" />
      ) : (
        <input type="file" accept="image/*" onChange={pickImage} />
      )}

      <button className="add-button" onClick={handleAddItem}>
        Add Product
      </button>
    </div>
  );
};

export default AddItems;
