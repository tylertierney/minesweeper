import CSS from "csstype";

export default function FlagSVG(style: { style?: CSS.Properties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" {...style}>
      <path
        d="M309.184 31.851h27.643v457.166h-27.643z"
        style={{
          stroke: "#000",
        }}
      />
      <path
        // bx:shape="triangle 215.345 123.417 279.495 242.05 0.5 0 1@78463abf"
        d="m355.093 123.417 139.747 242.05H215.345l139.748-242.05Z"
        style={{
          stroke: "#000",
          fill: "red",
        }}
        transform="scale(1 -1) rotate(-89.941 88.122 115.983)"
      />
    </svg>
  );
}
