'use client';

import { useState, ChangeEvent, FormEvent } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formData.email,
          subject: `Nytt meddelande från ${formData.name}`,
          firstName: formData.name,
          message: formData.message
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ett fel inträffade.');
      }
  
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact">
      <h1>Kontakta oss</h1>
      {success && <p>Tack för ditt meddelande! Vi har mottagit det.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Namn:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ditt namn..."
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">E-post:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-post..."
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Meddelande:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Meddelande..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Skickar..." : "Skicka"}
        </button>
      </form>
    </div>
  );
}
