# 🛒 BazarDor (বাজার দর)

> **Today's grocery prices in Bangladesh, at a glance.**
> বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, দামের ওঠানামা এবং বাজারভিত্তিক তুলনা, সবই এক জায়গায়।

**Audience for this README:** developers, reviewers and contributors who want to understand, run or extend the project quickly.

---

## Contents

1. [Overview](#overview)
2. [Quickstart](#quickstart)
3. [What you can do with it](#what-you-can-do-with-it)
4. [Tech stack](#tech-stack)
5. [Configuration](#configuration)
6. [Using the data API](#using-the-data-api)
7. [Build history](#build-history)
8. [Contributing](#contributing)
9. [FAQ](#faq)
10. [Links](#links)

---

## Overview

BazarDor is a Bangla-first web app that tracks prices of everyday grocery items: rice, lentils, oil, vegetables, fish, meat, eggs and dairy, and spices.

It covers **33 products** and answers three simple questions:

- What does each item cost today?
- Did the price go up or down, and by how much?
- How do prices compare from market to market?

It was built for the **Programming Hero B14-A7 assignment**.

---

## Quickstart

You need Node.js, npm, and the environment variables listed under [Configuration](#configuration).

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:3000
npm run build      # production build (must finish with no errors)
```

Create your `.env` file _before_ running the app so authentication and the database can connect.

---

## What you can do with it

| Area                  | What it does                                                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Price ticker**      | An endless scrolling strip showing every product with its price and a ▲/▼ change marker.                                          |
| **Home page**         | Shows the 6 biggest price risers, the 6 biggest fallers, and a grid of all 33 products. Skeleton loaders appear while data loads. |
| **Category pages**    | Browse by category and sort by price (low to high or high to low). Sorting is numeric and works correctly with Bengali digits.    |
| **Product details**   | Login required. Shows min, max and average price plus a market-wise price table.                                                  |
| **Authentication**    | Sign in with email/password, Google or GitHub. Toast notifications and redirects for protected routes.                            |
| **Profile**           | A profile page with a form to update your name.                                                                                   |
| **Responsive design** | Works on mobile, tablet and desktop, with a custom 404 page.                                                                      |

---

## Tech stack

- **Framework:** Next.js (App Router) with JavaScript
- **Styling:** Tailwind CSS and DaisyUI (custom green theme)
- **Auth:** BetterAuth (email/password, Google, GitHub)
- **Database:** MongoDB Atlas
- **UI feedback:** react-hot-toast
- **Hosting:** Vercel

---

## Configuration

Create a `.env` file in the project root. **Never commit this file.**

```env
MONGODB_URI="your MongoDB Atlas connection string"
BETTER_AUTH_SECRET="a long random string"
BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your Google OAuth client id"
GOOGLE_CLIENT_SECRET="your Google OAuth client secret"
GITHUB_CLIENT_ID="your GitHub OAuth client id"
GITHUB_CLIENT_SECRET="your GitHub OAuth client secret"
```

| Variable                                    | Used for                                                |
| ------------------------------------------- | ------------------------------------------------------- |
| `MONGODB_URI`                               | Connecting to MongoDB Atlas                             |
| `BETTER_AUTH_SECRET`                        | Signing auth sessions (use a long random string)        |
| `BETTER_AUTH_URL`                           | Base URL of the app (use your Vercel URL in production) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google login                                            |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub login                                            |

---

## Using the data API

All prices come from the Programming Hero BazarDor API:

```
https://openapi.programming-hero.com/api/bazardor
```

Minimal example of fetching it:

```js
const res = await fetch("https://openapi.programming-hero.com/api/bazardor");
const data = await res.json();
console.log(data);
```

---

## Build history

The project was built in 15 commits, one per step:

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

---

## Contributing

1. Fork the repo and clone your fork.
2. Follow the [Quickstart](#quickstart) and set up your `.env`.
3. Create a branch for your change.
4. Run `npm run build` and confirm it finishes with no errors.
5. Open a pull request describing what you changed and why.

---

## FAQ

**Why do I need to log in to see product details?**
The product detail page (min, max, average and market-wise prices) is a protected route. Unauthenticated visitors are redirected to log in.

**Does price sorting work with Bengali numerals?**
Yes. Sorting is numeric and Bengali-safe, so prices written in Bengali digits are ordered correctly.

**Where does the price data come from?**
From the Programming Hero BazarDor API (see [Using the data API](#using-the-data-api)).

**The build fails or login doesn't work. What should I check first?**
Make sure every variable in `.env` is set, and that `BETTER_AUTH_URL` matches the URL you are running on.

---

## Links

- **Live site:** https://bazar-dor-online-price.vercel.app/
- **GitHub repo:** https://github.com/yeasinkhan08/bazar-dor-online-price
