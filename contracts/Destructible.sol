pragma solidity >=0.4.25 <0.6.0;


import "./Ownable.sol";

contract Destructible is Ownable {
    
    constructor() public payable { }
    
    function destroy() onlyOwner public {
        selfdestruct(owner);
    }

    function destroyAndSend(address payable _recipient) onlyOwner public {
        selfdestruct(_recipient);
    }
}
