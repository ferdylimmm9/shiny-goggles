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
        id="mask0_3_710"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_3_710)">
        <path
          fill="currentColor"
          d="M11.25 21.292v-8.861L3.5 7.95v7.842a1.77 1.77 0 00.904 1.562l6.846 3.938zm1.5 0l6.846-3.938a1.781 1.781 0 00.904-1.562V7.95l-7.75 4.48v8.862zm3.821-12.798l3.114-1.802-6.781-3.898a1.782 1.782 0 00-1.808 0L8.9 4.054l7.671 4.44zM12 11.14l3.071-1.768-7.675-4.446L4.31 6.698l7.69 4.44z"
        />
      </g>
    </svg>
  );
}

export default Icon;
