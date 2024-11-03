import "./index.scss";

const buttons = document.querySelectorAll(
  ".btn"
) as NodeListOf<HTMLButtonElement>;
const page = document.querySelector(".root") as HTMLElement;
const iconPath = "./icons/";
const soundPath = "./sounds/";

let currentAudio = "";
let audio = new Audio();
let icon = document.createElement("img");
let iconAddress: string;

const switchSound = (path: string): void => {
  audio.pause();
  currentAudio = path;
  audio = new Audio(currentAudio);
  audio.play();
};

const changeVolume = (audio: HTMLAudioElement): number => {
  const volume = document.querySelector(".volume") as HTMLInputElement;

  volume.addEventListener("input", function () {
    audio.volume = parseFloat(volume.value);
  });

  return parseFloat(volume.value);
};

buttons.forEach((button) => {
  button.addEventListener("click", (e: MouseEvent) => {
    const target = e.currentTarget as HTMLButtonElement;
    const buttonIcon = target.children[0] as HTMLImageElement;
    const currentIconPath = `${iconPath}${target.dataset.sound}.svg`;
    const currentSoundPath = `${soundPath}${target.dataset.sound}.mp3`;

    if (audio.paused) {
      audio
        .play()
        .catch((error) => console.error("Error playing audio:", error));
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
      icon = buttonIcon;
      iconAddress = currentIconPath;
      buttonIcon.src = "./icons/pause.svg";

      page.style.backgroundImage = `url("./${target.dataset.sound}-bg.jpg")`;
      audio.volume = changeVolume(audio);
    }
  });
});
