function Avatar26() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
    >
      <title>Mother Frances</title>
      <mask
        id="mask__beam"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="36"
        height="36"
      >
        <rect width="36" height="36" rx="72" fill="#FFFFFF" />
      </mask>
      <g mask="url(#mask__beam)">
        <rect width="36" height="36" fill="#e9bdbd" />
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(-5 9) rotate(229 18 18) scale(1.1)"
          fill="#f0e2c9"
          rx="36"
        />
        <g transform="translate(-5 4.5) rotate(9 18 18)">
          <path d="M13,20 a1,0.75 0 0,0 10,0" fill="#000000" />
          <rect
            x="10"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="#000000"
          />
          <rect
            x="24"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="#000000"
          />
        </g>
      </g>
    </svg>
  );
}
export default Avatar26;
