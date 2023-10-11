const time = document.querySelector("#time");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");

const displayTwoDigitNumber = 2;
const displayThreeDigitNumber = 3;
const addZeroToTheLeft = "0";

let startTime;
let holdTime = 0;
let timeoutID;

function displayTime() {
  const currentTime = new Date(Date.now() - startTime + holdTime);
  const h = String(currentTime.getUTCHours()).padStart(displayTwoDigitNumber, addZeroToTheLeft);
  const m = String(currentTime.getUTCMinutes()).padStart(displayTwoDigitNumber, addZeroToTheLeft);
  const s = String(currentTime.getUTCSeconds()).padStart(displayTwoDigitNumber, addZeroToTheLeft);
  const ms = String(currentTime.getUTCMilliseconds()).padStart(displayThreeDigitNumber, addZeroToTheLeft);

  time.textContent = `${h}:${m}:${s}.${ms}`;
  timeoutID = setTimeout(displayTime, 1);
}

// スタートボタンが押されたら時間を進める
startButton.addEventListener("mousedown", () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;
  startTime = Date.now();
  displayTime();
});

// ストップボタンが押されたら時間を止める
stopButton.addEventListener("mousedown", function () {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  clearTimeout(timeoutID);
  holdTime += Date.now() - startTime;
});

// リセットボタンが押されたら時間を0に戻す
resetButton.addEventListener("mousedown", function () {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  time.textContent = "00:00:00.000";
  holdTime = 0;
});
