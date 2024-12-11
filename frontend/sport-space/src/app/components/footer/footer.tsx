import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4">
      <p>&copy; {new Date().getFullYear()} My Application. All rights reserved.</p>
    </footer>
  );
};

export default Footer;