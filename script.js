//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris",
        },
        {
            question: "What is the highest mountain in the world?",
            choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
            answer: "Everest",
        },
        {
            question: "What is the largest country by area?",
            choices: ["Russia", "China", "Canada", "United States"],
            answer: "Russia",
        },
        {
            question: "Which is the largest planet in our solar system?",
            choices: ["Earth", "Jupiter", "Mars"],
            answer: "Jupiter",
        },
        {
            question: "What is the capital of Canada?",
            choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
            answer: "Ottawa",
        },
    ];

    // Initialize user answers
    let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || Array(questions.length).fill(null);

    // Function to render the questions
    function renderQuestions() {
        const questionsElement = document.getElementById("questions");
        questionsElement.innerHTML = ""; // Clear previous content

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const questionElement = document.createElement("div");
            questionElement.className = "question";
            
            const questionText = document.createTextNode(question.question);
            questionElement.appendChild(questionText);
            
            for (let j = 0; j < question.choices.length; j++) {
                const choice = question.choices[j];
                const choiceElement = document.createElement("input");
                choiceElement.setAttribute("type", "radio");
                choiceElement.setAttribute("name", `question-${i}`);
                choiceElement.setAttribute("value", choice);
                if (userAnswers[i] === choice) {
                    choiceElement.checked = true;
                }
                choiceElement.addEventListener("change", () => {
                    userAnswers[i] = choice;
                    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
                });
                
                const choiceText = document.createTextNode(choice);
                questionElement.appendChild(choiceElement);
                questionElement.appendChild(choiceText);
            }
            questionsElement.appendChild(questionElement);
        }
    }

    // Function to calculate and display the score
    function calculateScore() {
        let score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === questions[index].answer) {
                score++;
            }
        });
        
        localStorage.setItem("score", score);
        document.getElementById("score").innerText = `Your score is ${score} out of ${questions.length}.`;
    }

    // Event listener for the submit button
    document.getElementById("submit-btn").addEventListener("click", () => {
        calculateScore();
    });

    // Initial rendering of questions
    renderQuestions();
});
