import { SVGProps } from "react";

const WavesSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    {...props}
  >
    <path
      fill="var(--c-ui-01)"
      d="M0 224h40c40 0 120 0 200-21.3 80-21.7 160-63.7 240-80 80-15.7 160-5.7 240 26.6C800 181 880 235 960 240s160-37 240-42.7c80-5.3 160 26.7 200 42.7l40 16v64H0Z"
    />
  </svg>
);

export default WavesSVG;
