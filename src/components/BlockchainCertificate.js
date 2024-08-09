import React, { useState, useEffect } from 'react';
import { issueCertificate, getCertificate } from '../utils/blockchain';

const BlockchainCertificate = () => {
  const [courseName, setCourseName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [isIssuing, setIsIssuing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleIssueCertificate = async () => {
    setIsIssuing(true);
    try {
      await issueCertificate(courseName, recipientAddress);
      alert('Certificate issued successfully!');
      setCourseName('');
      setRecipientAddress('');
    } catch (error) {
      console.error('Error issuing certificate:', error);
      alert('Failed to issue certificate. Please try again.');
    }
    setIsIssuing(false);
  };

  const handleGetCertificate = async () => {
    setIsFetching(true);
    try {
      const cert = await getCertificate(certificateId);
      setCertificate(cert);
    } catch (error) {
      console.error('Error fetching certificate:', error);
      alert('Failed to fetch certificate. Please check the ID and try again.');
      setCertificate(null);
    }
    setIsFetching(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Blockchain Certificates</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Issue Certificate</h3>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={handleIssueCertificate}
          disabled={isIssuing}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isIssuing ? 'Issuing...' : 'Issue Certificate'}
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Get Certificate</h3>
        <input
          type="text"
          placeholder="Certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={handleGetCertificate}
          disabled={isFetching}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {isFetching ? 'Fetching...' : 'Get Certificate'}
        </button>
      </div>

      {certificate && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="text-lg font-semibold">Certificate Details:</h4>
          <p>ID: {certificate.id}</p>
          <p>Course: {certificate.courseName}</p>
          <p>Recipient: {certificate.recipient}</p>
          <p>Issue Date: {new Date(certificate.issueDate * 1000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default BlockchainCertificate;
