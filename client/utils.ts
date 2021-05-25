import {useState} from "react";

export const base_url = `https://localhost:3000`;

export const useField = (type: string) => {
  const [value, setValue] = useState("");

  const onChange = ({target}: {target: HTMLInputElement}) => setValue(target.value);
  
  return {
    type,
    value,
    onChange
  }
}