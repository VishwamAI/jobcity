'use client';

import { useState, useEffect } from 'react';
import { healthCheck, getJobs, getIdentityStatus } from '../api/client';

export default function TestIntegration() {
  const [health, setHealth] = useState<string>('');
  const [jobs, setJobs] = useState<string>('');
  const [identity, setIdentity] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const testIntegration = async () => {
      try {
        // Test health check
        const healthData = await healthCheck();
        setHealth(JSON.stringify(healthData, null, 2));

        // Test jobs API
        const jobsData = await getJobs();
        setJobs(JSON.stringify(jobsData, null, 2));

        // Test identity API
        const identityData = await getIdentityStatus();
        setIdentity(JSON.stringify(identityData, null, 2));

        setError('');
      } catch (err) {
        console.error('Integration test error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    testIntegration();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">JobCity Integration Test</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Health Check</h2>
          <pre className="bg-gray-100 p-4 rounded">{health}</pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Jobs API</h2>
          <pre className="bg-gray-100 p-4 rounded">{jobs}</pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Identity API</h2>
          <pre className="bg-gray-100 p-4 rounded">{identity}</pre>
        </div>

        {error && (
          <div>
            <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}
