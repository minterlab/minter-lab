pragma solidity ^0.8.0;
import './NFTProxy.sol';

contract NFTManager{
    address payable owner;  
    mapping(uint => address) public ownerList;
    mapping(uint => address) public contractList;
    uint256 public counter;
    constructor() public {
        owner = payable(address(msg.sender));
    }
    function deployNFTContract(
    ) public returns (address){
        NFTProxy minter = new NFTProxy();
        minter.initialize(0xF9ED187fC278446d352c322305F525206bDB10b5);
        ownerList[counter] = address(msg.sender);
        contractList[counter] = address(minter);
        counter++;
        NFTProxy(payable(address(minter))).transferOwnership(msg.sender);
        return address(minter);
    }
    
    function getMyContractAddress(uint256 start, uint256 end) public view returns(address){
        for(uint256 i=start;i<end;i++){
            if(ownerList[i] == msg.sender){
                return contractList[i];
            }
        }
    }

    function deleteList(uint index) public {
        require(msg.sender == owner, "you're not authorized");
        delete ownerList[index];
        delete contractList[index];
    }
    
    function getList(uint start, uint end) public view returns(address[1000] memory, address[1000] memory){
        address[1000] memory tempOwner;
        address[1000] memory tempContract;
        uint trueEnd = end;
        if(end > counter){
            trueEnd = counter;
        }
        for(uint i = start;i<trueEnd;i++){
            tempOwner[i]= ownerList[i];
            tempContract[i] = contractList[i];

        }
        return (tempOwner, tempContract);
    }
}
