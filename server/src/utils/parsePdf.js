import { PDFParse } from "pdf-parse";

export const parsePdfBuffer = async (buffer) => {
  const parser = new PDFParse({ data: buffer });
  const textResult = await parser.getText();
  await parser.destroy();
  return textResult.text;
};