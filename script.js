const questions = [
"How do you rate our service?",
"Quality of Staff & Care",
"Quality of Food",
"Quality of Lifestyle & Well-Being",
"Cleanliness & Quality of Environment",
];

let currentStep = 0;
let answers = [];

const questionText = document.getElementById("question");
const emojis = document.querySelectorAll(".emoji");
const feedbackSection = document.getElementById("feedbackSection");
const ratingsDiv = document.querySelector(".ratings");

questionText.innerText = questions[currentStep];

emojis.forEach(emoji => {

emoji.addEventListener("click", () => {

emojis.forEach(e => e.classList.remove("selected"));
emoji.classList.add("selected");

const rating = emoji.dataset.value;

answers.push({
question: questions[currentStep],
rating: rating
});

setTimeout(()=>{

currentStep++;

if(currentStep < questions.length){

questionText.innerText = questions[currentStep];

emojis.forEach(e => e.classList.remove("selected"));

questionText.classList.remove("slide");
ratingsDiv.classList.remove("slide");

void questionText.offsetWidth;

questionText.classList.add("slide");
ratingsDiv.classList.add("slide");

}else{

ratingsDiv.style.display = "none";
feedbackSection.classList.remove("hidden");
questionText.innerText = "Feedback";

}

},250);

});

});

document.getElementById("submitBtn").addEventListener("click", () => {

const feedback = document.getElementById("feedback").value;

const result = {
ratings: answers,
feedback: feedback
};

console.log(result);

// Populate the summary inside the card
const summaryDiv = document.getElementById("summary");
let summaryHTML = "<ul>";
answers.forEach(a => {
  summaryHTML += `<li><strong>${a.question}:</strong> ${a.rating}</li>`;
});
if(feedback) summaryHTML += `<li><strong>Additional Feedback:</strong> ${feedback}</li>`;
summaryHTML += "</ul>";
summaryDiv.innerHTML = summaryHTML;

// Show the card
const card = document.getElementById("thankYouCard");
card.classList.remove("hidden");

// Close button functionality
document.getElementById("closeCard").onclick = () => {
  card.classList.add("hidden");

  // RESET form
  currentStep = 0;
  answers = [];
  document.getElementById("feedback").value = "";
  emojis.forEach(e => e.classList.remove("selected"));
  ratingsDiv.style.display = "flex";
  feedbackSection.classList.add("hidden");
  questionText.innerText = questions[currentStep];
};

/* RESET */

currentStep = 0;
answers = [];

document.getElementById("feedback").value = "";

/* REMOVE SELECTED EMOJI */
emojis.forEach(e => e.classList.remove("selected"));

ratingsDiv.style.display = "flex";
feedbackSection.classList.add("hidden");

questionText.innerText = questions[currentStep];

});