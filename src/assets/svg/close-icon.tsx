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
        id="mask0_3_716"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_3_716)">
        <path
          fill="currentColor"
          d="M12 13.063l-3.08 3.089a.71.71 0 01-.531.212.743.743 0 01-.531-.222.723.723 0 01-.218-.531c0-.21.073-.387.218-.532L10.937 12l-3.08-3.056a.732.732 0 01-.217-.536c0-.211.073-.39.218-.536a.723.723 0 01.531-.217c.21 0 .387.072.532.217L12 10.962l3.055-3.089a.726.726 0 01.531-.217c.208 0 .385.072.531.217a.74.74 0 01.233.54c0 .204-.078.379-.233.524L13.038 12l3.089 3.08a.726.726 0 01.217.531.726.726 0 01-.217.531.74.74 0 01-.54.233.691.691 0 01-.524-.233L12 13.063z"
        />
      </g>
    </svg>
  );
}

export default Icon;
