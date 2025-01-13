Sport Space

1. Översikt
Frontend: Next/TypeScript
Backend: Node.js och MongoDB
2. Beroenden
Backend:
"body-parser": "^1.20.2",
"cors": "^2.8.5",
"dotenv": "^16.4.7",
"express": "^4.21.2",
"mongodb": "6.11",
"mongoose": "^8.8.4",
"nodemon": "^3.1.7",
"stripe": "^17.5.0"
Frontend:
"@stripe/stripe-js": "^5.4.0",
"axios": "^1.7.9",
"dotenv": "^16.4.7",
"next": "15.1.0",
"react": "^19.0.0",
"react-dom": "^19.0.0",
"resend": "^4.0.1",
"sass": "^1.82.0"
3. Krav
I backend
.env: MONGO_URL="" PORT="" STRIPE_SECRET_KEY=""
I frontend
.env: NEXT_PUBLIC_RESEND_API_KEY="" NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
4. Installation
Klona repot.
Installera beroenden i både backend och frontend med npm install.
Skapa en .env-fil i backend med dina API-nycklar och databaskoppling.
5. Starta projektet:
I backend-mappen
npm start
I frontend-mappen
npm run dev