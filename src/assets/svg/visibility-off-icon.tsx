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
        id="mask0_21_1157"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_21_1157)">
        <path
          fill="currentColor"
          d="M19.762 21.87l-4.047-4.016a9.058 9.058 0 01-1.818.494c-.622.101-1.255.152-1.897.152-2.105 0-4.033-.56-5.784-1.68a12.296 12.296 0 01-4.162-4.428 1.74 1.74 0 01.01-1.784c.398-.663.822-1.304 1.27-1.924.45-.62.971-1.169 1.566-1.646l-2.77-2.8 1.055-1.053 17.63 17.63-1.053 1.054zM12 15.576c.222 0 .434-.013.636-.04a2.04 2.04 0 00.59-.172l-5.091-5.092c-.082.192-.138.39-.168.591-.03.202-.044.414-.044.636 0 1.135.396 2.098 1.188 2.89.791.791 1.754 1.187 2.889 1.187zm6.954.508l-3.137-3.112c.085-.238.15-.479.194-.721.044-.242.066-.493.066-.752 0-1.135-.396-2.098-1.188-2.89-.791-.791-1.754-1.187-2.889-1.187-.259 0-.51.024-.752.071a3.1 3.1 0 00-.711.233L8.035 5.235a10.217 10.217 0 011.945-.556c.66-.12 1.334-.179 2.02-.179 2.111 0 4.048.563 5.81 1.688a12.183 12.183 0 014.17 4.454 1.676 1.676 0 01.186 1.307 1.481 1.481 0 01-.17.409 13.629 13.629 0 01-1.325 2.031 9.839 9.839 0 01-1.717 1.696zm-4.27-4.235l-3.009-3c.42-.083.83-.053 1.229.09.399.144.743.368 1.033.672.296.3.51.644.64 1.034.132.39.168.791.108 1.204z"
        />
      </g>
    </svg>
  );
}

export default Icon;
