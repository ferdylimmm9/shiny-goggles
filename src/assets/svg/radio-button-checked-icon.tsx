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
        id="mask0_134_16244"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_134_16244)">
        <path
          fill="currentColor"
          d="M12 16.5c1.249 0 2.31-.438 3.187-1.313.875-.876 1.313-1.938 1.313-3.187 0-1.249-.438-2.31-1.313-3.187C14.31 7.938 13.248 7.5 12 7.5c-1.249 0-2.31.438-3.187 1.313C7.938 9.69 7.5 10.751 7.5 12c0 1.249.438 2.31 1.313 3.187.876.875 1.938 1.313 3.187 1.313zm.002 5a9.255 9.255 0 01-3.705-.748 9.596 9.596 0 01-3.018-2.03 9.591 9.591 0 01-2.03-3.016 9.245 9.245 0 01-.749-3.704c0-1.314.25-2.55.748-3.705a9.597 9.597 0 012.03-3.017 9.592 9.592 0 013.016-2.032 9.245 9.245 0 013.704-.748c1.314 0 2.55.25 3.705.748a9.597 9.597 0 013.018 2.03 9.592 9.592 0 012.03 3.016 9.245 9.245 0 01.749 3.704c0 1.314-.25 2.55-.748 3.705a9.597 9.597 0 01-2.03 3.018 9.59 9.59 0 01-3.016 2.03 9.245 9.245 0 01-3.704.749zM12 20c2.233 0 4.125-.775 5.675-2.325C19.225 16.125 20 14.233 20 12c0-2.233-.775-4.125-2.325-5.675C16.125 4.775 14.233 4 12 4c-2.233 0-4.125.775-5.675 2.325C4.775 7.875 4 9.767 4 12c0 2.233.775 4.125 2.325 5.675C7.875 19.225 9.767 20 12 20z"
        />
      </g>
    </svg>
  );
}

export default Icon;
