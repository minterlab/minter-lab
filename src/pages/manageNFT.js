import { useEffect, useLayoutEffect, useState } from 'react';
import { useMinterLabStore } from '../hooks';
import { ethers } from 'ethers';
import { useAccount, useProvider, useSigner } from 'wagmi';
import axios from 'axios';


import { styled } from '@mui/material/styles';

import { contract1155ABI } from '../contracts'
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Skeleton,
    Switch,
    Typography,
    Grow,
    TextField,
} from '@mui/material';

import { PleaseCreateContract } from '../components/PleaseCreateContract';

import ManageableNFTCard from '../components/ManageableNFTCard';


const ListContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;


const StyledCard = styled(Card)`
// display: flex;
// flex-direction: column;
// align-items: center;
// justify-content: center;
width: 320px;
height: 464px;
// border: 1px solid #ccc;
border-radius: 10px;
&:hover {
    // border: 1px solid #DAEE01;
    box-shadow: 0px 0px 10px #DAEE01;

}
// overflow: hidden;
overflow: 'hidden';
margin: 20px;
`

export function ManageNFT() {
    const isContractCreatedWithAccount = useMinterLabStore(state => state.isContractCreatedWithAccount)

    return (
        <div>

            {
                isContractCreatedWithAccount ? <ManageNFTWhenContractExist /> : <PleaseCreateContract />
            }

        </div>
    )
}



function ManageNFTWhenContractExist() {

    const { data: signer, isError, isLoading } = useSigner()




    // const [contract1155Address, setContract1155Address] = useState(null)

    // const contract1155Address = "0xBe29265464064d382724bB4801Dd87528CbB349B"
    const contract1155Address = useMinterLabStore(state => state.contract1155Address)
    const provider = useProvider()

    const [nftInfoList, setNftInfoList] = useState([])

    useLayoutEffect(() => {
        // async function FetchAllNFTInfo() {
        //     console.log("?????????????????????")
        //     try {
        //         const contract = new ethers.Contract(contract1155Address, contract1155ABI, provider);
        //         const contractWithSigner = contract.connect(signer);
        //         // const tx1155 = await contractWithSigner.get(account.address,"0", "1")

        //         const tx1155 = await contractWithSigner.IDs();
        //         // const tx1155 = await contractWithSigner.setNewSale(0, ethers.utils.parseUnits("0.1", 18), 99,"https://bafkreiettzzj252n22wriwzj55ojjukyvuenk74gejhff5u5n6t5tggmu4.ipfs.nftstorage.link")

        //         console.log(tx1155);
        //         console.log("wth")
        //         const IDs = await tx1155.toNumber();


        //         const NFTList = []

        //         for (let i = 0; i < IDs; i++) {
        //             const totalSupply = await contractWithSigner.totalSupply(i);
        //             const maxSupply = await contractWithSigner.maxSupply(i);
        //             const price = await contractWithSigner.price(i);
        //             const tokenURL = await contractWithSigner.tokenURL(i);

        //             const NFTObj = {
        //                 id: i,
        //                 totalSupply: totalSupply.toNumber(),
        //                 maxSupply: maxSupply.toNumber(),
        //                 price: ethers.utils.formatUnits(price, 18),
        //                 tokenURL: tokenURL
        //             }

        //             NFTList.push(NFTObj)
        //         }

        //         console.log(NFTList);

        //         setNftInfoList(NFTList)
        //     } catch (error) {
        //         console.log(error)
        //     } finally {

        //     }
        // }



        async function FetchAllNFTInfo() {
            try {
                console.log("wtf ffffffffffffff")
                console.log(contract1155Address)
                const contract1155 = new ethers.Contract(`${contract1155Address}`, contract1155ABI, provider);




                const tx1155 = await contract1155.getValues(0, 100)
                console.log(tx1155)


                console.log(tx1155[0].toNumber())
                const tmpArray = []
                for (let index = 0; index < tx1155[0].toNumber(); index++) {
                    const maxSupply = tx1155[1][index];
                    const totalSupply = tx1155[2][index];
                    const price = tx1155[3][index];
                    const tokenURL = tx1155[4][index];



                    const NFTObj = {
                        id: index,
                        totalSupply: totalSupply.toNumber(),
                        maxSupply: maxSupply.toNumber(),
                        price: ethers.utils.formatUnits(price, 18),
                        tokenURL: tokenURL
                    }

                    tmpArray.push(NFTObj)
                }


                setNftInfoList(tmpArray)

            } catch (error) {
                console.error(error);
                // alert(error.message)
                alert("connect Wallet first")

            } finally {
                // setIsLoading(false)
            }
        }


        FetchAllNFTInfo()
    }, [provider, contract1155Address])


    // async function FetchAllNFTInfo() {
    //     console.log("?????????????????????")
    //     try {
    //         const contract = new ethers.Contract(contract1155Address, contract1155ABI, provider);
    //         const contractWithSigner = contract.connect(signer);
    //         // const tx1155 = await contractWithSigner.get(account.address,"0", "1")

    //         const tx1155 = await contractWithSigner.IDs();
    //         // const tx1155 = await contractWithSigner.setNewSale(0, ethers.utils.parseUnits("0.1", 18), 99,"https://bafkreiettzzj252n22wriwzj55ojjukyvuenk74gejhff5u5n6t5tggmu4.ipfs.nftstorage.link")

    //         console.log(tx1155);
    //         console.log("wth")
    //         const IDs = await tx1155.toNumber();


    //         const NFTList = []

    //         for (let i = 0; i < IDs; i++) {
    //             const totalSupply = await contractWithSigner.totalSupply(i);
    //             const maxSupply = await contractWithSigner.maxSupply(i);
    //             const price = await contractWithSigner.price(i);
    //             const tokenURL = await contractWithSigner.tokenURL(i);

    //             const NFTObj = {
    //                 id: i,
    //                 totalSupply: totalSupply.toNumber(),
    //                 maxSupply: maxSupply.toNumber(),
    //                 price: ethers.utils.formatUnits(price, 18),
    //                 tokenURL: tokenURL
    //             }

    //             NFTList.push(NFTObj)
    //         }

    //         console.log(NFTList);

    //         setNftInfoList(NFTList)
    //     } catch (error) {
    //         console.log(error)
    //     } finally {

    //     }
    // }


    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 20px",
                }}
            >
                {/* <button onClick={FetchAllNFTInfo}>
                    Refresh
                </button> */}
                <h1>Manage NFT</h1>
                <h2>{contract1155Address}</h2>


            </div>
            {contract1155Address !== null ? <NFTInfoCardList nftInfoList={nftInfoList} /> : <h1>Create Your First NFT </h1>}

        </div>


    )
}

function NFTInfoCardList({ nftInfoList }) {
    console.log(nftInfoList);

    return (
        <ListContainer >

            {nftInfoList.map(({ tokenURL, price, maxSupply, totalSupply }, index) => {
                return (
                    <ManageableNFTCard key={index} tokenId={index} tokenURL={tokenURL} priceProp={price} maxSupplyProp={maxSupply} totalSupplyProp={totalSupply} />
                )
            })}
        </ListContainer>

    )
}


// data fetch from contract.getTokenURLbyIndex(number)
function NFTInfoCard({ tokenId, tokenURL, totalSupplyProp, priceProp, maxSupplyProp }) {
    const [loading, setLoading] = useState(false);
    const [nftImageCid, setNftImageCid] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");


    const { data: signer, isError, isLoading } = useSigner()






    const [totalSupply, setTotalSupply] = useState(totalSupplyProp);
    const [price, setPrice] = useState(priceProp);
    const [maxSupply, setMaxSupply] = useState(maxSupplyProp);

    const contract1155Address = useMinterLabStore(state => state.contract1155Address)



    // console.log("NFTAbi", NFTAbi)


    useEffect(() => {
        console.log("test");

        async function fetchNFTData() {

            try {

                setLoading(true)

                axios.get(tokenURL).then((res) => {
                    console.log(res.data.image);
                    setNftImageCid(res.data.image)
                    setName(res.data.name)
                    setDescription(res.data.description)
                    setLoading(false)
                })

            } catch (error) {
                console.error(error);

            } finally {
                // setLoading(false)
            }
        }

        fetchNFTData()
    }, []);


    async function mint() {
        // try {



        //     const contract = new ethers.Contract(tmp1155ContractAddress, Mumbai1155ContractABI, signer);
        //     const contractWithSigner = contract.connect(signer)

        //     console.log(account.address);

        //     const tx = await contractWithSigner.mintSingle(account.address, 1, 1)
        //     const rc = await tx.wait()

        //     console.log(tx);
        //     console.log(rc);

        //     // console.log("1155 Contract Address : ",rc.logs[0].address);
        // } catch (error) {
        //     console.error(error);
        //     // alert(error.message)
        //     alert("connect Wallet first")

        // } finally {
        //     // setIsLoading(false)
        // }
    }

    async function updatePrice() {
        console.log("updatePrice", price);
        try {

            const contract = new ethers.Contract(contract1155Address, contract1155ABI, signer);
            const contractWithSigner = contract.connect(signer)

            // console.log(account.address);

            // const tx = await contractWithSigner.getValues(0,100)
            // console.log(tx)
            // console.log(tx[0].toNumber())

            const tx = await contractWithSigner.setPrice(ethers.utils.parseUnits(`${price}`, 18), tokenId)
            const rc = await tx.wait()

            console.log(tx);
            console.log(rc);


        } catch (error) {
            console.error(error);
            // alert(error.message)

        } finally {

        }
    }

    async function updateMaxSupply() {
        try {

            const contract = new ethers.Contract(contract1155Address, contract1155ABI, signer);
            const contractWithSigner = contract.connect(signer)

            // console.log(account.address);

            const tx = await contractWithSigner.setMaxSupply(maxSupply, tokenId)
            const rc = await tx.wait()

            console.log(tx);
            console.log(rc);


        } catch (error) {
            console.error(error);
            // alert(error.message)

        } finally {

        }
    }

    return (

        loading ? <Skeleton variant="rectangular" width={345} height={360} /> :


            <StyledCard sx={{ maxWidth: 345, height: 1040, backgroundColor: "#212121", }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="320"
                    // image={nftImageCid}
                    image={nftImageCid}
                />
                <CardContent sx={{ height: 133 }}>

                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>

                </CardContent>
                <CardContent sx={{ height: 233 }}>

                    <div>

                        <TextField id="outlined-basic" label="Price" variant="outlined" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <TextField id="outlined-basic" label="Total Supply" variant="outlined" value={totalSupply} disabled />
                        <TextField id="outlined-basic" label="Max Supply" variant="outlined" value={maxSupply} onChange={(e) => setMaxSupply(e.target.value)} />
                    </div>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={updatePrice}>Set Price</Button>
                    <Button size="small" onClick={updateMaxSupply}>Set maxSupply</Button>

                </CardActions>
            </StyledCard>




    );
}





