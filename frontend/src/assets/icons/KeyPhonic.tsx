import { SVGProps } from "react";

interface KeyPhonicIconProps extends SVGProps<SVGSVGElement> {}
export const KeyPhonicIcon = (props: KeyPhonicIconProps) => {
  return (
    <svg
      fill="none"
      height="48"
      viewBox="0 0 48 48"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect fill="#F3F9FB" height="48" rx="10" width="48" />
      <line
        stroke="#008ECC"
        strokeLinecap="round"
        strokeWidth="1.5"
        x1="12.75"
        x2="37.25"
        y1="15.25"
        y2="15.25"
      />
      <line
        stroke="#008ECC"
        strokeLinecap="round"
        strokeWidth="1.5"
        x1="12.75"
        x2="30.1591"
        y1="24.25"
        y2="24.25"
      />
      <line
        stroke="#008ECC"
        strokeLinecap="round"
        strokeWidth="1.5"
        x1="12.75"
        x2="24.25"
        y1="33.25"
        y2="33.25"
      />
    </svg>
  );
};
