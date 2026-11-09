import fs from "fs";

export const saveFile = (data: string, filename: string): void => {
  fs.writeFileSync(filename, data);
};

export const readFile = (filename: string): string | null => {
  if (!fs.existsSync(filename)) {
    return null;
  }

  const data = fs.readFileSync(filename, { encoding: "utf-8" });
  return data;
};
