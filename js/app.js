const time = document.querySelector("#time");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");

const displayTwoDigitNumber = 2;
const displayThreeDigitNumber = 3;

let startTime;
let holdTime = 0;
let timeoutID;

function displayTime() {
  const currentTime = new Date(Date.now() - startTime + holdTime);
  const h = String(currentTime.getUTCHours()).padStart(displayTwoDigitNumber, "0");
  const m = String(currentTime.getMinutes()).padStart(displayTwoDigitNumber, "0");
  const s = String(currentTime.getSeconds()).padStart(displayTwoDigitNumber, "0");
  const ms = String(currentTime.getMilliseconds()).padStart(displayThreeDigitNumber, "0");

  time.textContent = `${h}:${m}:${s}.${ms}`;
  timeoutID = setTimeout(displayTime, 1);
}

// スタートボタンがクリックされたら時間を進める
startButton.addEventListener("mousedown", () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;
  startTime = Date.now();
  displayTime();
});

// ストップボタンがクリックされたら時間を止める
stopButton.addEventListener("mousedown", function () {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  clearTimeout(timeoutID);
  holdTime += Date.now() - startTime;
});

// リセットボタンがクリックされたら時間を0に戻す
resetButton.addEventListener("mousedown", function () {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  time.textContent = "00:00:00.000";
  holdTime = 0;
});
