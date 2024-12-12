import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <h1 className="text-lg font-bold">Min E-handel</h1>
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
    </header>
  );
};

export default Header;