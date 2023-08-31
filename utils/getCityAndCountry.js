export const getCityAndCountry = async (latitude, longitude) => {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
		);

		if (response.ok) {
			const data = await response.json();
			// console.log("getCityAndCountry >> data.address:", data.address);
			const city =
				data.address.city || data.address.town || data.address.village;
			const state = data.address.state;
			const country = data.address.country;

			return { city, state, country };
		} else {
			throw new Error("Error fetching data");
		}
	} catch (error) {
		console.error("Error:", error);
		return null;
	}
};
