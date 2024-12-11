import React, { useState } from "react";

const DataForm = () => {
	const [formData, setFormData] = useState({
		holiday: "",
		temp: "",
		rain_1h: "",
		snow_1h: "",
		clouds_all: "",
		weather_main: "",
		weather_description: "",
		day: "",
		month: "",
		year: "",
		hour: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// const dataToSend = {
		// 	holiday: "New Years Day",
		// 	temp: 12,
		// 	rain_1h: 12,
		// 	snow_1h: 12,
		// 	clouds_all: 12,
		// 	weather_main: "test",
		// 	weather_description: "test",
		// 	day: "lundi",
		// 	month: 1,
		// 	year: 2024,
		// 	hour: 12,
		// };

		try {
			const response = await fetch("http://localhost:8000/api", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				// body: JSON.stringify(dataToSend),
			});

			if (!response.ok) {
				throw new Error("Erreur lors de l'envoi des données");
			}

			alert("Données envoyées avec succès !");
		} catch (error) {
			console.error("Erreur:", error);
			alert("Erreur lors de l'envoi des données");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input name="holiday" placeholder="holiday (str)" onChange={handleChange} />
			<input name="temp" placeholder="temp (float)" onChange={handleChange} />
			<input name="rain_1h" placeholder="rain_1h (float)" onChange={handleChange} />
			<input name="snow_1h" placeholder="snow_1h (float)" onChange={handleChange} />
			<input name="clouds_all" placeholder="clouds_all (int)" onChange={handleChange} />
			<input name="weather_main" placeholder="weather_main (str)" onChange={handleChange} />
			<input
				name="weather_description"
				placeholder="weather_description (str)"
				onChange={handleChange}
			/>
			<input name="day" placeholder="day (str)" onChange={handleChange} />
			<input name="month" placeholder="month (int)" onChange={handleChange} />
			<input name="year" placeholder="year (int)" onChange={handleChange} />
			<input name="hour" placeholder="hour (int)" onChange={handleChange} />

			<button type="submit">Envoyer</button>
		</form>
	);
};

export default DataForm;
