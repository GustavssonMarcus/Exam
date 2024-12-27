import React from 'react';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-content-top'>
          <div className='footer-content-top-visit'>
            <h4>Besök oss</h4>
            <p>Drottinggatan 1</p>
            <p>111 51 Stockholm</p>
          </div>
          <div className='footer-content-top-contact'>
            <h4>Kontakta oss</h4>
            <p>08-123 456 78</p>
            <p>info@sportspace.se</p>
          </div>
        </div>
        <div className='footer-content-middle'>
          <ul>
            <li>Google</li>
            <li>Instagram</li>
            <li>Facebook</li>
          </ul>
        </div>
        <div className='footer-content-bottom'>
          <p>&copy; {new Date().getFullYear()} Sport Space</p>
        </div>
      </div>
      <div className='footer-title'>
        <h1>Sport Space</h1>
      </div>
    </footer>
  );
};

export default Footer;