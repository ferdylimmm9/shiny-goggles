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
        id="mask0_3_715"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_3_715)">
        <path
          fill="currentColor"
          d="M4.5 19v-8.846a1.795 1.795 0 01.723-1.446l5.692-4.289a1.738 1.738 0 011.083-.361c.407 0 .769.12 1.087.361l5.692 4.289c.226.165.403.376.53.632.129.256.193.528.193.814V19c0 .409-.148.761-.443 1.057A1.443 1.443 0 0118 20.5h-3.192a.875.875 0 01-.644-.26.874.874 0 01-.26-.644v-4.885a.874.874 0 00-.26-.643.874.874 0 00-.644-.26h-2a.875.875 0 00-.644.26.874.874 0 00-.26.643v4.885c0 .256-.087.47-.26.644a.875.875 0 01-.644.26H6c-.409 0-.761-.148-1.057-.443A1.443 1.443 0 014.5 19z"
        />
      </g>
    </svg>
  );
}

export default Icon;
