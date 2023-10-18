// import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
  cronosTestnet,
  polygonMumbai
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura'


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    // cronosTestnet,
    polygonMumbai,
    mainnet,
    polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [infuraProvider({ apiKey: '6ab29688e72d40da8678bf44ed99f65f' }),publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// export function WagmiWrapper({ Children }) {
//   return (
//     <WagmiConfig config={wagmiConfig}>
//       <RainbowKitProvider chains={chains}>
//         <Children />
//       </RainbowKitProvider>
//     </WagmiConfig>
//   );
// }

export {wagmiConfig, chains };




// import { getDefaultWallets } from '@rainbow-me/rainbowkit'
// import { configureChains, createClient } from 'wagmi'
// import { goerli, mainnet, polygon, polygonMumbai, polygonZkEvm, polygonZkEvmTestnet, xdc, xdcTestnet } from 'wagmi/chains'
// import { publicProvider } from 'wagmi/providers/public'

// // const { chains, provider, webSocketProvider } = configureChains(
// //   [mainnet, ...(import.meta.env.MODE === 'development' ? [goerli] : [])],
// //   [
// //     publicProvider(),
// //   ],
// // )

// const patexTestnet = {
//   id: 471100,
//   name: 'Patex Sepolia Testnet',
//   network: 'Patex Sepolia Testnet',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Patex Sepolia Testnet',
//     symbol: 'ETH',
//   },
//   rpcUrls: {
//     public: { http: ['https://test-rpc.patex.io/'] },
//     default: { http: ['https://test-rpc.patex.io/'] },
//   },
// }


// const patex = {
//   id: 789,
//   name: 'Patex',
//   network: 'Patex',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Patex',
//     symbol: 'ETH',
//   },
//   rpcUrls: {
//     public: { http: ['https://rpc.patex.io/'] },
//     default: { http: ['https://rpc.patex.io/'] },
//   },
// }

// console.log(polygonMumbai)
// const MODE = 'development'

// const { chains, provider, webSocketProvider } = configureChains(
//   [
//     mainnet,
//     goerli,
//     polygon,
//     polygonMumbai,
//     polygonZkEvm,
//     polygonZkEvmTestnet,
//     xdc,
//     xdcTestnet,
//     patex,
//     patexTestnet,
//     ...(MODE === 'development' ? [goerli, polygonMumbai] : [])],
//   [
//     publicProvider(),
//   ],
// )

// // klay custom 쓸 수 있는가?
// // cosmos , eth
// // 조사해보기
// // link vault 조사 

// // 아 이름 뺏기는거
// // ENS

// const { connectors } = getDefaultWallets({
//   appName: 'My wagmi + RainbowKit App',
//   chains,
// })

// export const client = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
//   webSocketProvider,
// })

// export { chains, provider }
