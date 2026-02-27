'use client'

import { useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import WalletModal from './WalletModal'

export default function ConnectWallet() {
    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const [open, setOpen] = useState(false)

    return (
        <div>

            <div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
            </div>

            {isConnected ? (
                <>
                    <div className="wallet">{address}</div>
                    <button onClick={disconnect}>Disconnect</button>
                </>
            ) : (
                <button onClick={() => setOpen(true)}>Connect Wallet</button>
            )}

            {open && <WalletModal close={() => setOpen(false)} />}
        </div>
    )
}