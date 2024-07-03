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
        id="mask0_3_760"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g fill="currentColor" mask="url(#mask0_3_760)">
        <path d="M9.444 14.075c0-.082.028-.153.084-.214a.284.284 0 01.22-.09h4.45c.09 0 .163.03.219.09a.309.309 0 01.083.215c0 .02-.031.091-.094.212l-2.112 2.113a.427.427 0 01-.322.14.427.427 0 01-.322-.14l-2.112-2.113a.342.342 0 01-.069-.097.27.27 0 01-.025-.116zM9.444 9.465c0 .082.028.154.084.214.055.06.128.091.22.091h4.45c.09 0 .163-.03.219-.092a.309.309 0 00.083-.214.937.937 0 00-.094-.212L12.294 7.14a.428.428 0 00-.322-.14.428.428 0 00-.322.14L9.538 9.252a.342.342 0 00-.069.098.27.27 0 00-.025.115z" />
      </g>
    </svg>
  );
}

export default Icon;
