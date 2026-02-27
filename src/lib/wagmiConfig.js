import { http, createConfig } from 'wagmi'
import {
    mainnet,
    sepolia,
    polygon,
    polygonMumbai,
    bsc,
    bscTestnet,
    arbitrum,
    arbitrumSepolia,
    optimism,
    optimismSepolia,
} from 'wagmi/chains'
import { metaMask, coinbaseWallet, walletConnect } from '@wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

export const config = createConfig({
    chains: [
        mainnet,
        sepolia,
        polygon,
        polygonMumbai,
        bsc,
        bscTestnet,
        arbitrum,
        arbitrumSepolia,
        optimism,
        optimismSepolia,
    ],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [polygon.id]: http(),
        [polygonMumbai.id]: http(),
        [bsc.id]: http(),
        [bscTestnet.id]: http(),
        [arbitrum.id]: http(),
        [arbitrumSepolia.id]: http(),
        [optimism.id]: http(),
        [optimismSepolia.id]: http(),
    },
    connectors: [
        metaMask(),
        coinbaseWallet({ appName: 'Mantix' }),
        walletConnect({ projectId }),
    ],
    ssr: false,
})