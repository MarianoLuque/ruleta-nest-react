import React, { useState, useCallback } from "react";
import axios from "axios";
import Roulette from "./roulette-component";

const RandomNumberGenerator: React.FC = () => {
	const [randomNumber, setRandomNumber] = useState<number | null>(null);
	const [loading, setLoading] = useState(false);
	const [spin, setSpin] = useState(false);

	const fetchRandomNumber = async () => {
		if (loading || spin) return;

		setLoading(true);
		setSpin(false);
		setRandomNumber(null);

		try {
			const response = await axios.post<{ value: number }>(
				"http://localhost:3000/api/numero-random"
			);
			console.log(response.data);
			setRandomNumber(response.data.value);
		} catch (error) {
			console.error("Error fetching random number:", error);
			setRandomNumber(null);
		} finally {
			setLoading(false);
			setSpin(true);
		}
	};

	const handleAnimationComplete = useCallback(() => {
		setSpin(false);
	}, []);

	return (
		<div className="text-center p-4">
			<h1 className="text-2xl font-bold mb-4">Ruleta</h1>
			<button
				onClick={fetchRandomNumber}
				disabled={loading || spin}
				className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 mb-4"
			>
				{loading
					? "Cargando..."
					: spin
					? "Girando..."
					: "Probá tu suerte"}
			</button>
			<Roulette
				targetNumber={randomNumber}
				onAnimationComplete={handleAnimationComplete}
				spin={spin}
			/>
			{!spin && randomNumber !== null && (
				<p className="mt-4 text-xl font-bold">
					Número obtenido: {randomNumber}
				</p>
			)}
		</div>
	);
};

export default RandomNumberGenerator;
