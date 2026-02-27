'use client'

import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import WalletInfo from './WalletInfo'
import NetworkSwitcher from './NetworkSwitcher'
import ConnectPrompt from './ConnectPrompt'

export default function DashboardClient() {
    const { isConnected } = useAccount()

    // Must match server render on first paint — wallet state is client-only
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])

    // Render nothing wallet-related until hydration is complete
    if (!mounted) return null

    if (!isConnected) {
        return <ConnectPrompt />
    }

    return (
        <div className="dashboard">
            <div className="dashboard-top">
                <WalletInfo />
                <NetworkSwitcher />
            </div>

            {/* Supported Networks panel */}
            <div className="card">
                <div className="card-header">
                    <span className="card-title">Supported Networks</span>
                    <span className="badge badge-info">10 chains</span>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                        gap: 10,
                    }}
                >
                    {[
                        { icon: '⟠', name: 'Ethereum', id: 1, testnet: false },
                        { icon: '⟠', name: 'Sepolia', id: 11155111, testnet: true },
                        { icon: '⬡', name: 'Polygon', id: 137, testnet: false },
                        { icon: '⬡', name: 'Mumbai', id: 80001, testnet: true },
                        { icon: '◈', name: 'BNB Chain', id: 56, testnet: false },
                        { icon: '◈', name: 'BNB Testnet', id: 97, testnet: true },
                        { icon: '◆', name: 'Arbitrum', id: 42161, testnet: false },
                        { icon: '◆', name: 'Arb Sepolia', id: 421614, testnet: true },
                        { icon: '🔴', name: 'Optimism', id: 10, testnet: false },
                        { icon: '🔴', name: 'OP Sepolia', id: 11155420, testnet: true },
                    ].map(chain => (
                        <div
                            key={chain.id}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-md)', padding: '10px 14px',
                            }}
                        >
                            <span style={{ fontSize: 20 }}>{chain.icon}</span>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: '0.83rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {chain.name}
                                </div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                    {chain.testnet
                                        ? <span style={{ color: 'var(--warning)' }}>Testnet</span>
                                        : <span style={{ color: 'var(--success)' }}>Mainnet</span>
                                    }
                                    {' · '}ID {chain.id}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}