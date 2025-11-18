


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
    {question:'Bạn thích điều gì khi đi du lịch?', options:[
            {text:'Chụp ảnh',scores:{fire:2}},
            {text:'Tĩnh tâm',scores:{water:2}},
            {text:'Khám phá',scores:{earth:2}},
        ]},
    {question:'Bạn thích không gian nào?', options:[
            {text:'Hang động',scores:{water:2}},
            {text:'Làng nghề',scores:{wood:2}},
            {text:'Bình minh',scores:{fire:2}},
        ]}
];
const quizResults = {
    wood:{title:'Hành Mộc',icon:'🌿',description:'Bạn yêu thiên nhiên.'},
    fire:{title:'Hành Hỏa',icon:'🔥',description:'Bạn nhiệt huyết.'},
    water:{title:'Hành Thủy',icon:'🌊',description:'Bạn trầm lắng.'},
    earth:{title:'Hành Thổ',icon:'🌾',description:'Bạn thực tế.'}
};
let qIndex=0; let scores={wood:0,fire:0,water:0,earth:0};
function startQuiz(){
    qIndex=0; scores={wood:0,fire:0,water:0,earth:0};
    document.getElementById('quiz-start').classList.add('hidden');
    document.getElementById('quiz-question-area').classList.remove('hidden');
    displayQuestion();
}
function displayQuestion(){
    const q = quizData[qIndex];
    document.getElementById('question-progress').innerText = `Câu ${qIndex+1}/${quizData.length}`;
    document.getElementById('question-text').innerText = q.question;
    const opts = document.getElementById('options-container');
    opts.innerHTML='';
    q.options.forEach(o=>{
        const b = document.createElement('button');
        b.className='btn-outline w-full text-left block';
        b.innerText = o.text;
        b.onclick = ()=> selectAnswer(o.scores);
        opts.appendChild(b);
    });
}
function selectAnswer(s){
    Object.keys(s).forEach(k=> scores[k] = (scores[k]||0)+s[k]);
    qIndex++;
    if(qIndex<quizData.length) displayQuestion();
    else showQuizResult();
}
function showQuizResult(){
    document.getElementById('quiz-question-area').classList.add('hidden');
    document.getElementById('quiz-result-area').classList.remove('hidden');
    const winner = Object.keys(scores).reduce((a,b)=> scores[a]>scores[b]?a:b);
    const r = quizResults[winner] || {title:'-',icon:'',description:'-'};
    document.getElementById('result-title').innerText = r.title;
    document.getElementById('result-icon').innerText = r.icon;
    document.getElementById('result-description').innerText = r.description;
}

// Wish wall simple effect
function sendWish(){
    const input = document.getElementById('wish-input');
    const txt = input.value.trim();
    if(!txt) return showAlert('Bạn chưa viết điều ước!');
    const container = document.getElementById('wish-wall-container');
    const el = document.createElement('div');
    el.className='wish-lantern';
    el.innerText = txt;
    el.style.left = Math.max(10, Math.random()*(container.offsetWidth-120)) + 'px';
    container.appendChild(el);
    setTimeout(()=> el.remove(), 6000);
    input.value='';
}

// Expose openTourModal globally for buttons
window.openTourModal = openTourModal;
window.startQuiz = startQuiz;
window.sendWish = sendWish;
window.closeTourModal = closeTourModal;
window.showAlert = showAlert;
function showPage(pageId, clickedLink = null, isMobile = false) {
    const section = document.getElementById(pageId);
    if (!section) return;

    // Cập nhật nav active
    navLinks.forEach(link => {
        link.classList.remove('active', 'font-bold', 'text-theme-primary');
        link.classList.add('text-gray-600');
    });

    if (clickedLink) {
        clickedLink.classList.add('active', 'font-bold', 'text-theme-primary');
        clickedLink.classList.remove('text-gray-600');
    }

    // Đóng menu mobile
    if (isMobile) mobileMenu.classList.add('hidden');

    // Scroll mượt đến đúng section
    section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // Ngăn reload link
    if (event) event.preventDefault();
}
