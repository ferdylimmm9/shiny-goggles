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
        id="mask0_3_784"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_3_784)">
        <path
          fill="currentColor"
          d="M5.25 20h13.5c.212 0 .39.072.534.216a.726.726 0 01.216.534c0 .213-.072.391-.216.535a.726.726 0 01-.534.215H5.25a.726.726 0 01-.534-.216.727.727 0 01-.216-.534c0-.213.072-.391.216-.535A.726.726 0 015.25 20zm6.74-2.962a.919.919 0 01-.395-.09.869.869 0 01-.328-.271l-4.469-5.821a.86.86 0 01-.088-.957c.165-.336.435-.505.811-.505h1.796v-5.99c0-.256.087-.47.26-.644a.875.875 0 01.644-.26h3.548c.256 0 .47.087.644.26.173.173.26.388.26.644v5.99h1.796c.376 0 .646.169.812.505a.86.86 0 01-.089.957l-4.479 5.82c-.09.121-.2.212-.327.272a.918.918 0 01-.396.09z"
        />
      </g>
    </svg>
  );
}

export default Icon;
