# Mantix — Web3 Wallet Dashboard

A professional Next.js 15 + wagmi v2 wallet integration app with MetaMask, Coinbase Wallet, and WalletConnect support across 10 EVM chains.

---

## 📸 Screenshots

### Home — Connect Screen
![Home Screen](assets/screenshots/home.png)

### Dashboard — Connected Wallet
![Dashboard](assets/screenshots/dashboard.png)

---

## ✅ Tech Stack

| Package | Version | Role |
|---|---|---|
| `next` | 15.1.0 | App framework (App Router) |
| `wagmi` | ^2.14.1 | Wallet hooks + config |
| `viem` | ^2.21.54 | Low-level EVM utils |
| `@wagmi/connectors` | ^5.7.4 | MetaMask, Coinbase, WalletConnect |
| `@tanstack/react-query` | ^5.62.7 | Async state for wagmi |

---

## 📁 Project Structure

```
wallet-connect-app/
├── app/
│   ├── globals.css          ← Custom CSS design (no Tailwind)
│   ├── layout.jsx           ← Root layout with Providers
│   ├── page.jsx             ← Home page
│   └── providers.jsx        ← WagmiProvider + QueryClientProvider
│
├── components/
│   ├── Header.jsx           ← Sticky header with connect button + menu
│   ├── WalletModal.jsx      ← Connector selection modal
│   ├── WalletInfo.jsx       ← Address, balance, chain stats
│   ├── NetworkSwitcher.jsx  ← Full grid + compact dropdown switcher
│   ├── ConnectPrompt.jsx    ← Unauthenticated landing card
│   └── DashboardClient.jsx  ← Client layout after connect
│
├── lib/
│   └── wagmiConfig.js       ← wagmi config (unchanged from your spec)
│
├── .env.local.example
├── next.config.mjs
└── package.json
```

---

## 🚀 Step-by-Step Setup

### Step 1 — Bootstrap the project

```bash
npx create-next-app@15 wallet-connect-app \
  --app \
  --no-typescript \
  --no-tailwind \
  --no-eslint \
  --src-dir=false \
  --import-alias="@/*"

cd wallet-connect-app
```

### Step 2 — Install dependencies

```bash
npm install wagmi viem @wagmi/connectors @tanstack/react-query
```

### Step 3 — Environment variable

Create `.env.local` in the project root:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:
```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

> Get a free project ID at https://cloud.walletconnect.com

### Step 4 — Replace generated files

Copy all files from this repo into your project, replacing the defaults:

```
# Overwrite or replace:
next.config.mjs
app/globals.css
app/layout.jsx
app/page.jsx
app/providers.jsx        ← new file
lib/wagmiConfig.js       ← new directory + file
components/Header.jsx    ← new directory + file
components/WalletModal.jsx
components/WalletInfo.jsx
components/NetworkSwitcher.jsx
components/ConnectPrompt.jsx
components/DashboardClient.jsx
```

### Step 5 — Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔗 Supported Chains

| Chain | Type | Chain ID |
|---|---|---|
| Ethereum | Mainnet | 1 |
| Sepolia | Testnet | 11155111 |
| Polygon | Mainnet | 137 |
| Mumbai | Testnet | 80001 |
| BNB Chain | Mainnet | 56 |
| BNB Testnet | Testnet | 97 |
| Arbitrum One | Mainnet | 42161 |
| Arbitrum Sepolia | Testnet | 421614 |
| Optimism | Mainnet | 10 |
| OP Sepolia | Testnet | 11155420 |

---

## 🔌 Supported Connectors

- **MetaMask** — Browser extension (`metaMask()`)
- **Coinbase Wallet** — Extension + mobile (`coinbaseWallet({ appName: 'Mantix' })`)
- **WalletConnect** — QR scan any compatible wallet (`walletConnect({ projectId })`)

---

## ⚙️ next.config.mjs Explanation

```js
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },    // no ESLint errors blocking builds
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
}
```

The webpack fallback is required because wagmi/viem use Node.js built-ins that don't exist in browser bundles.

---

## 📝 Important Notes

1. **`ssr: false`** in wagmiConfig.js — this is intentional. wagmi v2 with App Router needs this to avoid hydration mismatches.

2. **No `'use client'` on layout.jsx** — `Providers` is already marked `'use client'`, so the layout can stay a Server Component.

3. **WalletConnect requires a project ID** — Without it, the WalletConnect connector will throw. MetaMask and Coinbase work without it.

4. **polygonMumbai deprecation** — Mumbai is deprecated in favor of Amoy (80002). Replace if needed:
   ```js
   // In wagmiConfig.js, swap:
   import { polygonAmoy } from 'wagmi/chains'
   // replace polygonMumbai references with polygonAmoy
   ```

---

## 🏗️ Build for Production

```bash
npm run build
npm start
```