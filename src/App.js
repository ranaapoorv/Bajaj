import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      const data = JSON.parse(jsonInput);
      const result = await axios.post('https://app.netlify.com/sites/heartfelt-syrniki-131153/deploys', { data });
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON input or request failed.');
    }
  };

  const handleSelectChange = (options) => {
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;

    const selectedValues = {
      Alphabets: response.alphabets,
      Numbers: response.numbers,
      'Highest lowercase alphabet': response.highest_lowercase_alphabet,
    };

    return selectedOptions.map(option => (
      <div key={option.value}>
        <h3>{option.label}</h3>
        <pre>{JSON.stringify(selectedValues[option.label], null, 2)}</pre>
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>Backend Response Viewer</h1>
      <textarea
        rows="5"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <Select
            isMulti
            options={[
              { value: 'Alphabets', label: 'Alphabets' },
              { value: 'Numbers', label: 'Numbers' },
              { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
            ]}
            onChange={handleSelectChange}
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
