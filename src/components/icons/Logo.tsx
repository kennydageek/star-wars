interface Props {
  width: string;
  height: string;
}

const Logo = ({ width, height }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 385 167"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height={height} fill="url(#pattern0_2_1352)" />
      <defs>
        <pattern
          id="pattern0_2_1352"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use transform="matrix(0.00150092 0 0 0.00346021 -0.00130769 0)" />
        </pattern>
        <image
          id="image0_2_1352"
          width="668"
          height="289"
          preserveAspectRatio="none"
        />
      </defs>
    </svg>
  );
};

export default Logo;
