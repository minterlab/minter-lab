import * as React from "react";
const SvgArbitrum = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <rect
      width={26.6}
      height={26.6}
      x={0.7}
      y={0.7}
      fill="#2D374B"
      stroke="#96BEDC"
      strokeWidth={1.4}
      rx={13.3}
    />
    <mask
      id="arbitrum_svg__a"
      width={28}
      height={28}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <rect width={28} height={28} fill="#C4C4C4" rx={14} />
    </mask>
    <g mask="url(#arbitrum_svg__a)">
      <path
        fill="#28A0F0"
        d="m14.086 18.604 6.502 10.224 4.005-2.321-7.86-12.395-2.647 4.492Zm13.075 3.47-.004-1.86-7.306-11.408-2.309 3.918 7.091 11.43 2.172-1.259a.963.963 0 0 0 .356-.7v-.122Z"
      />
      <rect
        width={25.9}
        height={25.9}
        x={1.05}
        y={1.05}
        fill="url(#arbitrum_svg__b)"
        fillOpacity={0.3}
        stroke="#96BEDC"
        strokeWidth={2.1}
        rx={12.95}
      />
      <path
        fill="#fff"
        d="m.363 28.22-3.07-1.767-.234-.833L7.746 9.02c.73-1.192 2.32-1.576 3.796-1.555l1.732.046-12.91 20.71ZM19.166 7.512l-4.566.017L2.24 27.953l3.61 2.08.982-1.666L19.166 7.51Z"
      />
    </g>
    <defs>
      <linearGradient
        id="arbitrum_svg__b"
        x1={0}
        x2={14}
        y1={0}
        y2={28}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgArbitrum;
