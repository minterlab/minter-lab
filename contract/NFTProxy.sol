
pragma solidity ^0.8.0;

import "./CustomProxy.sol";
import "./Beacon.sol";



contract NFTProxy is CustomProxy {
    // // bool private _paused;
    // uint256 IDs = 0;
    // mapping (uint256 => uint256) public price;
    // mapping (uint256 => uint256) public maxSupply;
    // mapping (uint256 => uint256) public totalSupply;
    // mapping (uint256 => string) public tokenURL;

    // // Mapping from token ID to account balances
    // mapping(uint256 => mapping(address => uint256)) private _balances;

    // // Mapping from account to operator approvals
    // mapping(address => mapping(address => bool)) private _operatorApprovals;

    // // Used as the URI for all token types by relying on ID substitution, e.g. https://token-cdn-domain/{id}.json
    // string private _uri;

    // constructor ( 
    //     string memory initURI,
    //     uint256 _price,
    //     uint256 _maxSupply,
    //     address _beaconAddress
    // )
    //     public {
    //         price[IDs] = _price;
    //         maxSupply[IDs] = _maxSupply;
    //         tokenURL[IDs] = initURI;
    //         StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = _beaconAddress;
    // }
}