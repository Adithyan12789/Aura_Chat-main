import axios from "axios";
import FormData from "form-data";

/**
 * Upload image to ImgBB
 * @param {string} base64Image - Base64 encoded image string (with or without data:image prefix)
 * @returns {Promise<string>} - URL of uploaded image
 */
export const uploadToImgBB = async (base64Image) => {
  try {
    const apiKey = process.env.IMGBB_API_KEY;
    
    if (!apiKey) {
      throw new Error("ImgBB API key not configured");
    }

    // Remove the data:image/...;base64, prefix if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

    // Create form data
    const formData = new FormData();
    formData.append('key', apiKey);
    formData.append('image', base64Data);

    // Upload to ImgBB
    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: formData.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    if (response.data && response.data.data && response.data.data.url) {
      return response.data.data.url;
    } else {
      throw new Error("Invalid response from ImgBB");
    }
  } catch (error) {
    console.error("ImgBB upload error:", {
      message: error.message,
      response: error.response?.data
    });
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};
