pragma solidity ^0.4.4;
contract storer {
address public owner;
string public log;
function storer(string _log) {
    log = _log;
    owner = msg.sender;
}
modifier onlyOwner {
        if (msg.sender != owner)
            throw;
        _;
    }
function kill() onlyOwner() { 
  selfdestruct(owner); }
}
