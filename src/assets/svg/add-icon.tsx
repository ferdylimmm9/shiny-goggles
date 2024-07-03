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
        id="mask0_3_713"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_3_713)">
        <path
          fill="currentColor"
          d="M11.25 12.75h-5a.726.726 0 01-.534-.216A.726.726 0 015.5 12c0-.213.072-.391.216-.535a.726.726 0 01.534-.215h5v-5c0-.212.072-.39.216-.534A.726.726 0 0112 5.5c.213 0 .391.072.535.216a.726.726 0 01.215.534v5h5c.212 0 .39.072.534.216A.726.726 0 0118.5 12c0 .213-.072.391-.216.535a.726.726 0 01-.534.215h-5v5c0 .212-.072.39-.216.534A.726.726 0 0112 18.5a.725.725 0 01-.535-.216.726.726 0 01-.215-.534v-5z"
        />
      </g>
    </svg>
  );
}

export default Icon;
