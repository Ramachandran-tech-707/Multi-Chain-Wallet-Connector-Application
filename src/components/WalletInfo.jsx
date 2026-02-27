'use client'

import { useAccount, useBalance, useDisconnect, useChainId } from 'wagmi'
import { useState } from 'react'

const CHAIN_META = {
    1: { label: 'Ethereum', icon: '⟠', color: '#627eea' },
    11155111: { label: 'Sepolia', icon: '⟠', color: '#627eea' },
    137: { label: 'Polygon', icon: '⬡', color: '#8247e5' },
    80001: { label: 'Mumbai', icon: '⬡', color: '#8247e5' },
    56: { label: 'BNB Chain', icon: '◈', color: '#f3ba2f' },
    97: { label: 'BNB Testnet', icon: '◈', color: '#f3ba2f' },
    42161: { label: 'Arbitrum', icon: '◆', color: '#28a0f0' },
    421614: { label: 'Arb Sepolia', icon: '◆', color: '#28a0f0' },
    10: { label: 'Optimism', icon: '🔴', color: '#ff0420' },
    11155420: { label: 'OP Sepolia', icon: '🔴', color: '#ff0420' },
}

const CONNECTOR_ICON = {
    'MetaMask': '🦊',
    'Coinbase Wallet': '🔵',
    'WalletConnect': '🔗',
}

export default function WalletInfo() {
    // ── Hooks (simplified as requested) ──────────────────────
    const { address, isConnected, connector } = useAccount()
    const { disconnect } = useDisconnect()
    const chainId = useChainId()

    const { data, isLoading } = useBalance({
        address,
        enabled: isConnected,
    })

    const [copied, setCopied] = useState(false)

    // ── Guard ─────────────────────────────────────────────────
    if (!isConnected) return <div>Connect wallet to view balance</div>

    // ── Derived values ────────────────────────────────────────
    const chain = CHAIN_META[chainId] || { label: `Chain ${chainId}`, icon: '?', color: '#6c63ff' }
    const connIcon = CONNECTOR_ICON[connector?.name] || '💼'
    const shortAddr = `${address.slice(0, 6)}…${address.slice(-4)}`
    const balFmt = data ? parseFloat(data.formatted) : null

    const copyAddress = async () => {
        try {
            await navigator.clipboard.writeText(address)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch { /* clipboard blocked */ }
    }

    return (
        <div className="card card-glow" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* ── Header row ── */}
            <div className="card-header" style={{ marginBottom: 18 }}>
                <span className="card-title">Connected Wallet</span>
                <span className="badge badge-success">
                    <span className="dot pulse" />
                    Active
                </span>
            </div>

            {/* ── Identity row ── */}
            <div
                style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)', padding: '14px 16px',
                }}
            >
                <div
                    style={{
                        width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, var(--accent), #a78bfa, #38bdf8)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 22, boxShadow: '0 0 0 3px rgba(108,99,255,0.2)',
                    }}
                >
                    {connIcon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>
                        {connector?.name || 'Wallet'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontFamily: "'SF Mono','Fira Code',monospace", fontSize: '0.9rem', fontWeight: 600 }}>
                            {shortAddr}
                        </span>
                        <button
                            className="copy-btn"
                            onClick={copyAddress}
                            title="Copy full address"
                            aria-label="Copy address"
                            style={{ fontSize: 15, padding: '2px 7px' }}
                        >
                            {copied ? '✓' : '⎘'}
                        </button>
                    </div>
                </div>

                <button
                    className="btn btn-danger btn-sm"
                    style={{ flexShrink: 0, cursor: 'pointer' }}
                    onClick={() => disconnect()}
                >
                    ⏻ Disconnect
                </button>
            </div>

            {/* ── Balance card ── */}
            <div
                style={{
                    marginTop: 14, position: 'relative', overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(108,99,255,0.12) 0%, rgba(56,189,248,0.08) 100%)',
                    border: '1px solid rgba(108,99,255,0.25)',
                    borderRadius: 'var(--radius-md)', padding: '20px 20px 16px',
                }}
            >
                {/* decorative glow blob */}
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute', right: -20, top: -20,
                        width: 120, height: 120, borderRadius: '50%', pointerEvents: 'none',
                        background: 'radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)',
                    }}
                />

                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                    Wallet Balance
                </div>

                {isLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="spinner" style={{ width: 18, height: 18, borderTopColor: 'var(--accent)' }} />
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Fetching balance…</span>
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--text-primary)' }}>
                                {balFmt !== null ? balFmt.toFixed(4) : '—'}
                            </span>
                            {data?.symbol && (
                                <span
                                    style={{
                                        fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent)',
                                        background: 'var(--accent-glow)', padding: '2px 12px',
                                        borderRadius: 100, border: '1px solid rgba(108,99,255,0.3)',
                                    }}
                                >
                                    {data.symbol}
                                </span>
                            )}
                        </div>
                        {balFmt !== null && (
                            <div style={{ marginTop: 6, fontSize: '0.77rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                                {/* full precision from data.formatted directly */}
                                Full: {data.formatted} {data.symbol}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* ── Network + Chain ID ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
                <div
                    style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)', padding: '12px 16px',
                    }}
                >
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
                        Network
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span
                            style={{
                                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                                background: chain.color, boxShadow: `0 0 6px ${chain.color}`,
                            }}
                        />
                        <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                            {chain.icon} {chain.label}
                        </span>
                    </div>
                </div>

                <div
                    style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)', padding: '12px 16px',
                    }}
                >
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
                        Chain ID
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: 'monospace', color: 'var(--accent)' }}>
                        #{chainId}
                    </div>
                </div>
            </div>

            {/* ── Full address ── */}
            <div
                style={{
                    marginTop: 10, background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
                    padding: '10px 14px',
                }}
            >
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
                    Full Address
                </div>
                <div style={{ fontSize: '0.77rem', fontFamily: 'monospace', color: 'var(--text-secondary)', wordBreak: 'break-all', lineHeight: 1.55 }}>
                    {address}
                </div>
            </div>

        </div>
    )
}