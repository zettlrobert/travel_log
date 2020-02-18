const API_URL = 'http://localhost:5000'

export const listLogEntries = async () => {
  const response = await fetch(`${API_URL}/api/logs`);
  // console.log(response); 
  return response.json();
}

export const createLogEntry = async (entry) => {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(entry),
  });

  return response.json();
}