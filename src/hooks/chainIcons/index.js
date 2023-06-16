import { default as Arbitrum } from "./Arbitrum";
import { default as Avalanche } from "./Avalanche";
import { default as Ethereum } from "./Ethereum";
import { default as Hardhat } from "./Hardhat";
import { default as Optimism } from "./Optimism";
import { default as Polygon } from "./Polygon";
import { XDC } from "./XDC";


import {Patex} from './Patex'
// import XDCLogo from './Polygon'
// const chainMetadataByName = {
//     arbitrum: Arbitrum,
//     arbitrumRinkeby: Arbitrum,
//     avalanche: Avalanche,
//     avalancheFuji: Avalanche,
//     goerli: Ethereum,
//     hardhat: Hardhat,
//     kovan: Ethereum,
//     localhost: Ethereum,
//     mainnet: Ethereum,
//     optimism: Optimism,
//     optimismGoerli: Optimism,
//     optimismKovan: Optimism,
//     polygon: Polygon,
//     polygonMumbai: Polygon,
//     rinkeby: Ethereum,
//     ropsten: Ethereum,
//     sepolia: Ethereum,
// };


const chainMetadataByName = {
    0: Ethereum,
    1: Ethereum,
    5: Ethereum,
    137: Polygon,
    80001: Polygon,

    1101: Polygon,
    1442: Polygon,

    50: XDC,
    51: XDC,

    // 789: Patex,
    // 471100: Patex,
    789: Patex,
    471100: Patex,
}

export default chainMetadataByName;