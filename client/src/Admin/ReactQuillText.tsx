import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./Admin.module.scss";

type ReactQuillTextType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const ReactQuillText: React.FC<ReactQuillTextType> = ({
  value,
  setValue,
}) => {
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className={styles["react-quill"]}>
      <ReactQuill
        formats={formats}
        theme="snow"
        value={value}
        style={{ height: "200px" }}
        modules={modules}
        onChange={setValue}
      />
    </div>
  );
};
