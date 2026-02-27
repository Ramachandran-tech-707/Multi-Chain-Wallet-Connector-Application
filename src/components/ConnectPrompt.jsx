'use client'

import { useState } from 'react'
import WalletModal from './WalletModal'

export default function ConnectPrompt() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div
                className="card"
                style={{ textAlign: 'center', padding: '52px 32px', border: '1px dashed var(--border-glow)' }}
            >
                <div
                    style={{
                        fontSize: 52, marginBottom: 20,
                        filter: 'drop-shadow(0 0 20px rgba(108,99,255,0.4))',
                    }}
                >
                    ◈
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 8 }}>
                    Connect your wallet
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 320, margin: '0 auto 24px', lineHeight: 1.65 }}>
                    Connect MetaMask, Coinbase Wallet, or any WalletConnect-compatible wallet to get started.
                </p>

                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {[
                        { icon: '🦊', name: 'MetaMask' },
                        { icon: '🔵', name: 'Coinbase' },
                        { icon: '🔗', name: 'WalletConnect' },
                    ].map(w => (
                        <div
                            key={w.name}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                                padding: '6px 12px', borderRadius: 'var(--radius-md)',
                                fontSize: '0.82rem', color: 'var(--text-secondary)',
                            }}
                        >
                            <span>{w.icon}</span> {w.name}
                        </div>
                    ))}
                </div>

                <button
                    className="btn btn-primary"
                    style={{ marginTop: 28, padding: '12px 32px', fontSize: '0.95rem' }}
                    onClick={() => setShowModal(true)}
                >
                    Connect Wallet
                </button>
            </div>

            {showModal && <WalletModal onClose={() => setShowModal(false)} />}
        </>
    )
}