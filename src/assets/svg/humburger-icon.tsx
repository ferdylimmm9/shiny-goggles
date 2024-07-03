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
        id="mask0_45_5212"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_45_5212)">
        <path
          fill="currentColor"
          d="M4.75 7a.725.725 0 01-.534-.216A.726.726 0 014 6.25c0-.213.072-.391.216-.535A.726.726 0 014.75 5.5h11.5c.212 0 .39.072.534.216A.726.726 0 0117 6.25c0 .213-.072.391-.216.535A.726.726 0 0116.25 7H4.75zm0 11.5a.726.726 0 01-.534-.216A.726.726 0 014 17.75c0-.213.072-.391.216-.535A.726.726 0 014.75 17h11.5c.212 0 .39.072.534.216a.726.726 0 01.216.534c0 .213-.072.391-.216.535a.726.726 0 01-.534.215H4.75zm0-5.75a.726.726 0 01-.534-.216A.726.726 0 014 12c0-.213.072-.391.216-.535a.726.726 0 01.534-.215h15.5c.212 0 .39.072.534.216A.726.726 0 0121 12c0 .213-.072.391-.216.535a.726.726 0 01-.534.215H4.75z"
        />
      </g>
    </svg>
  );
}

export default Icon;
