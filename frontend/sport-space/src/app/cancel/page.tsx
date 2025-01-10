"use client";

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="cancel">
      <div className="cancel-message">
        <h1>Betalningen misslyckades</h1>
        <p>
          Tyvärr kunde vi inte behandla din betalning. Kontrollera dina
          betalningsuppgifter och försök igen.
        </p>
        <p>Om problemet kvarstår, kontakta vår kundtjänst för hjälp.</p>
      </div>

      <div className="cancel-actions">
        <Link className="cancel-actions-link" href="/checkout">
          <button className="cancel-actions-link-btn">Försök igen</button>
        </Link>
        <Link className="cancel-actions-link" href="/kontakt">
          <button className="cancel-actions-link-btn">Kontakta kundtjänst</button>
        </Link>
      </div>
    </div>
  );
}