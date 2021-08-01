import React from "react"
import {BrowserRouter as Router} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useRoutes} from './routes'

function App() {
  const routes = useRoutes( {isAuthenticated : false} )
  return (
    <Router>
      <div className="container">
        {routes}
      </div>
    </Router>
  );
}

export default App
