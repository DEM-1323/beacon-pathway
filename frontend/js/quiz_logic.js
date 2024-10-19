// Check if the user has completed the quiz before
document.addEventListener("DOMContentLoaded", function () {
  let isQuizComplete = localStorage.getItem("QUIZ_COMPLETE");

  if (isQuizComplete === "true") {
    // Show the quiz complete section if the quiz was previously completed
    document.getElementById("quiz-complete").classList.add("active");
  } else {
    // If not completed, show the cover page as usual
    document.getElementById("coverPage").classList.add("active");
  }
});

function goToOpportunitiesPage() {
  // send a message to parent window to change iframe source
  window.parent.postMessage("goToOpportunitiesPage", "*");
}

// Start the quiz
function startQuiz() {
  document.getElementById("coverPage").classList.remove("active");
  document.getElementById("quiz").classList.add("active");
  document.getElementById("question1").classList.add("active");
}

// Move to the next question
function nextQuestion(current) {
  document.getElementById(`question${current}`).classList.remove("active");
  document.getElementById(`question${current + 1}`).classList.add("active");
}

// Go back to the previous question
function previousQuestion(current) {
  document.getElementById(`question${current}`).classList.remove("active");
  document.getElementById(`question${current - 1}`).classList.add("active");
}

// Submit the quiz and mark it as completed
function submitQuiz() {
  alert("Quiz submitted! You can process or send the data here.");

  // Mark the quiz as complete
  localStorage.setItem("QUIZ_COMPLETE", "true");

  // Hide the quiz and show the completion message
  document.getElementById("quiz").classList.remove("active");
  document.getElementById("quiz-complete").classList.add("active");
}

// Reset the quiz and allow users to retake it
function retakeQuiz() {
  // Reset the quiz completion flag
  localStorage.setItem("QUIZ_COMPLETE", "false");

  // Hide the quiz complete message and show the cover page
  document.getElementById("quiz-complete").classList.remove("active");
  document.getElementById("coverPage").classList.add("active");

  // Clear the quiz answers
  document
    .querySelectorAll('input[type="radio"], input[type="checkbox"]')
    .forEach(function (input) {
      input.checked = false;
    });
}

// Exit the quiz and return to the cover page (optional)
function exitQuiz() {
  document.querySelectorAll(".question").forEach(function (question) {
    question.classList.remove("active");
  });
  document.getElementById("quiz").classList.remove("active");
  document.getElementById("coverPage").classList.add("active");
}
