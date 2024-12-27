import React from 'react';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-content-top'>
          <div className='footer-content-top-visit'>
            <p>Besök oss</p>
          </div>
          <div className='footer-content-top-contact'>
            <p>Kontakta oss</p>
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