import { Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface UploadImgProps {
  name: string;
  label?: string;
  files: File[];
  previews?: string[];
  onFilesChange: (files: File[]) => void;
  onPreviewRemove?: (index: number) => void;
}

export const UploadImg = ({ name, label, files, onFilesChange, onPreviewRemove, previews }: UploadImgProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploaded = Array.from(e.target.files);
      onFilesChange([...files, ...uploaded]);
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  };

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-xs" htmlFor={name}>
          {label}
        </label>
      )}

      <Card className="min-h-[150px]">
        <CardContent className="flex flex-wrap gap-4 p-4">
          {/* imagens já existentes */}
          {previews &&
            previews.map((url, index) => (
              <div className="group relative h-24 w-24" key={`preview-${index}`}>
                <Image
                  alt="Preview"
                  className="h-full w-full rounded-lg object-cover"
                  height={96}
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`}
                  style={{ objectFit: "cover" }}
                  width={96}
                />

                <button
                  className="absolute top-1 right-1 hidden rounded-full bg-white p-1 shadow-md transition group-hover:block hover:bg-red-500 hover:text-white"
                  onClick={() => onPreviewRemove && onPreviewRemove(index)}
                  type="button"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

          {/* novas imagens */}
          {files.map((file, index) => (
            <div className="group relative h-24 w-24" key={`file-${index}`}>
              <Image
                alt="Preview"
                className="h-full w-full rounded-lg object-cover"
                height={96}
                src={URL.createObjectURL(file)}
                style={{ objectFit: "cover" }}
                unoptimized
                width={96}
              />
              <button
                className="absolute top-1 right-1 hidden rounded-full bg-white p-1 shadow-md transition group-hover:block hover:bg-red-500 hover:text-white"
                onClick={() => removeFile(index)}
                type="button"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <label
            className="hover:border-primary flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed text-sm text-gray-500"
            htmlFor={name}
          >
            <UploadCloud className="mb-1 h-6 w-6" />
            <span className="text-center text-xs">Adicionar imagens</span>
            <input accept="image/*" className="hidden" id={name} multiple onChange={handleImageUpload} type="file" />
          </label>
        </CardContent>
      </Card>
    </div>
  );
};
