import { useEffect, useState } from "react";
import { useNetwork } from 'wagmi'
import contractData from '../Contract.json';

const addressObj = {
    1: "0x4B5B8129cB97c39162651dB461F72999725eFb05",
    5: "0x084a02a82DC08722320de1abd838d8dF4B8FffE6",
    137: "0x42db91f38aB59e383F0B0F50602e7664b3ceA5b8",
    80001: contractData.gachaAddressMumbai,
}

const tmp1155ManagerMumbai = "0x546912a0Bb6e59b81f2891ae6dae554256aE9866"

const address1155Obj = {
    1: "0x4B5B8129cB97c39162651dB461F72999725eFb05",
    5: "0x084a02a82DC08722320de1abd838d8dF4B8FffE6",
    137: "0xA8d9f480Cd171a4cC637e79F826c826C65a27986",
    80001: tmp1155ManagerMumbai,
}


// 내일 할거 , abi 도 같이 반환하자
const abiObj = {
    1: contractData.gachaEthABI,
    5: contractData.gachaEthABI,
    137: contractData.gachaPolyABI,
    80001: contractData.gachaPolyABI,
}

const tmp1155MumbaiABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "contractList",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "counter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "deleteList",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "initURI",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_maxSupply",
                "type": "uint256"
            }
        ],
        "name": "deployNFTContract",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "start",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "end",
                "type": "uint256"
            }
        ],
        "name": "getList",
        "outputs": [
            {
                "internalType": "address[1000]",
                "name": "",
                "type": "address[1000]"
            },
            {
                "internalType": "address[1000]",
                "name": "",
                "type": "address[1000]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "ownerList",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]



const abi1155Obj = {
    1: contractData.gachaEthABI,
    5: contractData.gachaEthABI,
    137: contractData.gachaPolyABI,
    80001: tmp1155MumbaiABI,
}

// 할지 말지 고민, native currency 의 symbol로 가능할듯
// const symbolObj = {

// name obj 도 만들어야할듯 , 이름 반환해주는

// wallet 없는 초기 유저를 위해서
const fakeNetwork = {
    chain: {
        id: 0,
        name: "NoWallet",
        network: "NoWallet",
        nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18
        },
        rpcUrls: [
            "https://mainnet.infura.io/v3/5aa3ed9b3bc440fa88ea12eaa4456161"
        ],
        blockExplorerUrls: [
            "https://etherscan.io"
        ]
    }
}

export function useManagerContractInfo() {
    let network = useNetwork()
    // console.log(network);
    if (network.chain === undefined) {
        network = fakeNetwork

    }

    // const [address, setAddress] = useState(addressObj?.[network.name])
    const [managerAddress, setManagerAddress] = useState(addressObj[network?.chain.id])
    const [managerAbi, setManagerAbi] = useState(abiObj[network.chain.id])

    const [manager1155AddressByChainId, setmanager1155AddressByChainId] = useState(address1155Obj[network?.chain.id])
    const [manager1155Abi, setManager1155Abi] = useState(abi1155Obj[network.chain.id])

    // symbol 이랑 testnet 인지도
    const [chainSymbol, setChainSymbol] = useState(network.chain.nativeCurrency.symbol)
    const [isTestnet, setIsTestnet] = useState(network.chain.testnet ?? false)

    const [chainId, setChainId] = useState(network.chain.id)

    useEffect(() => {
        console.log(`network changed to ${network.chain.network} (id : ${network.chain.id}) (testnet : ${network.chain.testnet})`);
        setManagerAddress(addressObj[network.chain.id])
        setManagerAbi(abiObj[network.chain.id])
        
        setmanager1155AddressByChainId(addressObj[network.chain.id])
        setManager1155Abi(abiObj[network.chain.id])

        setChainSymbol(network.chain.nativeCurrency.symbol)
        setIsTestnet(network.chain.testnet ?? false)

        setChainId(network.chain.id)

    }, [network.chain.id]);

    return { managerAddress, managerAbi, chainSymbol, isTestnet, chainId };
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