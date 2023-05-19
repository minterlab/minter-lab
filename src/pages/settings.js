import { Button, Switch } from "@mui/material";
import { Box } from "@mui/system";
import { getCollections, importCollections } from "../utils/db";

import { manager1155AddressByChainId, manager1155ABI } from "../contracts";
import { useAccount, useNetwork, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";

export function Settings() {

    const account = useAccount();
    const provider = useProvider()

    const { chain } = useNetwork()

    const { data: signer, isError, isLoading } = useSigner()

    function handleExport() {
        getCollections().then((collections) => {
            // console.log(collections);

            // 나중에 settings 등 추가가능
            const exportJson = {
                collections: collections
            }

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportJson));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "collections.json");
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();




        })
    }

    function handleImport(event) {
        // console.log(event.target.files);
        // console.log(event.target.files[0]);

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (evt) => {
            console.log(evt.target.result);
            const collections = JSON.parse(evt.target.result).collections;
            console.log(collections);
            importCollections(collections).then((lastKey) => {
                console.log(lastKey);
            })
        }


    }

    async function handleRecovry() {
        console.log("handleRecovry");

        try {

            // setIsLoading(true)
            // 사이너가 있어야 되네 .... 없으면 , 주소 안오네 ...

            const contract = new ethers.Contract(manager1155AddressByChainId[chain.id], manager1155ABI, provider);
            const contractWithSigner = contract.connect(signer);
            console.log(contractWithSigner);

            const tmpContract1155Address = await contractWithSigner.getMyContractAddress(0, 100)

            console.log(tmpContract1155Address);

            // const contract = new ethers.Contract(manager1155AddressByChainId, manager1155ABI, signer);
            // console.log("contract", contract);

            // const tx = await contract.getMyContractAddress(0, 100)

            // console.log(tx);




        } catch (error) {
            console.error(error);
            // alert(error.message)
            alert("connect Wallet first")

        } finally {
            // setIsLoading(false)
        }
    }

    return (
        <div>
            <h1>Settings</h1>
            <h2>Back up Collections</h2>
            <Box>
                <Button onClick={handleExport} variant="outlined" color="primary" size="large" sx={{ m: 1 }}>
                    Export
                </Button>
                <Button component="label" variant="outlined" color="primary" size="large" sx={{ m: 1 }}>
                    Import
                    <input onChange={handleImport} type="file" id="file" accept=".json" hidden />
                </Button>
            </Box>

            <h2>Enable Testnet</h2>
            <div>
                whether to enable testnet
            </div>
            <Box>
                <Switch defaultChecked />
            </Box>
            <Box>
                <h2>Recovery</h2>
                <Button variant="outlined" onClick={handleRecovry} >Get Collections I created</Button>
            </Box>

        </div>
    )
}