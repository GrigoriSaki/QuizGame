const token = localStorage.getItem('token');
const nextButton = document.getElementById("next-button");

async function loadQuestion()
{
    nextButton.style.display = "none";
    const res = await fetch("https://localhost:7049/api/quiz/random", {
        headers: { "Authorization": "Bearer " + token }
    });
    

    const q = await res.json();

    document.getElementById("question").innerText = q.questionText;
    const container = document.getElementById("answerButtons");
    container.innerHTML = "";

     q.answers.forEach(a => {
        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.textContent = a.answerText;
        btn.onclick = () => checkAnswer(q.id, a.id, btn);
        container.appendChild(btn);
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
}


nextButton.onclick = loadQuestion;
loadQuestion();