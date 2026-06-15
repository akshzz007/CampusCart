import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("Electronics");

  const [condition, setCondition] =
    useState("Good");

  const [images, setImages] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  const handleImageChange =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const files =
        e.target.files;

      if (!files) return;

      setLoading(true);

      try {
        const uploadedImages: string[] =
          [];

        for (
          let i = 0;
          i < files.length;
          i++
        ) {
          const formData =
            new FormData();

          formData.append(
            "file",
            files[i]
          );

          formData.append(
            "upload_preset",
            "campuscart"
          );

          const res =
            await axios.post(
              "https://api.cloudinary.com/v1_1/ditgiezxh/image/upload",
              formData
            );

          uploadedImages.push(
            res.data.secure_url
          );
        }

        setImages(
          uploadedImages
        );

        alert(
          "Images uploaded successfully 🚀"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Image upload failed ❌"
        );
      }

      setLoading(false);
    };

  const handleSubmit = async () => {
    try {
      if (
        !title ||
        !price ||
        !description ||
        images.length === 0
      ) {
        alert(
          "Please fill all fields"
        );
        return;
      }

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        alert(
          "Please login first"
        );
        return;
      }

      const user = JSON.parse(
        localStorage.getItem(
          "campuscart-user"
        ) || "{}"
      );

      const response =
        await axios.post(
          "http://localhost:5000/api/products",
          {
            title,
            description,
            price: Number(price),

            category,
            condition,

            campus:
              user.campus || "",

            college:
              user.college || "",

            images,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      console.log(
        "SUCCESS:",
        response.data
      );

      alert(
        "Product Listed Successfully 🚀"
      );

      navigate("/products");
    } catch (error: any) {
      console.log(
        "ERROR:",
        error.response?.data
      );

      alert(
        error.response?.data
          ?.message ||
          "Failed to add product"
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold mb-8">
          Sell Your Item 🚀
        </h1>

        <div className="space-y-5">

          <input
            placeholder="Product Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full border p-4 rounded-2xl"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            className="w-full border p-4 rounded-2xl"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full border p-4 rounded-2xl"
          >
            <option>
              Electronics
            </option>

            <option>
              Books & Notes
            </option>

            <option>
              Calculators
            </option>

            <option>
              Bags
            </option>

            <option>
              Hostel Essentials
            </option>

            <option>
              Lab Equipment
            </option>
          </select>

          <select
            value={condition}
            onChange={(e) =>
              setCondition(
                e.target.value
              )
            }
            className="w-full border p-4 rounded-2xl"
          >
            <option>New</option>

            <option>
              Like New
            </option>

            <option>Good</option>

            <option>Used</option>
          </select>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={
              handleImageChange
            }
            className="w-full border p-4 rounded-2xl"
          />

          <textarea
            placeholder="Description"
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full border p-4 rounded-2xl"
          />

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map(
                (
                  img,
                  index
                ) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    className="w-full h-40 object-cover rounded-2xl border"
                  />
                )
              )}
            </div>
          )}

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl hover:bg-indigo-700 transition font-semibold disabled:opacity-50"
          >
            {loading
              ? "Uploading Images..."
              : "List Product"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddProduct;