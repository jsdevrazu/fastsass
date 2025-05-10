import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction } from 'react';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

type TextEditorProps =
  | {
      value: string;
      setValue: Dispatch<SetStateAction<string>>;
      field?: never;
    }
  | {
      field: {
        value: string;
        onChange: (value: string) => void;
        onBlur?: () => void;
        name?: string;
        ref?: React.Ref<any>;
      };
      value?: never;
      setValue?: never;
    };

export default function TextEditor(props: TextEditorProps) {
  const value = props.field?.value ?? props.value ?? '';
  const onChange = props.field?.onChange ?? props.setValue;

  return (
    <div className="w-full">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange as any}
        modules={modules}
        className="quill-app"
      />
    </div>
  );
}
