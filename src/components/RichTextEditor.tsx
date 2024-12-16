"use client";
import { FC } from "react";
import QuilEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "./ui/label";

interface RichTextEditorProps {
  label: string;
  value: string;
  isError: boolean;
  onChange: (value: string) => void;
}
const RichTextEditor: FC<RichTextEditorProps> = ({
  label,
  value,
  isError,
  onChange,
}) => {
  const quillModules = {
    toolbar: [[{ header: [1, 2, 3] }], ["bold", "italic"]],
  };
  return (
    <div className="flex flex-col space-y-1.5">
      <Label>{label}</Label>

      <QuilEditor
        modules={quillModules}
        value={value}
        onChange={onChange}
        className="h[300px] pb-16"
      />

      {isError && <p className="text-xs text-red-500">{label} is required</p>}
    </div>
  );
};

export default RichTextEditor;
