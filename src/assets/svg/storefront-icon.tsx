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
        id="mask0_3_717"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_3_717)">
        <path
          fill="currentColor"
          d="M5.073 20.75c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 01-.525-1.283v-7.988a3.031 3.031 0 01-.906-1.288c-.202-.527-.206-1.097-.013-1.708l1.012-3.304c.133-.42.36-.76.679-1.017.319-.258.7-.387 1.144-.387h13.65c.443 0 .822.123 1.136.37.314.245.543.584.687 1.015l1.03 3.323c.194.611.19 1.179-.012 1.703a3.274 3.274 0 01-.907 1.312v7.97c0 .504-.175.932-.525 1.282-.35.35-.777.525-1.282.525H5.073zm9.142-10.5c.546 0 .957-.167 1.232-.5.275-.335.388-.694.338-1.077l-.608-3.923h-2.412V8.7c0 .42.143.784.427 1.09.285.307.626.46 1.023.46zm-4.5 0c.46 0 .834-.153 1.12-.46.287-.306.43-.67.43-1.09V4.75H8.854l-.608 3.962c-.054.355.058.7.335 1.035.277.335.655.503 1.134.503zm-4.45 0c.37 0 .69-.13.956-.387a1.69 1.69 0 00.494-.975l.589-4.138H5.18a.423.423 0 00-.26.072.43.43 0 00-.144.216l-.962 3.254c-.132.43-.07.863.187 1.301.256.438.677.657 1.263.657zm13.5 0c.541 0 .956-.213 1.243-.637.287-.425.356-.866.207-1.32l-1.011-3.274a.377.377 0 00-.144-.207.472.472 0 00-.26-.062h-2.073l.588 4.138c.063.392.228.716.495.975.266.258.585.387.955.387z"
        />
      </g>
    </svg>
  );
}

export default Icon;
