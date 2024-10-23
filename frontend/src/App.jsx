// import React, { useState } from "react";
// import axios from "axios";

// const ScraperApp = () => {
//   const [keyword, setKeyword] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setResults([]);

//     try {
//       const response = await axios.post("http://localhost:3001/scrape", {
//         keyword,
//       });
//       setResults(response.data);
//     } catch (err) {
//       setError("Failed to fetch data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Google Maps Scraper</h1>
      
//       <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
//         <input
//           type="text"
//           placeholder="Enter keyword"
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`px-6 py-2 rounded-md text-white font-medium ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} transition duration-200`}
//         >
//           {loading ? "Loading..." : "Search"}
//         </button>
//       </form>

//       {error && (
//         <p className="text-red-600 mt-4">{error}</p>
//       )}

//       <div className="mt-8 w-full">
//         {results.length > 0 && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-6 py-3 border-b text-left text-gray-600">Title</th>
//                   <th className="px-6 py-3 border-b text-left text-gray-600">Link</th>
//                   <th className="px-6 py-3 border-b text-left text-gray-600">Website</th>
//                   <th className="px-6 py-3 border-b text-left text-gray-600">Rating</th>
//                   <th className="px-6 py-3 border-b text-left text-gray-600">Reviews</th>
//                   <th className="px-6 py-3 border-b text-left text-gray-600">Phone</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((result, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 border-b text-gray-800">{result.title}</td>
//                     <td className="px-6 py-4 border-b text-blue-600">
//                       <a href={result.link} target="_blank" rel="noopener noreferrer">
//                         Link
//                       </a>
//                     </td>
//                     <td className="px-6 py-4 border-b text-gray-800">{result.website}</td>
//                     <td className="px-6 py-4 border-b text-gray-800">{result.stars}</td>
//                     <td className="px-6 py-4 border-b text-gray-800">{result.reviews}</td>
//                     <td className="px-6 py-4 border-b text-gray-800">{result.phone}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ScraperApp;

// import React, { useState } from "react";
// import axios from "axios";

// const ScraperApp = () => {
//   const [keyword, setKeyword] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setResults([]);

//     try {
//       const response = await axios.post("http://localhost:3001/scrape", {
//         keyword,
//       });
//       setResults(response.data);
//     } catch (err) {
//       setError("Failed to fetch data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Google Maps Scraper</h1>
      
//       <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
//         <input
//           type="text"
//           placeholder="Enter keyword"
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`px-6 py-2 rounded-md text-white font-medium ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} transition duration-200`}
//         >
//           {loading ? "Loading..." : "Search"}
//         </button>
//       </form>

//       {error && (
//         <p className="text-red-600 mt-4">{error}</p>
//       )}

//       <div className="mt-8 w-full">
//         {results.length > 0 && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-6 py-3 border-b text-left text-gray-600">Title</th>
//                   <th className="px-6 py-3 border-b text-left text-gray-600">Link</th>
//                   <th className="px-6 py-3 border-b text-left text-gray-600">Website</th>
//                   <th className="px-6 py-3 border-b text-left text-gray-600">Rating</th>
//                   <th className="px-6 py-3 border-b text-left text-gray-600">Reviews</th>
//                   <th className="px-6 py-3 border-b text-left text-gray-600">Phone</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((result, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 border-b text-gray-800">{result.title}</td>
//                     <td className="px-6 py-4 border-b text-blue-600">
//                       <a href={result.link} target="_blank" rel="noopener noreferrer">
//                         Link
//                       </a>
//                     </td>
//                     <td className="px-6 py-4 border-b text-gray-800">{result.website}</td>
//                     <td className="px-6 py-4 border-b text-gray-800">{result.stars}</td>
//                     <td className="px-6 py-4 border-b text-gray-800">{result.reviews}</td>
//                     <td className="px-6 py-4 border-b text-gray-800">{result.phone}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ScraperApp;



// import React, { useState } from 'react';
// import axios from 'axios';

// const ScraperForm = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [totalResults, setTotalResults] = useState(100);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/scrape', { searchTerm, totalResults });
//       console.log('Scrape initiated:', response.data);
//     } catch (error) {
//       console.error('Error starting scrape:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-2xl font-bold mb-4">Google Maps Scraper</h1>
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchTerm">
//             Search Term
//           </label>
//           <input
//             type="text"
//             id="searchTerm"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Enter search term"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalResults">
//             Total Results
//           </label>
//           <input
//             type="number"
//             id="totalResults"
//             value={totalResults}
//             onChange={(e) => setTotalResults(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Enter total results to scrape"
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Start Scraping
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ScraperForm;


// import React, { useState } from 'react';
// import axios from 'axios';

// const ScraperForm = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [totalResults, setTotalResults] = useState(100);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Start scraping and receive the file as response
//       const response = await axios.post(
//         'http://localhost:3001/scrape', 
//         { searchTerm, totalResults },
//         { responseType: 'blob' } // To handle binary file
//       );

//       // Create a blob URL for the Excel file
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;

//       // Set filename for download
//       link.setAttribute('download', `google_maps_data_${searchTerm.replace(' ', '_')}.xlsx`);
//       document.body.appendChild(link);
//       link.click();

//       // Clean up
//       link.parentNode.removeChild(link);
//     } catch (error) {
//       console.error('Error starting scrape or downloading file:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-2xl font-bold mb-4">Google Maps Scraper</h1>
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchTerm">
//             Search Term
//           </label>
//           <input
//             type="text"
//             id="searchTerm"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Enter search term"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalResults">
//             Total Results
//           </label>
//           <input
//             type="number"
//             id="totalResults"
//             value={totalResults}
//             onChange={(e) => setTotalResults(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Enter total results to scrape"
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Start Scraping
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ScraperForm;



// import React, { useState } from 'react';

// const App = () => {
//   const [query, setQuery] = useState('');
//   const [total, setTotal] = useState(10);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/scrape', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query, total }),
//       });
//       const data = await response.json();
//       setResults(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-2xl font-bold mb-6 text-center">Google Maps Data Extractor</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Enter search term"
//           className="border p-2 w-full rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <input
//           type="number"
//           value={total}
//           onChange={(e) => setTotal(e.target.value)}
//           placeholder="Enter number of results"
//           className="border p-2 w-full rounded"
//         />
//       </div>
//       <button
//         onClick={handleSearch}
//         className="bg-blue-500 text-white p-2 rounded w-full"
//         disabled={loading}
//       >
//         {loading ? 'Loading...' : 'Search'}
//       </button>

//       <div className="mt-6">
//         {results.length > 0 && (
//           <table className="min-w-full bg-white border">
//             <thead>
//               <tr>
//                 <th className="py-2">Name</th>
//                 <th className="py-2">Address</th>
//                 <th className="py-2">Phone</th>
//                 <th className="py-2">Website</th>
//               </tr>
//             </thead>
//             <tbody>
//               {results.map((result, index) => (
//                 <tr key={index} className="border-t">
//                   <td className="py-2">{result.name || 'N/A'}</td>
//                   <td className="py-2">{result.address || 'N/A'}</td>
//                   <td className="py-2">{result.phone || 'N/A'}</td>
//                   <td className="py-2">{result.website || 'N/A'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { saveAs } from 'file-saver';

const App = () => {
  const [query, setQuery] = useState('');
  const [total, setTotal] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, total }),
      });

      if (response.ok) {
        const blob = await response.blob();
        saveAs(blob, 'google_maps_data.xlsx'); // Trigger file download
      } else {
        console.error('Error downloading file');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Google Maps Data Extractor</h1>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search term"
          className="border p-2 w-full rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          placeholder="Enter number of results"
          className="border p-2 w-full rounded"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded w-full"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Search & Download Excel'}
      </button>
    </div>
  );
};

export default App;


