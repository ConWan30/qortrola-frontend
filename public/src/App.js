```javascript
import React, { useState, useEffect } from 'react';

function App() {
  const [health, setHealth] = useState(null);
  const [developerData, setDeveloperData] = useState({ developer_name: '', email: '', plan: 'starter' });
  const [response, setResponse] = useState(null);
  const apiUrl = 'https://qortrola-api-production.up.railway.app';

  // Fetch health status
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/health`)
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(err => console.error('Health check failed:', err));
  }, []);

  // Handle developer registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/api/v1/developers/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(developerData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ success: false, detail: 'Registration failed: ' + err.message });
    }
  };

  // Update form input
  const handleInputChange = (e) => {
    setDeveloperData({ ...developerData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Qortrola Gaming Analytics</h1>
      
      {/* Health Status */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">API Health Status</h2>
        {health ? (
          <div>
            <p><strong>Status:</strong> {health.status}</p>
            <p><strong>Version:</strong> {health.version}</p>
            <p><strong>Timestamp:</strong> {health.timestamp}</p>
          </div>
        ) : (
          <p>Loading health status...</p>
        )}
      </div>

      {/* Developer Registration Form */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Register as a Developer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Developer Name</label>
            <input
              type="text"
              name="developer_name"
              value={developerData.developer_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={developerData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Plan</label>
            <select
              name="plan"
              value={developerData.plan}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="starter">Starter</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Register
          </button>
        </form>
        {response && (
          <div className="mt-4">
            <p><strong>Response:</strong> {response.success ? 'Success' : 'Error'}</p>
            {response.success ? (
              <p>Developer ID: {response.developer_id}, API Key: {response.api_key}</p>
            ) : (
              <p>Error: {response.detail}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```
