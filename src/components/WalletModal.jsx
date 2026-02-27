'use client'

import { useConnect } from 'wagmi'
import { useState, useEffect } from 'react'

const CONNECTOR_META = {
    MetaMask: {
        icon: '🦊',
        cls: 'metamask',
        desc: 'Connect using browser extension',
    },
    'Coinbase Wallet': {
        icon: '🔵',
        cls: 'coinbase',
        desc: 'Connect with Coinbase Wallet',
    },
    WalletConnect: {
        icon: '🔗',
        cls: 'walletconnect',
        desc: 'Scan QR with any compatible wallet',
    },
}

export default function WalletModal({ onClose }) {
    const { connect, connectors, isPending, error } = useConnect()
    const [pendingId, setPendingId] = useState(null)

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    const handleConnect = (connector) => {
        setPendingId(connector.id)
        connect(
            { connector },
            {
                onSuccess: () => onClose(),
                onError: () => setPendingId(null),
            }
        )
    }

    return (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <div className="modal-header">
                    <div>
                        <h2 className="modal-title" id="modal-title">Connect Wallet</h2>
                        <p className="modal-subtitle">Choose your preferred wallet provider</p>
                    </div>
                    <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
                </div>

                <div className="modal-body">
                    <div className="connector-list">
                        {connectors.map((connector) => {
                            const meta = CONNECTOR_META[connector.name] || {
                                icon: '💼',
                                cls: '',
                                desc: 'Connect wallet',
                            }
                            const isLoading = isPending && pendingId === connector.id

                            return (
                                <button
                                    key={connector.id}
                                    className={`connector-btn${isLoading ? ' connecting' : ''}`}
                                    onClick={() => handleConnect(connector)}
                                    disabled={isPending}
                                >
                                    <div className={`connector-icon ${meta.cls}`}>
                                        {isLoading ? (
                                            <span className="spinner" style={{ borderTopColor: 'var(--accent)' }} />
                                        ) : (
                                            meta.icon
                                        )}
                                    </div>
                                    <div className="connector-info">
                                        <div className="connector-name">{connector.name}</div>
                                        <div className="connector-desc">
                                            {isLoading ? 'Connecting…' : meta.desc}
                                        </div>
                                    </div>
                                    <span className="connector-arrow">→</span>
                                </button>
                            )
                        })}
                    </div>

                    {error && (
                        <div className="error-box">
                            <span>⚠</span>
                            <span>{error.shortMessage || error.message}</span>
                        </div>
                    )}

                    <p
                        style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            textAlign: 'center',
                            marginTop: 20,
                            lineHeight: 1.6,
                        }}
                    >
                        By connecting, you agree to our Terms of Service.
                        <br />Your wallet is used for authentication only.
                    </p>
                </div>
            </div>
        </div>
    )
}