import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <ul className="space-y-4">
        <li>
          <Link href="/" className="block px-4 py-2 rounded hover:bg-gray-700">
            Startsidan
          </Link>
        </li>
        <li>
          <Link href="/products" className="block px-4 py-2 rounded hover:bg-gray-700">
            Products
          </Link>
        </li>
        <li>
          <Link href="/checkout" className="block px-4 py-2 rounded hover:bg-gray-700">
            Kassa
          </Link>
        </li>
      </ul>
      <h1 className="text-lg font-bold">My Header</h1>
    </header>
  );
};

export default Header;