import { Route, Routes, Navigate } from "react-router-dom";
import Main from './components/Main'
import Signup from "./components/signup";
import Login from "./components/Login";
import AddBookReview from "./components/Main"; // Import the component for adding book reviews

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{/* client-side rendering */}
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/add-review" exact element={<AddBookReview />} /> {/* Add the route for adding book reviews */}
			
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
