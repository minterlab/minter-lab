import React from 'react';
import { styled } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


import chainIconsMap from '../hooks/chainIcons'
import { Box, Typography } from '@mui/material';
// import { useDynamicSVGImport } from '../hooks';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useMinterLabStore } from '../hooks';

import { isChainTestnet, chainName } from "../contracts";
import { useAccount, useNetwork } from 'wagmi';

// const Logo = chainIconsMap['polygon']

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    // '& .chip': {
    //     marginRight: theme.spacing(4),
    //     marginLeft: theme.spacing(4),
    // },
    // '& > div > *': {
    //     marginRight: theme.spacing(2),
    //     // marginLeft: theme.spacing(4),
    // },

    // margin: 8,
    // '&:focus': {
    //     backgroundColor: theme.palette.primary.main,
    //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //         color: theme.palette.common.white,
    //     },
    // },
}));

const StyledBox = styled(Box)(({ theme }) => ({
    // '& .chip': {
    //     marginRight: theme.spacing(4),
    //     marginLeft: theme.spacing(4),
    // },
    '& >  *': {

        // marginLeft: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            // backgroundColor: theme.palette.primary.main,
            marginRight: theme.spacing(1),
        },
    },


    // margin: 8,
    // '&:focus': {
    //     backgroundColor: theme.palette.primary.main,
    //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //         color: theme.palette.common.white,
    //     },
    // },
}));

// const Icon = ({ name, onCompleted, onError, ...rest }) => {
//     const { error, loading, SvgIcon } = useDynamicSVGImport(name, {
//         onCompleted,
//         onError
//     });
//     if (error) {
//         return error.message;
//     }
//     if (loading) {
//         return "Loading...";
//     }
//     if (SvgIcon) {
//         //   return "what?";
//         return <SvgIcon {...rest} />;
//     }
//     return null;
// };

// 여기서 주스탄드에 있는 collection id 를 받아오게 해서 관리할 수도있음
export default function NFTSelect() {

  

    const contract1155Address = useMinterLabStore(state => state.contract1155Address)
    console.log(contract1155Address);

    const { chain } = useNetwork()
    const chainId = chain?.id ?? 0
    console.log(chainId);

    const Logo = chainIconsMap[chainId]

    const account = useAccount()



    const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));


    return (
        <FormControl
            variant="standard"
            style={{
                // margin: 8,
                // padding: 8,
                minWidth: 120,
                width: '100%',
            }} >
            <InputLabel id="nft-collection-select-label">NFT Collection</InputLabel>
            <Select
                labelId="nft-collection-select-label"
                id="nft-collection-select"
                value={0}
                // onChange={handleChange}
                label="NFT Collection"
                sx={{ maxWidth: 683 }}

            // disabled
            >
              

                <StyledMenuItem key={0} value={0} >

                    <StyledBox sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>

                        {contract1155Address === "0x0000000000000000000000000000000000000000" ?
                            <div>
                                <Typography variant="body1" display="inline">
                                    You have not created a NFT with address : {account.address} ,a collection will be created once you create your first 1155 NFT
                                </Typography>
                            </div>
                            :
                            <>

                                <Logo />
                                <Box >
                                    <Typography variant="body1" display="inline">
                                        {/* {chain.toUpperCase()} */}
                                        {chainName[chainId]}
                                    </Typography>
                                </Box>

                                <Chip className="chip" label={isChainTestnet[chainId] ? "testnet" : "mainnet"} size={"small"} variant={'outlined'} color={isChainTestnet[chainId] ? "primary" : "success"} />


                                {matches &&
                                    <Box>
                                        <Typography variant="caption" display="inline">
                                            {contract1155Address}
                                        </Typography>
                                    </Box>
                                }
                            </>
                        }

                    </StyledBox>
                </StyledMenuItem>

            </Select>
        </FormControl>
    );
}
