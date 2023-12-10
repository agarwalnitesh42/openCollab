'use client';

import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
  hash?: string;
  href?: string;
  sectionId?: string;
  className?: string;
  linkClassName?: string;
  isActive?: boolean;
  variant?: 'nonlink' | 'link';
  type?: string;
  handleTabChange?: (tabName?: string) => void;
}

export const TabsLink = ({ children, hash, href, sectionId, className = '', linkClassName, isActive, variant = 'link', type, handleTabChange,  ...props }: Props) => {
  const [isLinkActive, setLinkActive] = useState(isActive);
  const pathname = usePathname();

  const customClassName = `inline-block rounded-full py-2 px-3 target:bg-slate-800 hover:bg-slate-800 duration-150 ${linkClassName}`;

  const handlehashUpdate = () => {
    const currentHash = window.location.hash;

    if (!currentHash) {
      if (hash === '#') {
        setLinkActive(true);
      } else {
        setLinkActive(false);
      }
    } else {
      if (currentHash === hash) {
        setLinkActive(true);
      } else {
        setLinkActive(false);
      }
    }
  };

  const handlePathUpdate = () => {
    setLinkActive(false);
    if (pathname == href) setLinkActive(true);
  };

  useEffect(() => {
    if (!href) {
      handlehashUpdate();
      window.addEventListener('hashchange', handlehashUpdate);
    } else {
      handlePathUpdate();
    }
  }, [pathname]);

  const scrollToSection = () => {
    const sectionEl = document.getElementById(sectionId as string);
    sectionEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabClick = () => {
    handleTabChange?.(hash);
  };

  return (
    <li
      className={`flex-none inline-block py-2 border-b ${
        isLinkActive ? 'border-slate-600 text-black' : ' border-transparent'
      } ${className}`}
    >
      {variant == 'link' ? (
        href ? (
          <Link href={href} className={customClassName}>
            {children}
          </Link>
        ) : (
          <a {...props} href={`${window && window.location.pathname}${hash}`} className={customClassName}>
            {children}
          </a>
        )
      ) : (
        <button onClick={type === 'componentChange' ? handleTabClick: scrollToSection} {...props} className={customClassName}>
          {children}
        </button>
      )}
    </li>
  );
};
