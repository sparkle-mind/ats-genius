import cloudinary from "../config/cloudinary.js";
import { parsePdfBuffer } from "../utils/parsePdf.js";

export const uploadResumeFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // Parse PDF
    const parsedText = await parsePdfBuffer(file.buffer);
    // Upload to Cloudinary
    const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "uploads/resumes",
      resource_type: "auto",
    });

    return res.json({
      message: "Upload successful",
      result: result,
      url: result.secure_url,
      public_id: result.public_id,
      parsedText,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
