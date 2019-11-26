import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Join from './components/Join';
import Chat from './components/Chat';

const App = () => (
    <Router>
        {/* "/" route will disappear once another route is requested */}
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
    </Router>
);

export default App;