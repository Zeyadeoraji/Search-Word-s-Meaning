const inputEL = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainer = document.querySelector(".meaning-container");
const titleEL = document.getElementById("tittle");
const meaningEL = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoTextEl.innerText = `Searching the result of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());
    if (result.title) {
      infoTextEl.style.display = "none";
      meaningContainer.style.display = "block";
      infoTextEl.style.color = "";
      infoTextEl.style.fontWeight = "";
      titleEL.innerText = word;
      meaningEL.innerHTML = "N/A";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainer.style.display = "block";
      audioEl.style.display = "inline-flex";
      console.log(result);
      titleEL.innerText = word;
      meaningEL.innerHTML = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {}
  infoTextEl.innerText = `There is an error, Try again after Sometime: ❌ ${word}`;
  infoTextEl.style.color = "red";
  infoTextEl.style.fontWeight = "700";
}
inputEL.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
