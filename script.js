const questions = [
    {
        question: "تقاس قدرة وحدة التغذية الكهربائية بالواط (Watt)",
        answers: [
            { text: "صواب", correct: true},
            { text: "خطاء", correct: false},
        ]
    },
    {
        question: "الشاشات الذكية من وحدات الادخال و الاخراج معا",
        answers: [
            { text: "صواب", correct: true},
            { text: "خطاء", correct: false},
        ]
    },
    {
        question: "يستخدم برنامج Word لعمل قواعد البيانات",
        answers: [
            { text: "صواب", correct: false},
            { text: "خطاء", correct: true},
        ]
    },

    {
        question: "تقاس قدرة وحدة التغذية الكهربائية (Voltg) ",
        answers: [
            { text: "صواب", correct: false},
            { text: "خطاء", correct: true},
        ]
    },
    {
        question: "لا يمكن تصنيف لغات البرمجة الي نوعين حسب المستوي (منخفضة المستوي وعالية المستوي)",
        answers: [
            { text: "صواب", correct: false},
            { text: "خطاء", correct: true},
        ]
    },
    {
        question: "تسمى بذكرة الوصول العشوائي",
        answers: [
            { text: "CPU", correct: false},
            { text: "PSU", correct: false},
            { text: "RAM", correct: true},
            { text: "ROM", correct: false},
        ]
    },
    {
        question: "كم عضمة في جسم الانسان البالغ ؟",
        answers: [
            { text: "106", correct: false},
            { text: "206", correct: true},
            { text: "306", correct: false},
            { text: "606", correct: false},
        ]
    },
    {
        question: "كم عضلة في جسم الانسان تقريبا ؟",
        answers: [
            { text: "اقل من 400", correct: false},
            { text: "اكثر من 1000", correct: false},
            { text: "اكثر من 600", correct: true},
            { text: "الجميع خطاء", correct: false},
        ]
    },
    {
        question: "تعد الشاشات والطابعات من وحدات",
        answers: [
            { text: "وحدات الإدخال و وحدات الإخراج", correct: false},
            { text: "وحدات الإدخال", correct: false},
            { text: "وحدات التخزين المساعدة", correct: false},
            { text: "وحدات الإخراج", correct: true},
        ]
    },
    {
        question: "يتضمن الصندوق بالحاسب",
        answers: [
            { text: "اللوحة الام", correct: false},
            { text: "فتحات لتركيب سواقات الأقراص المرنة", correct: false},
            { text: "وحدة التغذية الكهربائية", correct: false},
            { text: "جميع ما ذكر ", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    questionElement.style.direction = 'rtl';
    

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    questionElement.style.textAlign = 'center';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
       handleNextButton(); 
    }else{
        startQuiz();
    }
})

startQuiz();