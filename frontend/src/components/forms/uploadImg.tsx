import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface UploadImgProps {
  name: string;
  label?: string;
}
export const UploadImg = ({ name, label }: UploadImgProps) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <label className="mb-1.5 text-xs" htmlFor={name}>
        {label}
      </label>
      <Card className="flex h-[300px] items-center justify-center">
        <CardContent className="flex h-full w-full flex-col items-center justify-center gap-2">
          {image ? (
            <img alt="Preview" className="h-full w-full rounded-lg object-contain" src={URL.createObjectURL(image)} />
          ) : (
            <label
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-gray-500 text-sm hover:border-primary"
              htmlFor={name}
            >
              <UploadCloud className="mb-2 h-10 w-10" />
              <span>
                Arraste e solte ou <span className="font-semibold text-primary underline">clique aqui</span> para fazer
                upload
              </span>
              <input accept="image/*" className="hidden" id={name} onChange={handleImageUpload} type="file" />
            </label>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
