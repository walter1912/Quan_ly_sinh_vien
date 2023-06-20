import PropTypes from "prop-types";

const UploadImage = (props) => {
  const { setImage } = props;
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jcysygke");

    fetch("https://api.cloudinary.com/v1_1/dpi8ubaqe/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const { original_filename, url } = data;
        let imagePost = { name: original_filename, url };
        setImage(imagePost);
        // Lấy đường dẫn trực tuyến của ảnh từ data và sử dụng nó trong ứng dụng của bạn
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
    </div>
  );
};

UploadImage.propTypes = {
  setImage: PropTypes.func,
};
UploadImage.defaultProps = {
  setImage: () => {
    console.log("setImage function");
  },
};

export default UploadImage;
