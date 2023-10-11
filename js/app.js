const time = document.querySelector("#time");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");

const twoDigitNumber = 2;
const threeDigitNumber = 3;
const addZeroToTheLeft = "0";

let startTime;
let holdTime = 0;
let timeoutID;

function displayTime() {
  const currentTime = new Date(Date.now() - startTime + holdTime);
  const h = String(currentTime.getUTCHours()).padStart(
    twoDigitNumber,
    addZeroToTheLeft
  );
  const m = String(currentTime.getUTCMinutes()).padStart(
    twoDigitNumber,
    addZeroToTheLeft
  );
  const s = String(currentTime.getUTCSeconds()).padStart(
    twoDigitNumber,
    addZeroToTheLeft
  );
  const ms = String(currentTime.getUTCMilliseconds()).padStart(
    threeDigitNumber,
    addZeroToTheLeft
  );

  time.textContent = `${h}:${m}:${s}.${ms}`;
  timeoutID = setTimeout(displayTime, 10);
}

// 配列で渡したボタンを無効化する
function setButtonDisabled(buttons, isDisabled = true) {
  buttons.forEach((button) => {
    button.disabled = isDisabled;
  });
}

// スタートボタンが押されたら時間を進める
startButton.addEventListener("mousedown", () => {
  setButtonDisabled([startButton, resetButton]);
  setButtonDisabled([stopButton], false);

  startTime = Date.now();
  displayTime();
});

// ストップボタンが押されたら時間を止める
stopButton.addEventListener("mousedown", () => {
  setButtonDisabled([stopButton]);
  setButtonDisabled([startButton, resetButton], false);

  clearTimeout(timeoutID);
  holdTime += Date.now() - startTime;
});

// リセットボタンが押されたら時間を0に戻す
resetButton.addEventListener("mousedown", () => {
  setButtonDisabled([stopButton, resetButton]);
  setButtonDisabled([startButton], false);

  time.textContent = "00:00:00.000";
  holdTime = 0;
});
