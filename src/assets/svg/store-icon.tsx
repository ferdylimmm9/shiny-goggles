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
        id="mask0_3_722"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_3_722)">
        <path
          fill="currentColor"
          d="M4.961 4.25h14.077c.213 0 .391.072.535.216a.726.726 0 01.215.534c0 .213-.072.391-.215.535a.726.726 0 01-.535.215H4.961a.726.726 0 01-.534-.216A.726.726 0 014.212 5c0-.213.071-.391.215-.535a.726.726 0 01.534-.215zm.193 15.5a.874.874 0 01-.644-.26.874.874 0 01-.26-.644V13.75h-.31a.872.872 0 01-.703-.334.835.835 0 01-.175-.76l1-4.693a.88.88 0 01.318-.512.887.887 0 01.57-.201h14.1c.213 0 .402.067.57.2a.88.88 0 01.318.513l1 4.693a.835.835 0 01-.176.76.872.872 0 01-.702.334h-.31V19c0 .212-.072.39-.216.534a.726.726 0 01-.534.216.725.725 0 01-.535-.216.726.726 0 01-.215-.534v-5.25h-4.5v5.096c0 .256-.087.47-.26.644a.874.874 0 01-.644.26H5.154zm.596-1.5h6.5v-4.5h-6.5v4.5z"
        />
      </g>
    </svg>
  );
}

export default Icon;
