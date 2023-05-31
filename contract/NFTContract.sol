
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTContract is ERC1155 {
    uint256 public IDs = 0;
    mapping (uint256 => uint256) public price;
    mapping (uint256 => uint256) public maxSupply;
    mapping (uint256 => uint256) public totalSupply;
    mapping (uint256 => string) public tokenURL;
    

    constructor(
        string memory initURI,
        uint256 _price,
        uint256 _maxSupply
    )
        ERC1155(initURI) public {
            price[IDs] = _price;
            maxSupply[IDs] = _maxSupply;
            tokenURL[IDs] = initURI;
    }

    function getValues(uint256 start, uint256 end) public view returns(uint256, uint256[100] memory,uint256[100] memory, uint256[100] memory, string[100] memory){
        uint256[100] memory _totalSupply;
        uint256[100] memory _price;
        string[100] memory _tokenURL;
        uint256[100] memory _maxSupply;
        for(uint256 i = start;i < end;i++){
            _totalSupply[i] = totalSupply[i];
            _price[i] = price[i];
            _tokenURL[i] = tokenURL[i];
            _maxSupply[i] = maxSupply[i];
        }
        return (IDs, _maxSupply, _totalSupply, _price, _tokenURL);

    }   
    
    function uri(uint256 _tokenid) override public view returns (string memory) {
        return string(abi.encodePacked(tokenURL[_tokenid], Strings.toString(_tokenid),".json"));
    }
    function setTokenURL(uint256 _id, string memory _tokenURL) public {
        require(_id <= IDs, "The new id is too big");
        if(_id > IDs) {IDs++;}
        tokenURL[_id] = _tokenURL;
    }
    
    function mintSingle(
        address to,
        uint256 id,
        uint256 amount) public payable{
            if(price[id] > 0){
                require(msg.value >= price[id], "Not enough price");
            }
            if(maxSupply[id] != 0){
                require(amount + totalSupply[id] <= maxSupply[id], "Cannot mint over fixed amount");
            }
            require(bytes(tokenURL[id]).length > 0, "There is no TokenURI for this id");
            totalSupply[id] += amount;
            _mint(to, id, amount, "0x00");
    }
    function getTokenURLbyIndex(uint256 _tokenId) public view returns(string memory){
        return tokenURL[_tokenId];
    }

    function totalSupplyById(uint256 _tokenId) public view returns (uint256) {
        // Counter underflow is impossible as _burnCounter cannot be incremented
        // more than `_currentIndex - _startTokenId()` times.
        return totalSupply[_tokenId];
    }
    // function pause() public {
    //     _pause();
    // }
    // function unpause() public {
    //     _unpause();
    // }
    
    function setPrice(uint256 _price, uint256 _index) external{
        price[_index] = _price;
    }

    function setMaxSupply(uint256 _maxSupply, uint256 _index) external{
        maxSupply[_index] = _maxSupply;
    }
    

    function setNewSale(uint256 _id, uint256 _price, uint256 _maxSupply, string memory _tokenURL) public{
        require(_id == IDs, "Wrong id");
        price[_id] = _price;
        maxSupply[_id] = _maxSupply;
        tokenURL[_id] = _tokenURL;
        IDs++;
    }
    
    function burnSingle(
        address from,
        uint256 _tokenId,
        uint256 amount
    ) public {
        _burn(from,_tokenId, amount);
    }
    
    // function _beforeTokenTransfer(
    //     address operator,
    //     address from,
    //     address to,
    //     uint256[] memory ids,
    //     uint256[] memory amounts,
    //     bytes memory data
    // ) internal virtual override {
    //     super._beforeTokenTransfer(msg.sender,from,to,ids,amounts,data);
    //     require(!paused(), "ERC1155: token transfer while paused");
    // }
}
