import React, { useState } from 'react';



const ImageSelector = ({ id, label, allowMultiple, handleFileChange, url,setUrl }) => {


  const [selectedImage, setSelectedImage] = useState(url ||  null);

  const handleImage = (e) => {
    setUrl('')
    const file = e.target.files[0];
    handleFileChange(e)
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const removeImage = () => {

    setSelectedImage(null)
  };



  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{label}</h2>

      <div className="md:w-[8.50cm]  pt-10 mt-8 p-8 bg-black rounded-lg relative">
        {/* Display selected images */}
        {selectedImage && (
          <div className="mb-4 flex flex-col items-center justify-center">
            <img src={selectedImage} alt={`image is loading`} className="mb-4 rounded shadow-md" />
            <div
              onClick={() => removeImage()}
              className="bg-[#FFCB04] font-bold text-black px-2 py-1 ml-2 flex justify-center items-end rounded focus:outline-none hover:bg-black hover:text-red-600"
            >
              Remove
            </div>
          </div>
        )}


        <div className="mb-4 flex items-center justify-center">
          <input
            type="file"
            id={`imageInput_${id}`}
            accept="image/*"
            onChange={handleImage}
            className="hidden"
            multiple={allowMultiple}
          />

     {!selectedImage &&     <label
            htmlFor={`imageInput_${id}`}
            className={`cursor - pointer inline-flex items-center bg-[#FFCB04] text-black font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline hover:bg-slate-400`}
          >
            <span className="mr-2" role="img" aria-label="plus symbol">
              ➕
            </span>
            Add Image
          </label>}
        </div>


      </div>
    </div >
  );

}

export default ImageSelector
