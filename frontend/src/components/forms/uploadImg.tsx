import { Card, CardContent } from "@/components/ui/card";
import { Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";

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
              <div key={`preview-${index}`} className="group relative h-24 w-24">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`}
                  alt="Preview"
                  width={96}
                  height={96}
                  className="h-full w-full rounded-lg object-cover"
                  style={{ objectFit: "cover" }}
                />

                <button
                  type="button"
                  onClick={() => onPreviewRemove && onPreviewRemove(index)}
                  className="absolute top-1 right-1 hidden rounded-full bg-white p-1 shadow-md transition group-hover:block hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

          {/* novas imagens */}
          {files.map((file, index) => (
            <div key={`file-${index}`} className="group relative h-24 w-24">
              <Image
                src={URL.createObjectURL(file)}
                alt="Preview"
                width={96}
                height={96}
                className="h-full w-full rounded-lg object-cover"
                unoptimized
                style={{ objectFit: "cover" }}
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 hidden rounded-full bg-white p-1 shadow-md transition group-hover:block hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <label
            htmlFor={name}
            className="hover:border-primary flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed text-sm text-gray-500"
          >
            <UploadCloud className="mb-1 h-6 w-6" />
            <span className="text-center text-xs">Adicionar imagens</span>
            <input accept="image/*" id={name} type="file" multiple onChange={handleImageUpload} className="hidden" />
          </label>
        </CardContent>
      </Card>
    </div>
  );
};
