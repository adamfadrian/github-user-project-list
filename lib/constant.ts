import axios from "axios";

export const languageColors: { [key: string]: string } = {
  HTML: "#e34c26",
  CSS: "#563d7c",
  JavaScript: "#f1e05a",
  TypeScript: "#279EFF",
  Vue: "#41b883",
};
export const fetcher = async (url: string) => await axios.get(url).then((res) => res.data)