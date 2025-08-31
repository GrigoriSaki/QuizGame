const token = localStorage.getItem('token');
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");

const questionIndex = document.getElementById("question--index");
let currentQuestionIndex = 0;

let counter = 0;
const maxQuestions = 10;
let shownQuestionIds = [];



async function loadQuestion()
{
     updateQuestionIndex();
     
    nextButton.style.display = "none";
    let q;

    do{const res = await fetch("https://localhost:7049/api/quiz/random", {
        headers: { "Authorization": "Bearer " + token }});
        q = await res.json();

      } while (shownQuestionIds.includes(q.id));

    shownQuestionIds.push(q.id);
    
    


    document.getElementById("question").innerText = q.questionText+"?";
    const container = document.getElementById("answerButtons");
    container.innerHTML = "";

    const shuffledAnswers = [...q.answers];
     for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }

     shuffledAnswers.forEach(a => {
        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.textContent = a.answerText;
        btn.onclick = () => checkAnswer(q.id, a.id, btn);
        container.appendChild(btn);
        btn.style.display = "block";
    });


}

async function checkAnswer(questionId, answerId, btn) 
{
     const res = await fetch(`https://localhost:7049/api/quiz/${questionId}/check`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(answerId)
    });

    const result = await res.json();
    btn.style.backgroundColor = result.correct ? "green" : "red";
    nextButton.style.display = "block";
    document.querySelectorAll(".btn").forEach(b => b.disabled = true);

    if (result.correct) {
        counter++;
        
    }
    localStorage.setItem("lastScore", counter);
    currentQuestionIndex++;

    if (currentQuestionIndex >= maxQuestions) {
       
        nextButton.style.display = "none";
        finishButton.style.display = "block";
       
        
    }
}

function updateQuestionIndex() {
    questionIndex.innerText = `${currentQuestionIndex + 1}.`;
   
}

function finishQuiz() {
    document.getElementById("content").innerHTML = "<h1 class=\"end-title\">You did it!</h1> <p>Your score: " + counter + "/" + maxQuestions + "</p> <button id=\"restart-button\">OK!</button>";
    const restartButton = document.getElementById("restart-button");

    fetch("https://localhost:7049/api/auth/update-result", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
        lastResult: counter,
        completedQuizes: 1 
    })
})
.then(res => res.json())
.then(data => console.log("Aktualizacja wyniku:", data))
.catch(err => console.error(err));

    restartButton.onclick=()=>{window.location.href = "dashboard.html";};
}
    


nextButton.onclick = loadQuestion;
finishButton.onclick = finishQuiz;
loadQuestion();