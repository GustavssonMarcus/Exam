"use client";

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="success">
      <div className="success-message">
        <h1>Tack för din beställning!</h1>
        <p>Din beställning har lagts och vi arbetar nu med att förbereda den för leverans.</p>
        <p>Du kommer att få en bekräftelse via e-post inom kort.</p>
      </div>
      
      <div className="success-actions">
        <Link className="success-actions-link" href="/">
          <button className="success-actions-link-btn">Tillbaka till startsidan</button>
        </Link>
        <Link className="success-actions-link" href="/sortiment">
          <button className="success-actions-link-btn">Fortsätt handla</button>
        </Link>
      </div>
    </div>
  );
}