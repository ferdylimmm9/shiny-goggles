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
        id="mask0_21_1300"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_21_1300)">
        <path
          fill="currentColor"
          d="M10.6 13.746l-2.323-2.323a.724.724 0 00-.522-.212.707.707 0 00-.532.212.717.717 0 00-.217.527c0 .206.072.382.217.527l2.744 2.744c.181.18.392.271.633.271s.452-.09.633-.27l5.563-5.564a.724.724 0 00.213-.522.707.707 0 00-.213-.532.717.717 0 00-.527-.217.718.718 0 00-.527.217L10.6 13.746zM5.308 20.5c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 01-.525-1.283V5.308c0-.505.175-.933.525-1.283.35-.35.778-.525 1.283-.525h13.384c.505 0 .933.175 1.283.525.35.35.525.778.525 1.283v13.384c0 .505-.175.933-.525 1.283-.35.35-.778.525-1.283.525H5.308z"
        />
      </g>
    </svg>
  );
}

export default Icon;
