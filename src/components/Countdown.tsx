import styles from "../styles/components/Countdown.module.css";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { useState, useEffect, useContext } from "react";

export function Countdown() {
	const { startNewChallenge } = useContext(ChallengesContext);
	const [time, setTime] = useState(0.05 * 60);
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
	const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");
	let countdownTimeout: NodeJS.Timeout;

	function startCountdown() {
		setIsActive(true);
	}

	function resetCountdown() {
		clearTimeout(countdownTimeout);
		setIsActive(false);
		setTime(0.05 * 60);
	}

	useEffect(() => {
		if (isActive && time > 0) {
			countdownTimeout = setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		} else if (isActive && time === 0) {
			setHasFinished(true);
			setIsActive(false);
			startNewChallenge();
		}
	}, [isActive, time]);

	return (
		<div>
			<div className={styles.countdownContainer}>
				<div>
					<span>{minuteLeft}</span>
					<span>{minuteRight}</span>
				</div>
				<span>:</span>
				<div>
					<span>{secondLeft}</span>
					<span>{secondRight}</span>
				</div>
			</div>
			{hasFinished ? (
				<button type="button" disabled className={styles.countdownButton}>
					Ciclo encerrado
				</button>
			) : (
				<>
					{isActive ? (
						<button
							type="button"
							className={`${styles.countdownButton} ${styles.countDownButtonActive}`}
							onClick={resetCountdown}
						>
							Abandonar Ciclo
						</button>
					) : (
						<button
							type="button"
							className={styles.countdownButton}
							onClick={startCountdown}
						>
							Iniciar um ciclo
						</button>
					)}
				</>
			)}
		</div>
	);
}
