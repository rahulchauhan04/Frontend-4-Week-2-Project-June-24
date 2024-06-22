import React, { useState } from 'react';
import PincodeForm from './components/PincodeForm';
import PincodeDetails from './components/PincodeDetails';
import Loader from './components/Loader';
import './index.css';

const App = () => {
  const [pincode, setPincode] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPincodeDetails = async (pincode) => {
    if (pincode.length !== 6) {
      setError('Pincode must be 6 digits');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const result = await response.json();
      if (result[0].Status === 'Error') {
        setError(result[0].Message);
        setData(null);
      } else {
        setData(result[0].PostOffice);
      }
    } catch (err) {
      setError('An error occurred while fetching data');
      setData(null);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <PincodeForm setPincode={setPincode} fetchPincodeDetails={fetchPincodeDetails} />
      {loading && <Loader />}
      {error && <div className="error">{error}</div>}
      {data && <PincodeDetails data={data} />}
    </div>
  );
};

export default App;