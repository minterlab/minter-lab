import { useEffect, useState } from "react";
import { useNetwork } from 'wagmi'
import contractData from '../Contract.json';

// const addressObj = {
//     1: "0x4B5B8129cB97c39162651dB461F72999725eFb05",
//     5: "0x084a02a82DC08722320de1abd838d8dF4B8FffE6",
//     137: "0x42db91f38aB59e383F0B0F50602e7664b3ceA5b8",
//     80001: "0x8f09ea01538FeD5De9903c32D453ee350a475f56",
// }

// 내일 할거 , abi 도 같이 반환하자
const abiObj = {
    1: contractData.ethNFTABI,
    5: contractData.ethNFTABI,
    137: contractData.polyNFTABI,
    80001: contractData.polyNFTABI,
}

// 할지 말지 고민, native currency 의 symbol로 가능할듯
// const symbolObj = {

// name obj 도 만들어야할듯 , 이름 반환해주는

// wallet 없는 초기 유저를 위해서


export function useNFTContractInfo(id) {
    
    const [NFTAbi, setNFTAbi] = useState(abiObj[id])



    useEffect(() => {
        // console.log(`from to ${network.chain.network} (id : ${network.chain.id}) (testnet : ${network.chain.testnet})`);
        // console.log(id);
        setNFTAbi(abiObj[id])

    }, [id]);

    return { NFTAbi };
}


// export const chainMetadataByName = {
//     arbitrum: { chainId: 42_161, ...arbitrumIcon },
//     arbitrumRinkeby: { chainId: 421_611, ...arbitrumIcon },
//     avalanche: { chainId: 43_114, ...avalancheIcon },
//     avalancheFuji: { chainId: 43_113, ...avalancheIcon },
//     goerli: { chainId: 5, ...ethereumIcon },
//     hardhat: { chainId: 31_337, ...hardhatIcon },
//     kovan: { chainId: 42, ...ethereumIcon },
//     localhost: { chainId: 1_337, ...ethereumIcon },
//     mainnet: { chainId: 1, ...ethereumIcon },
//     optimism: { chainId: 10, ...optimismIcon },
//     optimismGoerli: { chainId: 420, ...optimismIcon },
//     optimismKovan: { chainId: 69, ...optimismIcon },
//     polygon: { chainId: 137, ...polygonIcon },
//     polygonMumbai: { chainId: 80_001, ...polygonIcon },
//     rinkeby: { chainId: 4, ...ethereumIcon },
//     ropsten: { chainId: 3, ...ethereumIcon },
//     sepolia: { chainId: 11_155_111, ...ethereumIcon },
//   };