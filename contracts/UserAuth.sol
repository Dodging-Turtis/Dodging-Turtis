pragma solidity ^0.6.6;

contract UserAuth {
    mapping(string => address) authAddr;

    event Create(string login);
    event AuthChange(string login, address from, address to);

    function createAccount(string memory _login) public {
        require(bytes(_login).length <= 32);
        require(bytes(_login).length > 2);
        require(authAddr[_login] == address(0));
        authAddr[_login] = msg.sender;

        //emit Create(bytes32ToString(_login));
        emit Create(_login);
    }

    function authAddress(string memory _login) public view returns (address) {
        return authAddr[_login];
    }

    function setAuthAddress(string memory _login, address _addr) public {
        require(authAddr[_login] == msg.sender);
        emit AuthChange(_login, authAddr[_login], _addr);
        authAddr[_login] = _addr;
    }
}
