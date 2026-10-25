# SplitEase

**Your group expense calculator.** Add the people in your group, log what
everyone spends, and instantly see the total and each person's equal share.
Great for roommates, trips, dinners, and group gifts.

All amounts are in Pakistani Rupees (PKR).

## Features

- **Manage members**: add and remove people in your group
- **Log expenses**: record a description, an amount, and who paid
- **Live summary cards**: total spent, number of expenses, number of members,
  and the equal share per person, updated instantly
- **Input validation**: names (letters, spaces, apostrophes, hyphens; up to 30
  characters) and expenses (description up to 50 characters, amount greater
  than 0, payer required) are checked, with friendly error messages
- **Persistent data**: everything is saved in your browser's `localStorage`,
  so your group is still there when you come back
- **Responsive design**: works on desktop and mobile

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/) (vanilla, no framework)
- [Vite](https://vite.dev/) for dev server and bundling
- [Tailwind CSS](https://tailwindcss.com/) v4 for styling
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code quality

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- npm

### Installation

```bash
git clone https://github.com/zenabadnan10-ops/Expense-Splitter.git
cd Expense-Splitter
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL shown in your terminal (usually http://localhost:5173).

## Available Scripts

| Command                | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Start the development server         |
| `npm run build`        | Type-check and build for production  |
| `npm run preview`      | Preview the production build locally |
| `npm run lint`         | Run ESLint                           |
| `npm run format`       | Format the code with Prettier        |
| `npm run format:check` | Check formatting without changing it |

## How It Works

1. **Add members** using the Members panel.
2. **Add an expense**: enter a description and amount, then pick who paid.
3. **Check the summary**: the cards at the top show the total spent and the
   equal share per person.
4. Remove any member or expense with the ✕ button. Changes save automatically.

## Project Structure

```
Expense-Splitter/
├── src/
│   ├── main.ts        # App logic: state, rendering, validation, storage
│   └── style.css      # Tailwind entry and theme
├── index.html         # App markup
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
└── eslint.config.mjs  # ESLint configuration
```

Made by [@zenabadnan10-ops](https://github.com/zenabadnan10-ops)