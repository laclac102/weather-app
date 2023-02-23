import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
	key: "04fc1bec446b257da87ae597f038c42d",
	base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
	const [searchInput, setSearchInput] = useState("");
	const [searchCity, setSearchCity] = useState("");
	const [nameInfo, setNameInfo] = useState("");
	const [countryInfo, setCountryInfo] = useState("");
	const [weatherInfo, setWeatherInfo] = useState("");
	const [tempInfo, setTempInfo] = useState("");
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);

	useEffect(() => {
		const fetchWeatherData = async () => {
			if (!searchCity) return;
			setLoading(true);
			//Process
			try {
				const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
				const response = await fetch(url);
				const data = await response.json();
				if (response.ok) {
					setNameInfo(`${data.name}`);
					setCountryInfo(`${data.sys.country}`);
					setWeatherInfo(`${data.weather[0].description}`);
					setTempInfo(`${data.main.temp} ℃`);
					setErrorMessage("");
				} else {
					setErrorMessage(data.message);
				}
			} catch (error) {
				setErrorMessage(error.message);
			}
			setLoading(false);
		};
		fetchWeatherData();
	}, [searchCity]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearchCity(searchInput);
	};
	return (
		<>
			<video autoPlay muted loop>
				<source
					src="https://skai.io/wp-content/uploads/2022/04/HomepageClouds_HEADER-1.mp4"
					type="video/mp4"
				/>
			</video>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="City"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<button>Search</button>
			</form>
			{loading ? (
				<div>Loading ...</div>
			) : (
				<>
					{errorMessage ? (
						<div style={{ color: "red" }}>{errorMessage}</div>
					) : (
						<>
							{" "}
							<div className="container">
								<div className="city">{nameInfo}</div>
								<div className="country">{countryInfo}</div>
								<div className="weather">{weatherInfo}</div>
								<div className="temp">{tempInfo}</div>
							</div>
						</>
					)}
				</>
			)}
		</>
	);
}

export default App;
