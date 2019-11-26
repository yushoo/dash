import React, { Component } from 'react'
import Header from './components/layout/Header';
const feathers = require('@feathersjs/feathers');

export class App extends Component {
    render() {
        return (
            <div>
                 <Header />
            </div>
        )
    }
}

export default App
