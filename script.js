const stopwatchColour_Reset = "#0099cc";
const stopwatchColour_Started = "#00cc00";
const stopwatchColour_Stopped = "#669966";
const stopwatchAudioDataKey_Reset = "Stopwatch_ResetSound";
const stopwatchAudioDataKey_Record = "Stopwatch_RecordSound";

let timingState = 0; //0 : ReadyToRun;  1 : Running;    2 : Stopped
function TimerInteraction() {
	timingState++;
	if (timingState > 2) {
		timingState = 0;
	}

	if (timingState == 0) {
		timerReset();
	}
	if (timingState == 1) {
		timerStart();
	}
	if (timingState == 2) {
		timerStop();
	}
}

function timerReset() {
	timerValue = 0;
	UpdateTimerGFX();
	PlayAudio(true);
	document.documentElement.style.setProperty(`--base`, stopwatchColour_Reset);
}

let intervalID = 0;
function timerStart() {
	TimerIncrease();
	intervalID = setInterval(TimerIncrease, 1000);
	PlayAudio(false);
	document.documentElement.style.setProperty(`--base`, stopwatchColour_Started);
}

function timerStop() {
	clearInterval(intervalID);
	PlayAudio(false);
	document.documentElement.style.setProperty(`--base`, stopwatchColour_Stopped);
}

function TimerIncrease() {
	timerValue++;
	UpdateTimerGFX();
}

let timerValue = 0;
const secondHand = document.querySelector(".second-hand");
function UpdateTimerGFX() {
	let secondsDegrees = (timerValue / 60) * 360 + 90;
	secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
}

const audio_TimerChange = document.querySelector(
	`audio[data-key=${stopwatchAudioDataKey_Record}]`
);
const audio_TimerReset = document.querySelector(
	`audio[data-key=${stopwatchAudioDataKey_Reset}]`
);
function PlayAudio(isReset) {
	let audio = isReset ? audio_TimerReset : audio_TimerChange;
	if (!audio) {
		return;
	}

	audio.currentTime = 0;
	//audio.play();
}

document.documentElement.style.setProperty(`--base`, stopwatchColour_Reset);
window.addEventListener("click", TimerInteraction);
