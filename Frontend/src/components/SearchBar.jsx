

// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ setCity, fetchWeather }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const cityList = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'San Francisco', 'Indianapolis', 'Columbus', 'Fort Worth', 'Charlotte', 'Detroit',
    'El Paso', 'Memphis', 'Boston', 'Seattle', 'Denver', 'Washington', 'Nashville',
    'Baltimore', 'Oklahoma City', 'Las Vegas', 'Louisville', 'Milwaukee', 'Albuquerque',
    'Tucson', 'Fresno', 'Sacramento', 'Kansas City', 'Mesa', 'Atlanta', 'Colorado Springs',
    'Omaha', 'Raleigh', 'Miami', 'Cleveland', 'Tulsa', 'Oakland', 'Minneapolis',
    'Wichita', 'Arlington', 'Bakersfield', 'Tampa', 'Honolulu', 'Aurora', 'Anaheim',
    'St. Louis', 'Riverside', 'Corpus Christi', 'Lexington', 'Stockton', 'Henderson',
    'Greensboro', 'Jersey City', 'Chula Vista', 'Buffalo', 'Fort Wayne', 'Durham',
    'Madison', 'Lubbock', 'Chattanooga', 'Glendale', 'North Las Vegas', 'Gilbert',
    'Scottsdale', 'Irving', 'Fargo', 'Laredo', 'Reno', 'Cincinnati', 'St. Paul',
    'Newark', 'Plano', 'Pittsburgh', 'Orlando', 'Anchorage', 'Lincoln', 'Chesapeake',
    'Norfolk', 'Winston-Salem', 'Irvine', 'Hialeah', 'Gainesville', 'Overland Park',
    'Olathe', 'Greeley', 'Des Moines', 'Salt Lake City', 'Richmond', 'Shreveport',
    'Baton Rouge', 'Madison', 'Macon', 'Augusta', 'Shreveport', 'Champaign', 'Macon',
    'Little Rock', 'Springfield', 'Grand Prairie', 'Huntington Beach', 'Cary',
    'Frisco', 'Jackson', 'Sandy Springs', 'Cedar Rapids', 'Roanoke', 'Cleveland Heights',
    'Lynchburg', 'Hickory', 'Duluth', 'Peoria', 'Asheville', 'Albany', 'Syracuse',
    'Erie', 'Scranton', 'Scranton', 'Wilkes-Barre', 'Harrisburg', 'Lancaster', 'Reading',
    'Allentown', 'Bethlehem', 'Easton', 'Lebanon', 'State College', 'York', 'Scranton',
    'Wilmington', 'Newark', 'Atlantic City', 'Trenton', 'Toms River', 'Princeton',
    'Cape May', 'Cherry Hill', 'Hackensack', 'Hoboken', 'Paterson', 'Jersey City',
    'Englewood', 'Montclair', 'North Bergen', 'Paramus', 'Ridgewood', 'Union City',
    'Westfield', 'Plainfield', 'Edison', 'Piscataway', 'Middletown', 'Sayreville',
    'South Brunswick', 'Old Bridge', 'Woodbridge', 'East Brunswick', 'Howell', 'Brick',
    'Jackson', 'Manalapan', 'Freehold', 'Wall', 'Ocean', 'Point Pleasant', 'Long Branch',
    'Red Bank', 'Marlboro', 'Burlington', 'Mount Laurel', 'Moorestown', 'Medford',
    'Cinnaminson', 'Riverside', 'Hainesport', 'Lumberton', 'Mount Holly', 'Pemberton',
    'Medford Lakes', 'Shamong', 'Tabernacle', 'Willingboro', 'Florence', 'Roebling',
    'Bordentown', 'Delran', 'Evesham', 'Chesterfield', 'Columbus', 'Wrightstown',
    'Juliustown', 'New Hanover', 'Pemberton', 'Arneytown', 'Brown Mills', 'kathmandu',];

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter suggestions based on input
    if (value) {
      const filteredSuggestions = cityList.filter((cityName) =>
        cityName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle search
  const handleSearch = () => {
    setCity(inputValue); // Set city state
    fetchWeather();      // Fetch weather data
    setSuggestions([]);  // Clear suggestions
  };

  return (
    <div className='relative w-80'>
      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search city"
          className="border rounded-l p-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white rounded-r px-4"
        >
          Search
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto rounded-md">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setInputValue(suggestion);
                setCity(suggestion);
                fetchWeather(); // Call fetchWeather when a suggestion is clicked
                setSuggestions([]);
              }}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
