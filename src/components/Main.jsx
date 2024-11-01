import React, { useEffect, useState } from 'react';
import OrchidsPresentation from './OrchidsPresentation';

export default function Main() {
  const [api, setAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = 'https://670ddcdb073307b4ee44b093.mockapi.io/OrchidResources';

  const fetchAPI = () => {
    fetch(baseURL + '?sortBy=id&order=asc')
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        setAPI(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <OrchidsPresentation orchidData={api} />
    </>
  );
}
