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
        id="mask0_24_1731"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_24_1731)">
        <path
          fill="currentColor"
          d="M12 16.75c.213 0 .391-.072.535-.216A.726.726 0 0012.75 16v-4.25a.726.726 0 00-.216-.534A.727.727 0 0012 11a.725.725 0 00-.535.216.726.726 0 00-.215.534V16c0 .212.072.39.216.534a.726.726 0 00.534.216zm0-7.462c.229 0 .42-.077.575-.232a.782.782 0 00.233-.575.782.782 0 00-.232-.576.782.782 0 00-.576-.232.781.781 0 00-.575.232.782.782 0 00-.233.576c0 .229.078.42.232.575a.781.781 0 00.576.232zm.002 12.212a9.255 9.255 0 01-3.705-.748 9.596 9.596 0 01-3.018-2.03 9.591 9.591 0 01-2.03-3.016 9.245 9.245 0 01-.749-3.704c0-1.314.25-2.55.748-3.705a9.596 9.596 0 012.03-3.017 9.591 9.591 0 013.016-2.032 9.245 9.245 0 013.704-.748c1.314 0 2.55.25 3.705.748a9.597 9.597 0 013.018 2.03 9.592 9.592 0 012.03 3.016 9.245 9.245 0 01.749 3.704c0 1.314-.25 2.55-.748 3.705a9.597 9.597 0 01-2.03 3.018 9.592 9.592 0 01-3.016 2.03 9.247 9.247 0 01-3.704.749zM12 20c2.233 0 4.125-.775 5.675-2.325C19.225 16.125 20 14.233 20 12c0-2.233-.775-4.125-2.325-5.675C16.125 4.775 14.233 4 12 4c-2.233 0-4.125.775-5.675 2.325C4.775 7.875 4 9.767 4 12c0 2.233.775 4.125 2.325 5.675C7.875 19.225 9.767 20 12 20z"
        />
      </g>
    </svg>
  );
}

export default Icon;
