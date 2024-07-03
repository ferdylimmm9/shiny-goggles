import React from 'react';

function Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <mask
        id="mask0_3_739"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_3_739)">
        <path
          fill="currentColor"
          d="M5.133 19.932c-.31 0-.575-.11-.798-.331A1.086 1.086 0 014 18.799c0-.309.112-.575.335-.798a1.09 1.09 0 01.798-.335H17.97c.309 0 .575.11.798.331.223.221.335.488.335.802 0 .309-.112.575-.335.798a1.09 1.09 0 01-.798.335H5.133zm.755-5.28v-1.58c0-.092.015-.179.046-.26a.64.64 0 01.152-.23l8.268-8.25A1.139 1.139 0 0115.157 4c.152.001.298.03.436.085.138.056.265.143.383.26l.907.92c.117.109.202.234.255.374.052.14.078.287.078.44 0 .14-.026.28-.079.42a1.08 1.08 0 01-.254.383l-8.249 8.25a.684.684 0 01-.49.204H6.572a.661.661 0 01-.488-.195.661.661 0 01-.195-.487zm9.13-7.514l1.072-1.071-.933-.934-1.072 1.072.934.933z"
        />
      </g>
    </svg>
  );
}

export default Icon;