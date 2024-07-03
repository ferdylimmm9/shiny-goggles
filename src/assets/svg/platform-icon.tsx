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
        id="mask0_129_10391"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_129_10391)">
        <path
          fill="currentColor"
          d="M7 13.808c.229 0 .42-.078.575-.232A.782.782 0 007.808 13a.781.781 0 00-.233-.575.781.781 0 00-.575-.233.782.782 0 00-.575.232.781.781 0 00-.233.576c0 .229.078.42.232.575a.782.782 0 00.576.233zm0-4c.229 0 .42-.078.575-.233A.781.781 0 007.808 9a.782.782 0 00-.233-.575A.781.781 0 007 8.192a.782.782 0 00-.575.233.782.782 0 00-.233.575c0 .229.078.42.232.575A.782.782 0 007 9.808zm2.808 3.942H17c.212 0 .39-.072.534-.216A.726.726 0 0017.75 13a.725.725 0 00-.216-.535.726.726 0 00-.534-.215H9.808a.725.725 0 00-.535.216.726.726 0 00-.215.534c0 .213.072.391.215.535a.726.726 0 00.535.215zm0-4H17c.212 0 .39-.072.534-.216A.726.726 0 0017.75 9a.725.725 0 00-.216-.535A.726.726 0 0017 8.25H9.808a.725.725 0 00-.535.216.726.726 0 00-.215.534c0 .213.072.391.215.535a.726.726 0 00.535.215zm-5.5 8.75c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 01-.525-1.283V5.308c0-.505.175-.933.525-1.283.35-.35.778-.525 1.283-.525h15.384c.505 0 .933.175 1.283.525.35.35.525.778.525 1.283v11.384c0 .505-.175.933-.525 1.283-.35.35-.778.525-1.283.525H15.5v1.096c0 .256-.087.47-.26.644a.874.874 0 01-.644.26H9.404a.874.874 0 01-.644-.26.874.874 0 01-.26-.644V18.5H4.308zm0-1.5h15.384a.294.294 0 00.212-.096.294.294 0 00.096-.212V5.308a.294.294 0 00-.096-.212.294.294 0 00-.212-.096H4.308a.294.294 0 00-.212.096.294.294 0 00-.096.212v11.384c0 .077.032.148.096.212a.294.294 0 00.212.096z"
        />
      </g>
    </svg>
  );
}

export default Icon;