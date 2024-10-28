import * as React from 'react';

const FullScreenLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        className="animate-spin"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM50 83.6364C69.3272 83.6364 83.6364 69.3272 83.6364 50C83.6364 30.6728 69.3272 16.3636 50 16.3636C30.6728 16.3636 16.3636 30.6728 16.3636 50C16.3636 69.3272 30.6728 83.6364 50 83.6364Z"
          fill="url(#paint0_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="10"
            y1="25"
            x2="100"
            y2="78"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#450DBD" />
            <stop offset="0.85383" stopColor="#DA12AE" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default FullScreenLoader;
