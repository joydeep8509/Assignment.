const http = require('http');
const url = require('url');

// Mock case law database
const caseLawDatabase = [
  {
    id: 1,
    name: "State of Punjab v. Ajaib Singh",
    citation: "AIR 1953 SC 10",
    keywords: ["bail", "criminal", "detention"]
  },
  {
    id: 2,
    name: "Arnesh Kumar v. State of Bihar",
    citation: "(2014) 8 SCC 273",
    keywords: ["arrest", "bail", "fir", "guidelines"]
  },
  {
    id: 3,
    name: "Lalita Kumari v. Government of Uttar Pradesh",
    citation: "(2014) 2 SCC 1",
    keywords: ["fir", "mandatory", "registration", "police"]
  },
  {
    id: 4,
    name: "D.K. Basu v. State of West Bengal",
    citation: "(1997) 1 SCC 416",
    keywords: ["custody", "arrest", "rights", "police"]
  },
  {
    id: 5,
    name: "Sanjay Chandra v. CBI",
    citation: "(2012) 1 SCC 40",
    keywords: ["bail", "economic", "offences"]
  },
  {
    id: 6,
    name: "Joginder Kumar v. State of UP",
    citation: "(1994) 4 SCC 260",
    keywords: ["arrest", "custody", "personal", "liberty"]
  },
  {
    id: 7,
    name: "State of Maharashtra v. Rajendra Jawanmal Gandhi",
    citation: "(1997) 8 SCC 386",
    keywords: ["fir", "investigation", "cognizable"]
  }
];

// Search function
function searchCaseLaw(keyword) {
  if (!keyword) {
    return [];
  }
  
  const lowerKeyword = keyword.toLowerCase();
  return caseLawDatabase.filter(caseItem => 
    caseItem.keywords.some(kw => kw.includes(lowerKeyword)) ||
    caseItem.name.toLowerCase().includes(lowerKeyword)
  );
}

// Create server
const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  
  if (parsedUrl.pathname === '/api/search' && req.method === 'GET') {
    const keyword = parsedUrl.query.keyword;
    const results = searchCaseLaw(keyword);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      count: results.length,
      data: results
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Route not found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});