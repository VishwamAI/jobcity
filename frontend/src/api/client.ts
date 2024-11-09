const API_BASE_URL = 'https://automated-job-app-wlchk72t.devinapps.com';

export async function healthCheck() {
  const response = await fetch(`${API_BASE_URL}/health`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Health check failed: ${response.statusText}`);
  }

  return response.json();
}

export async function getJobs() {
  const response = await fetch(`${API_BASE_URL}/api/jobs/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.statusText}`);
  }

  return response.json();
}

export async function getIdentityStatus() {
  const response = await fetch(`${API_BASE_URL}/api/identity/status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch identity status: ${response.statusText}`);
  }

  return response.json();
}
