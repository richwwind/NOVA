// Mobile toggle
document.getElementById('mobile-toggle')?.addEventListener('click', function(){
    const m = document.getElementById('mobile-menu');
    m.classList.toggle('hidden');
});

// Smooth reveal on scroll
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('is-visible'); observer.unobserve(e.target); }
    });
},{threshold:0.12});
document.querySelectorAll('.reveal-on-scroll').forEach(el=>observer.observe(el));

// Modal tour
const tourModal = document.getElementById('tour-modal');
const tourForm = document.getElementById('tour-form');
function openTourModal(title){
    document.getElementById('modal-title').innerText = title||'Đặt tour';
    tourModal.classList.remove('hidden');
    tourModal.classList.add('flex');
}
function closeTourModal(){
    tourModal.classList.add('hidden');
    tourModal.classList.remove('flex');
}
if(tourForm){
    tourForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        closeTourModal();
        showAlert('Đã gửi đăng ký. Chúng tôi sẽ liên hệ lại.');
        tourForm.reset();
    });
}

// Alert helper
const alertModal = document.getElementById('alert-modal');
function showAlert(msg){
    if(!alertModal) return;
    document.getElementById('alert-message').innerText = msg;
    alertModal.classList.remove('hidden');
    setTimeout(()=> alertModal.classList.add('hidden'), 3000);
}

// Quiz data (short)
 const quizData = [
            {
                question: "Khi đi du lịch, bạn ưu tiên điều gì nhất?",
                options: [
                    { text: "Chụp thật nhiều ảnh đẹp, 'sống ảo'", scores: { fire: 2, metal: 1 } },
                    { text: "Tìm hiểu văn hóa, lịch sử, truyền thuyết", scores: { water: 2, wood: 1 } },
                    { text: "Tìm một góc yên tĩnh để thư giãn, thiền định", scores: { metal: 2, water: 1 } },
                    { text: "Thử các hoạt động mạo hiểm, khám phá", scores: { earth: 2, fire: 1 } },
                    { text: "Mua sắm đồ thủ công, quà lưu niệm", scores: { wood: 2, earth: 1 } }
                ]
            },
            {
                question: "Bạn bị thu hút bởi kiểu không gian nào?",
                options: [
                    { text: "Hang động kỳ bí, huyền ảo", scores: { water: 2, earth: 1 } },
                    { text: "Chùa chiền cổ kính, linh thiêng", scores: { water: 2, metal: 1 } },
                    { text: "Vách đá hùng vĩ, nơi ngắm hoàng hôn", scores: { fire: 2, earth: 1 } },
                    { text: "Làng nghề thủ công nhộn nhịp, sáng tạo", scores: { wood: 2, metal: 1 } }
                ]
            },
            {
                question: "Màu sắc yêu thích của bạn trong nhóm này là?",
                options: [
                    { text: "Hồng, Đỏ, Cam (Gam nóng)", scores: { fire: 2 } },
                    { text: "Trắng, Vàng nhạt, Bạc (Gam sáng)", scores: { metal: 2 } },
                    { text: "Xanh lá, Nâu (Gam tự nhiên)", scores: { wood: 2, earth: 1 } },
                    { text: "Xanh dương, Đen (Gam sâu lắng)", scores: { water: 2 } }
                ]
            },
            {
                question: "Buổi tối lý tưởng của bạn là...",
                options: [
                    { text: "Một buổi tiệc sôi động cùng bạn bè", scores: { fire: 2, wood: 1 } },
                    { text: "Ngồi thiền, viết nhật ký hoặc đọc sách", scores: { metal: 2, water: 1 } },
                    { text: "Trò chuyện sâu sắc, ý nghĩa bên gia đình", scores: { water: 2, earth: 1 } },
                    { text: "Thử một công thức nấu ăn mới (ấm áp)", scores: { earth: 2 } }
                ]
            },
            {
                question: "Bạn thấy mình giống...?",
                options: [
                    { text: "Ngọn lửa nhiệt huyết", scores: { fire: 2 } },
                    { text: "Dòng nước mềm mại", scores: { water: 2 } },
                    { text: "Cái cây vững chãi", scores: { wood: 2 } },
                    { text: "Viên kim loại sáng tạo", scores: { metal: 2 } },
                    { text: "Mặt đất ấm áp", scores: { earth: 2 } }
                ]
            }
        ];
const quizStartEl = document.getElementById('quiz-start');
const quizQuestionEl = document.getElementById('quiz-question-area');
const quizResultEl = document.getElementById('quiz-result-area');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const progressTextEl = document.getElementById('question-progress');

const resultTitleEl = document.getElementById('result-title');
const resultIconEl = document.getElementById('result-icon');
const resultDescriptionEl = document.getElementById('result-description');
const resultSuggestionEl = document.getElementById('result-suggestion');

function startQuiz() {
    currentQuestionIndex = 0;
    userScores = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
    quizStartEl.classList.add('hidden');
    quizResultEl.classList.add('hidden');
    quizQuestionEl.classList.remove('hidden');
    displayQuestion();
}

function displayQuestion() {
    const question = quizData[currentQuestionIndex];
    progressTextEl.innerText = `Câu ${currentQuestionIndex + 1}/${quizData.length}`;
    questionTextEl.innerText = question.question;
    optionsContainerEl.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.className = "w-full text-left bg-white p-5 rounded-lg border-2 border-gray-200 text-gray-700 font-medium quiz-option transition-all duration-300";
        button.onclick = () => selectAnswer(option.scores);
        optionsContainerEl.appendChild(button);
    });
}

function selectAnswer(scores) {
    // Cộng điểm
    for (const key in scores) {
        if (userScores.hasOwnProperty(key)) {
            userScores[key] += scores[key];
        }
    }
    
    // Câu tiếp theo hoặc hiển thị kết quả
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizQuestionEl.classList.add('hidden');
    quizResultEl.classList.remove('hidden');

    // Tìm hành có điểm cao nhất
    finalResult = Object.keys(userScores).reduce((a, b) => userScores[a] > userScores[b] ? a : b);
    const result = quizResults[finalResult];

    resultTitleEl.innerText = result.title;
    resultTitleEl.className = `font-display text-4xl font-bold mb-4 ${result.color}`;
    resultIconEl.innerText = result.icon;
    resultDescriptionEl.innerText = result.description;
    resultSuggestionEl.innerText = result.suggestion;
}

function shareResult() {
    // Thay vì alert, dùng thông báo tùy chỉnh
    showAlert(`Chia sẻ kết quả: "Tôi là ${quizResults[finalResult].title}" (Đang phát triển)`);
    // navigator.clipboard.writeText(...) không hoạt động tốt trong iframe/sandbox
}

// === Logic Wish Wall ===
const wishInput = document.getElementById('wish-input');
const wishContainer = document.getElementById('wish-wall-container');

function sendWish() {
    const wishText = wishInput.value.trim();
    if (wishText === "") {
        showAlert("Bạn chưa viết điều ước!");
        return;
    }

    const lantern = document.createElement('div');
    lantern.className = 'wish-lantern';
    lantern.innerText = wishText;

    // Vị trí xuất hiện ngẫu nhiên
    const randomLeft = Math.random() * (wishContainer.offsetWidth - 150); // 150 là chiều rộng ước tính
    lantern.style.left = `${Math.max(20, randomLeft)}px`; // Đảm bảo không bị tràn
    lantern.style.bottom = '10px'; // Bắt đầu từ dưới

    wishContainer.appendChild(lantern);

    // Xóa khỏi DOM sau khi animation kết thúc (6 giây)
    setTimeout(() => {
        lantern.remove();
    }, 6000);

    wishInput.value = '';
}