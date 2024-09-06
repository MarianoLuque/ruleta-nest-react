import React, { useEffect, useRef, useState, useCallback } from "react";

interface RouletteProps {
	targetNumber: number | null;
	onAnimationComplete: () => void;
	spin: boolean;
}

const Roulette: React.FC<RouletteProps> = ({
	targetNumber,
	onAnimationComplete,
	spin,
}) => {
	const [isSpinning, setIsSpinning] = useState(false);
	const rouletteRef = useRef<HTMLDivElement>(null);
	const previousSpinRef = useRef(false);

	const startSpinning = useCallback(() => {
		if (!rouletteRef.current || targetNumber === null || isSpinning) return;

		setIsSpinning(true);

		// Ajuste en el cálculo de la rotación
		const targetRotation = 3600 + ((100 - targetNumber) % 100) * 3.6; // 10 rotaciones completas + posición del objetivo
		const duration = 5000; // 5 segundos

		const roulette = rouletteRef.current;
		roulette.style.transition = "none";
		roulette.style.transform = "rotate(0deg)";

		// Forzar reflow
		void roulette.offsetHeight;

		roulette.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
		roulette.style.transform = `rotate(${targetRotation}deg)`;

		const timer = setTimeout(() => {
			setIsSpinning(false);
			onAnimationComplete();
		}, duration);

		return () => clearTimeout(timer);
	}, [targetNumber, onAnimationComplete, isSpinning]);

	useEffect(() => {
		if (spin && !previousSpinRef.current) {
			startSpinning();
		}
		previousSpinRef.current = spin;
	}, [spin, startSpinning]);

	return (
		<div className="relative w-64 h-64 mx-auto my-8">
			<div
				ref={rouletteRef}
				className="absolute inset-0 rounded-full border-4 border-gray-300"
			>
				{Array.from({ length: 100 }, (_, i) => (
					<div
						key={i}
						className="absolute w-full h-full"
						style={{
							transform: `rotate(${i * 3.6}deg)`,
							transformOrigin: "50% 50%",
						}}
					>
						<div
							className={`absolute top-0 left-1/2 w-1 h-8 -ml-0.5 
                ${
					i % 10 === 0
						? "bg-black"
						: i % 5 === 0
						? "bg-gray-600"
						: "bg-gray-400"
				}`}
						/>
						{i === 0 ? (
							<span
								className="absolute text-xs font-bold"
								style={{
									left: "50%",
									top: "-24px",
									transform:
										"translate(-50%, 0) rotate(-90deg)",
								}}
							>
								{100}
							</span>
						) : i % 5 === 0 ? (
							<span
								className="absolute text-xs font-bold"
								style={{
									left: "50%",
									top: "-22px",
									transform:
										"translate(-50%, 0) rotate(-90deg)",
								}}
							>
								{i}
							</span>
						) : null}
					</div>
				))}
			</div>
			<div className="absolute top-0 left-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-[16px] border-t-red-500 -translate-x-1/2 -translate-y-1" />
			{isSpinning && (
				<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
					<div className="text-white text-xl font-bold animate-pulse">
						Girando...
					</div>
				</div>
			)}
		</div>
	);
};

export default Roulette;
