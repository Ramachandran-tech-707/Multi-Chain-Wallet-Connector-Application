import Header from '@/components/Header'
import DashboardClient from '@/components/DashboardClient'

export default function Home() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <section className="hero">
          <div className="hero-badge">
            <span>◈</span> Web3 Wallet Dashboard
          </div>
          <h1 className="hero-title">
            Manage Your <br />
            <span className="gradient-text">Web3 Identity</span>
          </h1>
          <p className="hero-subtitle">
            Connect MetaMask, Coinbase Wallet, or WalletConnect. Switch networks instantly across Ethereum, Polygon, BNB Chain, Arbitrum, and Optimism.
          </p>
        </section>

        <DashboardClient />
      </main>

      <footer className="footer">
        Built with <a href="https://wagmi.sh" target="_blank" rel="noreferrer">wagmi</a> &amp; Next.js 15 &nbsp;·&nbsp; Wallet Connect App © {new Date().getFullYear()}
      </footer>
    </div>
  )
}