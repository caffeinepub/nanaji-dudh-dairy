declare module "qrcode.react" {
  import type { SVGProps } from "react";

  export interface QRCodeSVGProps extends SVGProps<SVGSVGElement> {
    value: string;
    size?: number;
    level?: "L" | "M" | "Q" | "H";
    includeMargin?: boolean;
    fgColor?: string;
    bgColor?: string;
  }

  export function QRCodeSVG(props: QRCodeSVGProps): JSX.Element;
}
