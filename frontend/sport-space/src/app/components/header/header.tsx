"use client";

import Link from 'next/link';
import React from 'react';

const Header = () => {

  return (
    <header className="header">
      <div className="header-container">
        <ul className="header-container-nav">
          {['Hem', 'Products', 'Om oss', 'Checkout'].map((text, index) => (
            <li
              key={index}
              className={`header-container-nav-item`}
            >
              <Link href={index === 0 ? '/' : `/${text.toLowerCase()}`}>{text}</Link>
            </li>
          ))}
        </ul>
      </div>
      <h1 className="header__title">Sport Space</h1>
      <div className='header-links'>
        <img src="/svg/hitta.svg" alt="Hitta oss"/>
        {['Hitta oss', 'Checkout'].map((text, index) => (
          <li
            key={index}
            className={`header-links__item`}
          >
            <Link href={index === 0 ? '/' : `/${text.toLowerCase()}`}>{text}</Link>
          </li>
        ))}
      </div>
    </header>
  );
};

export default Header;