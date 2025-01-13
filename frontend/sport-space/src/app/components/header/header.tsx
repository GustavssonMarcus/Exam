"use client";

import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import React, { useState } from 'react';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Hamburger menu button */}
        <button className="hamburger" onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation menu */}
        <ul className={`header-container-nav ${menuOpen ? 'open' : ''}`}>
          {['Hem', 'Sortiment', 'Kontakt'].map((text, index) => (
            <li key={index} className="header-container-nav-item">
              <Link href={index === 0 ? '/' : `/${text.toLowerCase()}`}>{text}</Link>
            </li>
          ))}
        </ul>

        {/* Title */}
        <h1 className="header__title">Sport Space</h1>

        {/* Links */}
        <ul className={`header-links ${menuOpen ? 'open' : ''}`}>
          <li className="header-links__item">
            <Link href="/favourites">
              <img src="/svg/wishlist.svg" alt="Önskelista" />
              Önskelista<span>{cartCount}</span>
            </Link>
          </li>
          <li className="header-links__item">
            <Link href="/checkout"><img src="/svg/kassa.svg" alt="Kassa"/>Kassa</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;