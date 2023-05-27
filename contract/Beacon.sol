
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Beacon is Ownable {
    address internal NFTContract;

    constructor (address _NFTContract) public {
            NFTContract = _NFTContract;
    }

    function getBeacon() public view returns(address){
        return NFTContract;
    }

    function setBeacon(address _NFTContract) public onlyOwner {
        NFTContract = _NFTContract;
    }
}
