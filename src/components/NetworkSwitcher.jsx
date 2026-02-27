'use client'

import { useAccount, useSwitchChain, useChainId } from 'wagmi'
import { useState } from 'react'

const CHAIN_META = {
    1: { icon: '⟠', label: 'Ethereum', short: 'ETH', testnet: false },
    11155111: { icon: '⟠', label: 'Sepolia', short: 'SEP', testnet: true },
    137: { icon: '⬡', label: 'Polygon', short: 'POL', testnet: false },
    80001: { icon: '⬡', label: 'Mumbai', short: 'MUM', testnet: true },
    56: { icon: '◈', label: 'BNB Chain', short: 'BNB', testnet: false },
    97: { icon: '◈', label: 'BNB Testnet', short: 'tBNB', testnet: true },
    42161: { icon: '◆', label: 'Arbitrum', short: 'ARB', testnet: false },
    421614: { icon: '◆', label: 'Arb Sepolia', short: 'tARB', testnet: true },
    10: { icon: '🔴', label: 'Optimism', short: 'OP', testnet: false },
    11155420: { icon: '🔴', label: 'OP Sepolia', short: 'tOP', testnet: true },
}

export default function NetworkSwitcher({ compact = false }) {
    const { isConnected } = useAccount()
    const chainId = useChainId()
    const { chains, switchChain, isPending, error } = useSwitchChain()
    const [open, setOpen] = useState(false)

    if (!isConnected) return null

    const current = CHAIN_META[chainId] || { icon: '?', label: `Chain ${chainId}`, short: '??' }

    if (compact) {
        return (
            <div style={{ position: 'relative' }}>
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setOpen(o => !o)}
                    style={{ gap: 6 }}
                >
                    <span>{current.icon}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{current.short}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>▾</span>
                </button>

                {open && (
                    <>
                        <div
                            style={{ position: 'fixed', inset: 0, zIndex: 140 }}
                            onClick={() => setOpen(false)}
                        />
                        <div
                            style={{
                                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                                background: 'var(--bg-card)', border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-md)', padding: 8, zIndex: 150,
                                width: 220, boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                            }}
                        >
                            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', padding: '4px 8px 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                Switch Network
                            </p>
                            {chains.map(chain => {
                                const meta = CHAIN_META[chain.id] || { icon: '?', label: chain.name, testnet: false }
                                const isActive = chain.id === chainId
                                return (
                                    <button
                                        key={chain.id}
                                        onClick={() => { switchChain({ chainId: chain.id }); setOpen(false) }}
                                        disabled={isPending || isActive}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                                            padding: '8px 10px', border: 'none', borderRadius: 8, cursor: 'pointer',
                                            background: isActive ? 'var(--accent-glow)' : 'transparent',
                                            color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                                            fontSize: '0.835rem', fontWeight: isActive ? 600 : 400,
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        <span>{meta.icon}</span>
                                        <span style={{ flex: 1 }}>{meta.label}</span>
                                        {meta.testnet && (
                                            <span style={{ fontSize: '0.65rem', background: 'var(--warning-bg)', color: 'var(--warning)', padding: '1px 5px', borderRadius: 4 }}>
                                                TEST
                                            </span>
                                        )}
                                        {isActive && <span style={{ fontSize: 10 }}>✓</span>}
                                    </button>
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
        )
    }

    // Full card view
    return (
        <div className="card">
            <div className="card-header">
                <span className="card-title">Network</span>
                <span className="badge badge-success">
                    <span className="dot pulse" />
                    {current.label}
                </span>
            </div>

            <div className="network-grid">
                {chains.map(chain => {
                    const meta = CHAIN_META[chain.id] || { icon: '?', label: chain.name, testnet: false }
                    const isActive = chain.id === chainId
                    return (
                        <button
                            key={chain.id}
                            className={`network-card${isActive ? ' active' : ''}`}
                            onClick={() => switchChain({ chainId: chain.id })}
                            disabled={isPending || isActive}
                        >
                            <span className="network-card-icon">{meta.icon}</span>
                            <div className="network-card-info">
                                <div className="network-card-name">{meta.label}</div>
                                <div className="network-card-id">ID: {chain.id}</div>
                            </div>
                            {meta.testnet && (
                                <span
                                    style={{
                                        fontSize: '0.62rem', background: 'var(--warning-bg)',
                                        color: 'var(--warning)', padding: '1px 5px', borderRadius: 4,
                                        fontWeight: 600, flexShrink: 0,
                                    }}
                                >
                                    TEST
                                </span>
                            )}
                            {isActive && <div className="network-active-dot" />}
                        </button>
                    )
                })}
            </div>

            {isPending && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    <span className="spinner" style={{ borderTopColor: 'var(--accent)' }} />
                    Switching network…
                </div>
            )}

            {error && (
                <div className="error-box" style={{ marginTop: 12 }}>
                    <span>⚠</span>
                    <span>{error.shortMessage || error.message}</span>
                </div>
            )}
        </div>
    )
}