# Case Law Search Application

A simple case law search application with React frontend and Node.js backend.

## Project Structure

```
case-law-search/
├── backend/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── App.js
    │   └── App.css
    ├── public/
    │   └── index.html
    └── package.json
```

## Setup Instructions

### Backend Setup

1. Create a `backend` folder and add `server.js`

2. Navigate to the backend folder:
```bash
cd backend
```

3. Initialize npm (if needed):
```bash
npm init -y
```

4. Start the backend server:
```bash
node server.js
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Create React app in a `frontend` folder:
```bash
npx create-react-app frontend
```

2. Navigate to the frontend folder:
```bash
cd frontend
```

3. Replace `src/App.js` with the provided App.js code

4. Replace `src/App.css` with the provided App.css code

5. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Make sure both backend (port 3001) and frontend (port 3000) are running
2. Open your browser to `http://localhost:3000`
3. Enter a keyword like "bail", "FIR", or "custody"
4. Click "Search" to see matching case laws

## API Endpoint

**GET** `/api/search?keyword={keyword}`

Response:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Case Name",
      "citation": "Citation Reference"
    }
  ]
}
```

## Available Keywords

Try searching for:
- bail
- FIR
- custody
- arrest
- investigation
