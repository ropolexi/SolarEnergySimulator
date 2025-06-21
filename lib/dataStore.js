"use server";
import fs from 'fs';
import path from 'path';

const dirPath = path.join(process.cwd(), 'data');
const filePath = path.join(dirPath, 'savedData.json');

// Ensure data directory exists
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

let data = null;

try {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  data = JSON.parse(fileContents);
  console.log('Loaded data from file on server start');
} catch (error) {
  if (error.code === 'ENOENT') {
    // File doesn't exist - create with default empty object
    data = {};
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('File not found - created new file with empty data');
  } else {
    console.warn('Error reading file:', error);
    data = {}; // fallback to empty or default
  }
}

export async function getData() {
  return data;
}

export async function setData(newData) {
  data = newData;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log("Data saved to file")
}
