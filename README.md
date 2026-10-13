# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) আজকের দাম, দামের ওঠানামা এবং বাজারভিত্তিক তুলনা এক নজরে দেখার ওয়েব অ্যাপ।

BazarDor is a Bangla grocery price tracker. It shows today's prices for 33 everyday products, how much each price went up or down, and a market-by-market comparison. Built for the Programming Hero B14-A7 assignment.

## 🔗 Links

- **Live site:** https://YOUR-APP.vercel.app
- **GitHub repo:** https://github.com/arafsarkar13/bazardor

## 🛠️ Technologies Used

- Next.js (App Router) and JavaScript
- Tailwind CSS and DaisyUI (custom green theme)
- BetterAuth (email/password, Google, GitHub)
- MongoDB Atlas
- react-hot-toast
- Deployed on Vercel

## ✨ Key Features

1. **Live price ticker:** an endless scrolling strip of all products with price and ▲/▼ change.
2. **Smart home page:** top 6 price risers, top 6 fallers, and a full grid of all 33 products, with skeleton loaders.
3. **Category pages with numeric sorting:** sort by price (low to high or high to low) that works correctly with Bengali digits.
4. **Protected product details:** login-only page with min, max and average price plus a market-wise price table.
5. **Authentication:** email/password, Google and GitHub login, with toast notifications and protected-route redirects.
6. **Profile and update name:** a profile page and a form to update the user's name.
7. **Fully responsive:** works on mobile, tablet and desktop, with a custom 404 page.

## 🚀 Run and test locally

```bash
npm install
npm run dev     # open http://localhost:3000
npm run build   # must finish with no errors
```

## 🔐 Environment variables

Create a `.env` file in the project root (never commit it):

```env
MONGODB_URI="your MongoDB Atlas connection string"
BETTER_AUTH_SECRET="a long random string"
BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your Google OAuth client id"
GOOGLE_CLIENT_SECRET="your Google OAuth client secret"
GITHUB_CLIENT_ID="your GitHub OAuth client id"
GITHUB_CLIENT_SECRET="your GitHub OAuth client secret"
```

## 📋 The 15-step commit plan

| #   | Step                                                          |
| --- | ------------------------------------------------------------- |
| 1   | Project setup: Next.js, Tailwind, DaisyUI theme, Bengali font |
| 2   | Helpers: Bengali digits, price format, Bangla date, API fetch |
| 3   | Navbar with logo, date and category chips                     |
| 4   | Infinite price ticker                                         |
| 5   | Hero section with scroll CTA                                  |
| 6   | Product card and change badge                                 |
| 7   | Home: risers and fallers                                      |
| 8   | Home: all products grid with skeleton                         |
| 9   | Category page with empty/404 state                            |
| 10  | Sort dropdown (numeric, Bengali-safe)                         |
| 11  | BetterAuth: sign up and sign in                               |
| 12  | Social login, toasts, auth-aware navbar                       |
| 13  | Protected product detail page                                 |
| 14  | Footer, global 404, responsive polish                         |
| 15  | Profile and update name, final README, deploy                 |

## 📡 Data

Prices come from the Programming Hero BazarDor API:
`https://openapi.programming-hero.com/api/bazardor`
