import React from 'react'
import { Router} from 'react-router-dom'


import Header from './Header'
import history from '../history'
import LoggedIn from '../IsLoggedIn'
interface AppProps {

}




const App: React.FC<AppProps> = () => {
        return (
        <div className="ui container">
            
            <Router history={history}>
            <Header />
            
            <LoggedIn />
            </Router>
        </div>);
}
export default App