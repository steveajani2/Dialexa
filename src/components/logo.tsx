import Image from 'next/image';
import * as React from 'react';

const LogoComponent: React.FC = () => {
  return (
    <header className="flex gap-3 justify-center self-center text-4xl font-semibold whitespace-nowrap text-slate-800">
      <Image
        loading="lazy"
        src="/assets/icon-logo.svg"
        alt="Dialexa.ai logo"
        width={55}
        height={55}
        className="shrink-0 aspect-square"
      />
      <div>Dialexa.ai</div>
    </header>
  );
};

export default LogoComponent;
