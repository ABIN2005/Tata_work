// src/App.jsx
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { AppProvider } from './Context/AppContext';
import routes from './routes/routes';

function AppRoutes() {
  const element = useRoutes(routes); // Uses the new nested route definitions
  return element;
}

function App() {
  // Use /DAMSBF/ basename for production (GitHub Pages), empty for local development
  const basename = import.meta.env.PROD ? '/DAMSBF' : '';
  
  return (
    <AppProvider>
      <Router basename={basename}>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
