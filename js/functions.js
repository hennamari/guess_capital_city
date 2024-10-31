
function toggleMenu() {
  const sideMenu = document.getElementById("sideMenu");
  if (sideMenu.style.left === "0px") {
      sideMenu.style.left = "-250px"; // Piilota valikko
  } else {
      sideMenu.style.left = "0px"; // Näytä valikko
  }
}


document.addEventListener('DOMContentLoaded', (event) => {
  const outputDisplay = document.getElementById('output')
  const input = document.getElementById('input')
  const button = document.getElementById('button')
  const scoreDisplay = document.getElementById('score')


  let correctCapital = ""
  let score = 0

  function getRandomCountry() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const randomCountry = data[Math.floor(Math.random() * data.length)]
            outputDisplay.innerText = `${randomCountry.name.common}`
            correctCapital = randomCountry.capital ? randomCountry.capital[0] : ""
        })
        .catch(error => console.error('Error:', error))
  }

  getRandomCountry()
  

  function checkAnswer(event) {
    event.preventDefault()

    const userAnswer = input.value.trim()

    if (userAnswer.toLowerCase() === correctCapital.toLowerCase()) {
      outputDisplay.innerText = `Correct! The capital of ${outputDisplay.innerText} is indeed ${correctCapital}.`
      score++
      scoreDisplay.innerText = `Score: ${score}`;
    } else {
      outputDisplay.innerText = `Incorrect! The correct answer is ${correctCapital}. Try again with a new country.`
      score = 0
      scoreDisplay.innerText = `Score: ${score}`
    }

    input.value = ""
    setTimeout(getRandomCountry, 3000); // vaihdetaan maa 3 sek päästä
  }

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      checkAnswer(event)
    }
  });

  button.addEventListener('click', checkAnswer)
});


