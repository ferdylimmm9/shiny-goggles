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
        id="mask0_64_2112"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_64_2112)">
        <path
          fill="currentColor"
          d="M5.25 18.885a.726.726 0 01-.534-.216.726.726 0 01-.216-.535c0-.212.072-.39.216-.534a.726.726 0 01.534-.215h1.058V9.923c0-1.345.415-2.534 1.245-3.567a5.518 5.518 0 013.197-1.983V3.75c0-.347.121-.642.364-.885S11.652 2.5 12 2.5s.642.122.886.365c.243.243.365.538.365.885v.623a5.518 5.518 0 013.197 1.983c.83 1.033 1.245 2.222 1.245 3.567v7.462h1.058c.212 0 .39.072.534.215a.726.726 0 01.216.535c0 .213-.072.39-.216.534a.726.726 0 01-.534.216H5.25zm6.748 2.807c-.497 0-.923-.177-1.276-.53a1.743 1.743 0 01-.53-1.277h3.616c0 .498-.178.924-.532 1.277-.354.354-.78.53-1.278.53z"
        />
      </g>
    </svg>
  );
}

export default Icon;
