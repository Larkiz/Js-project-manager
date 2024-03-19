/* eslint-disable prettier/prettier */
const { accessSync, readFileSync } = require('fs');

export default function isNodeProject(url) {
  try {
    accessSync(url);
    const data = readFileSync(url, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    return false;
  }
}
