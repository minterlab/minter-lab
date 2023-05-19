import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { Button, Fade, Grow, TextField } from '@mui/material';
import { useMinterLabStore } from '../hooks';
import { useNetwork, useSigner } from 'wagmi';
import axios from 'axios';
import { chainSymbol, contract1155ABI } from '../contracts';
import { ethers } from 'ethers';

const StyledNiftyGatewayCardContainer = styled(Card)(({ theme }) => ({
    height: '415px',
    // height: '445px',
    width: '278px',
    padding: '12px',


}));

const StyledNiftyGatewayCard = styled(Card)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
}));

const StyledNiftyGatewayCardMediaContainer = styled(Card)(({ theme }) => ({
    position: 'relative',
    borderRadius: '12px 12px 0px 0px',
    overflow: 'hidden',
    textAlign: 'center',
    paddingBottom: '100%',
    height: '0px',
    transform: 'translateZ(0px)'
}));

const StyledCardMedia = styled(CardMedia)({
    display: 'initial',
    pointerEvents: 'none',
    position: 'absolute',
    top: '0px',
    left: '0px',
    // width: '100%',
    // height: '100%',
    width: '254px',
    height: '254px',
    objectFit: 'cover',
    zIndex: '-1'
});

const StyledCardUpdater = styled(Box)({
    display: 'initial',
    // pointerEvents: 'none',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '254px',
    height: '254px',
    objectFit: 'cover',
    zIndex: '-1'
});

const StyledNiftyGatewayCardContentContainer = styled(Card)(({ theme }) => ({
    position: 'relative',
    // backgroundColor: 'white',
    backgroundColor: "#474d57",
    borderRadius: '0px 0px 12px 12px',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgb(252, 213, 53)',
    flex: '1 1 0%',
    padding: '12px'
}));





const StyledName = styled(Typography)(({ theme }) => ({
    margin: '0px 24px 4px 0px',
    textDecoration: 'none',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '1.5',
    fontFamily: 'MessinaSans, sans-serif'

}));


const StyledPrice = styled(Typography)(({ theme }) => ({
    margin: '0px 0px 4px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
    fontFamily: 'MessinaSans, sans-serif',
    lineHeight: '1.5'

}));

const StyledFloorePrice = styled(Typography)(({ theme }) => ({
    margin: '0px',
    textDecoration: 'none',
    // color: 'rgb(97, 97, 97)',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '1.5',
    fontFamily: 'MessinaSans, sans-serif'

}));

const StyledEditionsBox = styled(Box)(({ theme }) => ({

    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    paddingTop: '8px',
    marginTop: '8px',
    borderTop: '1px solid rgb(238, 238, 238)'
}));


const StyledEdition = styled(Box)(({ theme }) => ({

    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    minHeight: 'initial'
}));

const StyledEditionRow = styled(Box)(({ theme }) => ({

    display: 'flex',
    WebkitBoxPack: 'justify',
    justifyContent: 'space-between',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '32px'
}));

const StyledEditionRowName = styled(Typography)(({ theme }) => ({

    margin: '0px',
    textDecoration: 'none',
    // color: 'rgb(97, 97, 97)',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '1.5',
    fontFamily: 'MessinaSans, sans-serif'



}));

const StyledEditionRowValue = styled(Typography)(({ theme }) => ({


    margin: '0px',
    textDecoration: 'none',
    textAlign: 'right',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '1.5',
    fontFamily: 'MessinaSans, sans-serif'


}));

const StyledChainLogo = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '12px',
    right: '12px',

}));

const StyledInputRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    // WebkitBoxPack: 'justify',
    // justifyContent: 'space-between',
    // WebkitBoxAlign: 'center',
    // alignItems: 'center',
    // flexWrap: 'nowrap',
    // gap: '32px',
    // marginTop: '8px',
    // marginBottom: '8px'
    // height: '32px',
    margin: "12px"
}));

const NiftyGatewayCard = ({ tokenId, tokenURL, totalSupplyProp, priceProp, maxSupplyProp }) => {


    const { chain } = useNetwork()
    const [loading, setLoading] = useState(false);
    const [nftImageCid, setNftImageCid] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");


    const { data: signer, isError, isLoading } = useSigner()






    const [totalSupply, setTotalSupply] = useState(totalSupplyProp);
    const [price, setPrice] = useState(priceProp);
    const [maxSupply, setMaxSupply] = useState(maxSupplyProp);

    const contract1155Address = useMinterLabStore(state => state.contract1155Address)

    const [checked, setChecked] = React.useState(false);

    // const [inputPrice, setInputPrice] = useState(priceProp);
    // const [inputMaxSupply, setInputMaxSupply] = useState(maxSupplyProp);

    const priceRef = useRef();
    const maxSupplyRef = useRef();

    const handleChange = () => {
        setChecked((prev) => !prev);
    };




    function handleMint() {
        console.log("minting");
    }


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


    async function updateMaxSupply() {

        const maxSupply = maxSupplyRef.current.value ?? "0";
        try {

            const contract = new ethers.Contract(contract1155Address, contract1155ABI, signer);
            const contractWithSigner = contract.connect(signer)

            // console.log(account.address);

            const tx = await contractWithSigner.setMaxSupply(maxSupply, tokenId)
            const rc = await tx.wait()

            console.log(tx);
            console.log(rc);

            setMaxSupply(maxSupply)
        } catch (error) {
            console.error(error);
            // alert(error.message)

        } finally {

        }
    }

    async function updatePrice() {
        const price = priceRef.current.value ?? "0";
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

            setPrice(price)
        } catch (error) {
            console.error(error);
            // alert(error.message)

        } finally {

        }
    }

    return (
        <StyledNiftyGatewayCardContainer>
            {
                checked ?
                    (
                        <StyledNiftyGatewayCard>
                            <StyledNiftyGatewayCardMediaContainer>
                                <StyledCardUpdater>
                                    <div>
                                        <StyledInputRow>
                                            <TextField size="small" label="Price" variant="filled" inputRef={priceRef} defaultValue={price}  />
                                            <Button
                                                size="small"
                                                variant="contained" color="primary" onClick={updatePrice}>

                                                Update
                                            </Button>
                                        </StyledInputRow>

                                        <StyledInputRow>
                                            <TextField size="small" label="Max Supply" variant="filled" inputRef={maxSupplyRef} defaultValue={maxSupply}  />
                                            <Button
                                                size="small"
                                                variant="contained" color="primary" onClick={updateMaxSupply}>

                                                Update
                                            </Button>
                                        </StyledInputRow>

                                    </div>
                                </StyledCardUpdater>
                            </StyledNiftyGatewayCardMediaContainer>
                            <StyledNiftyGatewayCardContentContainer>
                                <StyledChainLogo>
                                    <img src="https://www.niftygateway.com/static/media/polygon.eac3b5bb94b5760aeb108cc4d95c9921.svg" alt="Polygon Logo" width="20" height="20" />
                                </StyledChainLogo>
                                <StyledName component="p">
                                    {name}
                                </StyledName>
                                <StyledPrice component="p">
                                    <span>${price * 250}</span>
                                    &nbsp;
                                    <StyledFloorePrice component="span">
                                        = {price} {chainSymbol[chain.id]}
                                    </StyledFloorePrice>
                                </StyledPrice>
                                <StyledEditionsBox>
                                    <StyledEdition>
                                        <StyledEditionRow>
                                            <StyledEditionRowName component="p">
                                                Editions
                                            </StyledEditionRowName>
                                            <StyledEditionRowValue component="p">
                                                {totalSupply}/{maxSupply}
                                            </StyledEditionRowValue>
                                        </StyledEditionRow>
                                        <Button
                                            sx={{
                                                height: '24px',
                                            }}
                                            fullWidth size='small' variant='contained'
                                            onClick={handleChange}
                                        >
                                            BACK
                                        </Button>
                                    </StyledEdition>
                                </StyledEditionsBox>
                            </StyledNiftyGatewayCardContentContainer>
                        </StyledNiftyGatewayCard >
                    ) : (

                        <StyledNiftyGatewayCard>
                            <StyledNiftyGatewayCardMediaContainer>
                                <StyledCardMedia component="img" height="200" image={nftImageCid} alt={name} />
                            </StyledNiftyGatewayCardMediaContainer>
                            <StyledNiftyGatewayCardContentContainer>
                                <StyledChainLogo>
                                    <img src="https://www.niftygateway.com/static/media/polygon.eac3b5bb94b5760aeb108cc4d95c9921.svg" alt="Polygon Logo" width="20" height="20" />
                                </StyledChainLogo>
                                <StyledName component="p">
                                    {name}
                                </StyledName>
                                <StyledPrice component="p">
                                    <span>${price * 250}</span>
                                    &nbsp;
                                    <StyledFloorePrice component="span">
                                        = {price} {chainSymbol[chain.id].toUpperCase()}
                                    </StyledFloorePrice>
                                </StyledPrice>
                                <StyledEditionsBox>
                                    <StyledEdition>
                                        <StyledEditionRow>
                                            <StyledEditionRowName component="p">
                                                Editions
                                            </StyledEditionRowName>
                                            <StyledEditionRowValue component="p">
                                                {totalSupply}/{maxSupply}
                                            </StyledEditionRowValue>
                                        </StyledEditionRow>
                                        <Button
                                            sx={{
                                                height: '24px',
                                            }}
                                            fullWidth size='small' variant='contained'
                                            onClick={handleChange}
                                        >
                                            EDIT
                                        </Button>
                                    </StyledEdition>
                                </StyledEditionsBox>
                            </StyledNiftyGatewayCardContentContainer>
                        </StyledNiftyGatewayCard >
                    )

            }

        </StyledNiftyGatewayCardContainer >
    );
};

// const UnmanageableCard = ({ nft }) => {
//     const { title, description, imageUrl, creator, price } = nft;




export default NiftyGatewayCard;