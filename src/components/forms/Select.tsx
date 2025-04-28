import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as UISelect,
} from "../ui/select";

interface SelectProps {
  name: string;
  options: { label: string; value: string }[];
  label?: string;
  placeholder?: string;
  error?: string;
  onChange?: (value: string) => void;
  id?: string;
}
export const Select = ({
  label,
  error,
  options,
  onChange,
  ...props
}: SelectProps) => {
  const id = props.id || props.name;
  return (
    <div className="space-y-1">
      <label className="mb-1.5 text-xs" htmlFor={id}>
        {label}
      </label>
      <UISelect onValueChange={(value) => onChange && onChange(value)}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, label }) => (
            <SelectItem value={value}>{label}</SelectItem>
          ))}
        </SelectContent>
      </UISelect>
      <p className="pl-1 text-xs text-red-500">{error}</p>
    </div>
  );
};
