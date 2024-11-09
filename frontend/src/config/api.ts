export const API_BASE_URL = 'https://job-apply-agent-9xhpiu08.devinapps.com';

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  identity: {
    verify: '/identity/verify',
    status: '/identity/status',
  },
  jobs: {
    apply: '/jobs/apply',
    status: '/jobs/status',
    list: '/jobs/list',
  },
};
