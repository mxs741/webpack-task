import "./index.scss";

const buttons = document.querySelectorAll(".btn");
const page = document.querySelector(".root");
const iconPath = "./icons/";
const soundPath = "./sounds/";

let currentAudio = "";
let audio = new Audio();
let icon = document.createElement("img");
let iconAddress;

const switchSound = (path) => {
  audio.pause();
  currentAudio = path;
  audio = new Audio(currentAudio);
  audio.play();
}

const changeVolume = (audio) => {
  const volume = document.querySelector(".volume");

  volume.addEventListener("input", function () {
    audio.volume = parseFloat(volume.value);
  });

  return parseFloat(volume.value);
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const target = e.currentTarget;
    const buttonIcon = target.children[0];
    const currentIconPath = `${iconPath}${target.dataset.sound}.svg`;
    const currentSoundPath = `${soundPath}${target.dataset.sound}.mp3`;

    if (audio.paused) {
      audio.play().catch(error => console.error("Error playing audio:", error));
      icon = buttonIcon;
      iconAddress = currentIconPath;
      buttonIcon.src = "./icons/pause.svg";
    } else {
      audio.pause();
      buttonIcon.src = currentIconPath;
    }

    if (currentAudio !== currentSoundPath) {
      switchSound(currentSoundPath);

      icon.src = iconAddress;
      console.log(icon);
      icon = buttonIcon;
      iconAddress = currentIconPath;
      buttonIcon.src = "./icons/pause.svg";

      page.style.backgroundImage = `url("./${target.dataset.sound}-bg.jpg")`;
      audio.volume = changeVolume(audio);
    }
  });
});
