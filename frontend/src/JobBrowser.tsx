import React, { useState } from 'react';
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

interface JobSearchResponse {
  status: string;
  message: string;
  job_count?: number;
}

const JobBrowser: React.FC = () => {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [maxApplications, setMaxApplications] = useState(5);
  const [searchStatus, setSearchStatus] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/search-jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com', // TODO: Get from auth context
          keywords,
          location,
          max_applications: maxApplications
        }),
      });

      const data: JobSearchResponse = await response.json();
      setSearchStatus(data.message);
    } catch (error) {
      setSearchStatus('Error starting job search. Please try again.');
      console.error('Job search error:', error);
    }
  };

  const handleMaxApplicationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 20) {
      setMaxApplications(value);
    } else if (e.target.value === '') {
      setMaxApplications(5); // Reset to default if empty
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Job Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="keywords" className="block text-sm font-medium mb-1">
                Keywords
              </label>
              <Input
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">
                Location
              </label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Remote, New York"
              />
            </div>
            <div>
              <label htmlFor="maxApplications" className="block text-sm font-medium mb-1">
                Maximum Applications
              </label>
              <Input
                id="maxApplications"
                type="number"
                value={maxApplications}
                onChange={handleMaxApplicationsChange}
                min={1}
                max={20}
                defaultValue={5}
              />
            </div>
            <Button onClick={handleSearch} className="w-full">
              Start Job Search
            </Button>
            {searchStatus && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                {searchStatus}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobBrowser;
