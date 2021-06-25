import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';

import AppStore from './AppStore';
import UniversityList from "./components/UniversityList";
import UniversityDetails from "./components/UniversityDetails";

function App() {
	const store = new AppStore();
	return (
		<div className="App">
			<div className="container">
				<Router>
					<Switch>
						<Route path="/" exact>
						  <UniversityList store={store}/>
						</Route>
						<Route path="/details/:universityId" exact> 
							<UniversityDetails store={store} />
						</Route>
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default App;
