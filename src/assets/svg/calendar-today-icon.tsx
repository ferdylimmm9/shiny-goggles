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
        id="mask0_21_1090"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_21_1090)">
        <path
          fill="currentColor"
          d="M5.308 21.5c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 01-.525-1.283V6.308c0-.505.175-.933.525-1.283.35-.35.778-.525 1.283-.525h1.384V3.154c0-.22.074-.402.22-.55a.745.745 0 01.55-.22c.219 0 .402.074.549.22.146.148.22.33.22.55V4.5h7.577V3.135c0-.213.071-.391.215-.535a.726.726 0 01.535-.215c.212 0 .39.071.534.215a.726.726 0 01.216.535V4.5h1.384c.505 0 .933.175 1.283.525.35.35.525.778.525 1.283v13.384c0 .505-.175.933-.525 1.283-.35.35-.778.525-1.283.525H5.308zm0-1.5h13.384a.294.294 0 00.212-.096.294.294 0 00.096-.212v-9.384H5v9.384c0 .077.032.148.096.212a.294.294 0 00.212.096z"
        />
      </g>
    </svg>
  );
}

export default Icon;
