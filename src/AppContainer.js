import React from 'react';
import { HashRouter } from 'react-router-dom';
import BooksApp from './app.js';

class AppContainer extends React.Component {

    render() {

        return (
            <HashRouter >
                <BooksApp />>
            </HashRouter>
        )
    }
}
export default AppContainer