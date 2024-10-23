// const express = require('express');
// const { scrapeGoogleMaps } = require('./scraper');
// const cors = require('cors')

// const app = express();
// app.use(express.json());
// app.use(cors())

// app.post('/scrape', async (req, res) => {
//   const { searchTerm, totalResults } = req.body;
//   try {
//     await scrapeGoogleMaps(searchTerm, totalResults);
//     res.json({ message: 'Scraping started!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Scraping failed', details: error });
//   }
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const express = require('express');
// const { scrapeGoogleMaps } = require('./scraper');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.post('/scrape', async (req, res) => {
//   const { searchTerm, totalResults } = req.body;
//   try {
//     // Run the scraper
//     const filename = searchTerm.replace(' ', '_');
//     await scrapeGoogleMaps(searchTerm, totalResults);

//     // Send the Excel file as a download
//     const filePath = path.join(__dirname, 'output', `google_maps_data_${filename}.xlsx`);
//     res.download(filePath, `google_maps_data_${filename}.xlsx`, (err) => {
//       if (err) {
//         console.error('Error while sending the file:', err);
//         res.status(500).json({ error: 'File download failed', details: err });
//       }
//     });
//   } catch (error) {
//     console.error('Error occurred during scraping:', error);
//     res.status(500).json({ error: 'Scraping failed', details: error });
//   }
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const express = require('express');
// const cors = require('cors');
// const { scrapeGoogleMaps } = require('./scraper');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/scrape', async (req, res) => {
//     const { query, total } = req.body;
//     try {
//         const data = await scrapeGoogleMaps(query, total);
//         res.json(data);
//     } catch (error) {
//         console.error('Scraping failed', error);
//         res.status(500).json({ error: 'Scraping failed' });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const cors = require('cors');
const { scrapeGoogleMaps } = require('./scraper');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/scrape', async (req, res) => {
    const { query, total } = req.body;
    try {
        const data = await scrapeGoogleMaps(query, total);
        
        // Generate Excel file from data
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Results');

        // Save Excel file temporarily
        const filePath = path.join(__dirname, 'output.xlsx');
        xlsx.writeFile(workbook, filePath);

        // Send file as a response
        res.download(filePath, 'google_maps_data.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Could not send file');
            }
            // Clean up by deleting the file after sending
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Scraping failed', error);
        res.status(500).json({ error: 'Scraping failed' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
