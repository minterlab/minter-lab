import * as React from "react";
const SvgEthereum = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path
      fill="#25292E"
      fillRule="evenodd"
      d="M14 28a14 14 0 1 0 0-28 14 14 0 0 0 0 28Z"
      clipRule="evenodd"
    />
    <path
      fill="url(#ethereum_svg__a)"
      fillOpacity={0.3}
      fillRule="evenodd"
      d="M14 28a14 14 0 1 0 0-28 14 14 0 0 0 0 28Z"
      clipRule="evenodd"
    />
    <path
      fill="url(#ethereum_svg__b)"
      d="M8.19 14.77 14 18.21l5.8-3.44-5.8 8.19-5.81-8.19Z"
    />
    <path fill="#fff" d="m14 16.93-5.81-3.44L14 4.34l5.81 9.15L14 16.93Z" />
    <defs>
      <linearGradient
        id="ethereum_svg__a"
        x1={0}
        x2={14}
        y1={0}
        y2={28}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="ethereum_svg__b"
        x1={14}
        x2={14}
        y1={14.77}
        y2={22.96}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0.9} />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgEthereum;
