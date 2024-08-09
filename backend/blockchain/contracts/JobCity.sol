// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobCity {
    string public platformName;
    address public owner;
    uint256 public totalCertificates;

    struct Certificate {
        uint256 id;
        string courseName;
        address recipient;
        uint256 issueDate;
    }

    mapping(uint256 => Certificate) public certificates;

    event CertificateIssued(uint256 indexed id, string courseName, address recipient);

    constructor(string memory _name) {
        platformName = _name;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function issueCertificate(string memory _courseName, address _recipient) public onlyOwner {
        totalCertificates++;
        certificates[totalCertificates] = Certificate(
            totalCertificates,
            _courseName,
            _recipient,
            block.timestamp
        );
        emit CertificateIssued(totalCertificates, _courseName, _recipient);
    }

    function getCertificate(uint256 _id) public view returns (Certificate memory) {
        require(_id > 0 && _id <= totalCertificates, "Invalid certificate ID");
        return certificates[_id];
    }
}