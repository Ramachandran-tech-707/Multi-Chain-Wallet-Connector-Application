'use client'

import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { useState, useEffect } from 'react'
import WalletModal from './WalletModal'
import NetworkSwitcher from './NetworkSwitcher'

export default function Header() {

    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: balance } = useBalance({ address })
    const [showModal, setShowModal] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    // Prevent SSR/client mismatch — wallet state is only known after mount
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])

    const short = address
        ? `${address.slice(0, 6)}…${address.slice(-4)}`
        : ''

    return (
        <>
            <header className="header">
                <div className="header-inner">
                    <a className="header-logo" href="/">
                        <div className="logo-icon">◈</div>
                        <span className="logo-text">Wallet<span> Connection App</span></span>
                    </a>

                    <div className="header-right">
                        {/* Render a stable placeholder until hydration is complete */}
                        {!mounted ? (
                            <button className="btn btn-primary" disabled style={{ opacity: 0.6 }}>
                                Connect Wallet
                            </button>
                        ) : isConnected ? (
                            <>
                                <NetworkSwitcher compact />

                                <div style={{ position: 'relative' }}>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowMenu(m => !m)}
                                    >
                                        <div
                                            style={{
                                                width: 20, height: 20, borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #6c63ff, #38bdf8)',
                                                flexShrink: 0,
                                            }}
                                        />
                                        {short}
                                        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>▾</span>
                                    </button>

                                    {showMenu && (
                                        <div
                                            style={{
                                                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                                                background: 'var(--bg-card)', border: '1px solid var(--border)',
                                                borderRadius: 'var(--radius-md)', padding: '8px',
                                                minWidth: 200, zIndex: 150,
                                                boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                                            }}
                                        >
                                            {balance && (
                                                <div
                                                    style={{
                                                        padding: '8px 12px 10px',
                                                        fontSize: '0.8rem',
                                                        color: 'var(--text-secondary)',
                                                        borderBottom: '1px solid var(--border)',
                                                        marginBottom: 6,
                                                    }}
                                                >
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block', marginBottom: 2 }}>Balance</span>
                                                    <strong style={{ color: 'var(--text-primary)' }}>
                                                        {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                                                    </strong>
                                                </div>
                                            )}
                                            <button
                                                className="btn btn-danger"
                                                style={{ width: '100%', cursor: 'pointer' }}
                                                onClick={() => { disconnect(); setShowMenu(false) }}
                                            >
                                                ⏻ Disconnect
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                                Connect Wallet
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* zIndex 50 — below sticky header's stacking context (z-index: 100)
                so the dropdown at 150 inside the header stays clickable        */}
            {showMenu && (
                <div
                    style={{ position: 'fixed', inset: 0, zIndex: 50 }}
                    onClick={() => setShowMenu(false)}
                />
            )}

            {showModal && <WalletModal onClose={() => setShowModal(false)} />}
        </>
    )
}