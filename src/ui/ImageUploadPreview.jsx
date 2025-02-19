import { BiTrash } from "react-icons/bi";

const ImageUploadAndPreview = ({ image, setImage, setValue }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image preview URL
        setValue("image", file); // Set image file in form data
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setValue("image", null); // Remove image from form data
  };

  return (
    <div>
      <label
        htmlFor="image-upload"
        className="border cursor-pointer border-dashed flex items-center justify-center aspect-video p-4 rounded-md "
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="image-upload"
          disabled={!!image} // Prevent upload if an image is set
        />
        <div
          className={`cursor-pointer w-full ${
            image ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="text-center text-secondary-500">
            {image ? "Image uploaded" : "Click to upload an image"}
          </div>
        </div>
      </label>

      {image && (
        <div className="mt-4 border rounded-md p-2 shadow-md">
          <div className="relative flex items-center justify-between">
            <button
              type="button"
              onClick={removeImage}
              className=" top-2 right-2 text-secondary-400 p-1 rounded-full"
            >
              <BiTrash className="w-5 h-5" />
            </button>
            <img
              src={image}
              alt="Preview"
              className="w-14 aspect-square h-auto object-cover rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadAndPreview;
