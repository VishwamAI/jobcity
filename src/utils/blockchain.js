const { ethers } = require('ethers');

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contractABI = [
  "function issueCertificate(string memory _courseName, address _recipient) public",
  "function getCertificate(uint256 _id) public view returns (tuple(uint256 id, string courseName, address recipient, uint256 issueDate))",
  "function totalCertificates() public view returns (uint256)"
];

let provider;
let signer;
let contract;

const initializeBlockchain = async (nodeUrl = 'http://localhost:8545') => {
  try {
    provider = new ethers.JsonRpcProvider(nodeUrl);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log('Blockchain initialized successfully');
  } catch (error) {
    console.error('Failed to initialize blockchain:', error);
  }
};

const issueCertificate = async (courseName, recipientAddress) => {
  if (!contract) {
    throw new Error('Blockchain not initialized');
  }
  try {
    const tx = await contract.issueCertificate(courseName, recipientAddress);
    await tx.wait();
    console.log('Certificate issued successfully');
    return true;
  } catch (error) {
    console.error('Error issuing certificate:', error);
    return false;
  }
};

const getCertificate = async (id) => {
  if (!contract) {
    throw new Error('Blockchain not initialized');
  }
  try {
    const certificate = await contract.getCertificate(id);
    return {
      id: certificate[0],
      courseName: certificate[1],
      recipient: certificate[2],
      issueDate: new Date(Number(certificate[3]) * 1000).toLocaleString()
    };
  } catch (error) {
    console.error('Error getting certificate:', error);
    return null;
  }
};

const getTotalCertificates = async () => {
  if (!contract) {
    throw new Error('Blockchain not initialized');
  }
  try {
    const total = await contract.totalCertificates();
    return Number(total);
  } catch (error) {
    console.error('Error getting total certificates:', error);
    return 0;
  }
};

module.exports = {
  initializeBlockchain,
  issueCertificate,
  getCertificate,
  getTotalCertificates
};
