document.addEventListener('DOMContentLoaded', () => {

    // 1. Countdown Timer Logic
    const countdownTarget = new Date('2027-08-25T14:30:00Z').getTime(); // Example date
    
    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hrs');
    const mEl = document.getElementById('cd-min');
    const sEl = document.getElementById('cd-sec');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownTarget - now;

        if (distance < 0) {
            dEl.innerText = '00';
            hEl.innerText = '00';
            mEl.innerText = '00';
            sEl.innerText = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        dEl.innerText = days.toString().padStart(2, '0');
        hEl.innerText = hours.toString().padStart(2, '0');
        mEl.innerText = minutes.toString().padStart(2, '0');
        sEl.innerText = seconds.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 2. Squad Data & Rendering
    const squadData = [
        { name: "Rohit Sharma", role: "BATTER", number: "45", statLabel: "ODI RUNS", statValue: "11,168" },
        { name: "Virat Kohli", role: "BATTER", number: "18", statLabel: "INTL. CENTURIES", statValue: "82" },
        { name: "Shubman Gill", role: "BATTER", number: "77", statLabel: "ODI AVERAGE", statValue: "58.2" },
        { name: "Yashasvi Jaiswal", role: "BATTER", number: "19", statLabel: "TEST RUNS", statValue: "1,900+" },
        { name: "Jasprit Bumrah", role: "BOWLER", number: "93", statLabel: "INTL. WICKETS", statValue: "380" },
        { name: "Ravindra Jadeja", role: "ALL-ROUNDER", number: "8", statLabel: "TEST WICKETS", statValue: "294" },
        { name: "Rishabh Pant", role: "WICKETKEEPER", number: "17", statLabel: "TEST SR", statValue: "73.6" },
        { name: "Hardik Pandya", role: "ALL-ROUNDER", number: "33", statLabel: "T20I SR", statValue: "139.8" }
    ];

    const squadGrid = document.getElementById('squad-grid');

    function renderSquad(filterRole = 'all') {
        squadGrid.innerHTML = '';
        const filtered = filterRole === 'all' ? squadData : squadData.filter(p => p.role.toLowerCase() === filterRole.toLowerCase());

        filtered.forEach(player => {
            const card = document.createElement('div');
            card.className = 'player-card';
            card.tabIndex = 0; 
            
            // Flip interaction class toggle
            card.addEventListener('click', () => card.classList.toggle('flipped'));
            card.addEventListener('keypress', (e) => { if(e.key === 'Enter') card.classList.toggle('flipped'); });

            card.innerHTML = `
                <div class="flip-card-inner">
                    <div class="flip-front">
                        <div class="pc-top">
                            <span>${player.role}</span>
                            <span class="pc-number">${player.number}</span>
                        </div>
                        <div class="pc-name">${player.name}</div>
                        <div>
                            <div class="pc-stat">
                                <span class="pc-stat-label">${player.statLabel}</span>
                                <span class="pc-stat-value">${player.statValue}</span>
                            </div>
                            <div class="pc-hint">TAP OR PRESS ENTER TO FLIP</div>
                        </div>
                    </div>
                    <div class="flip-back">
                        <div class="pc-top">
                            <span>FAN FILE</span>
                        </div>
                        <div style="flex:1; display:flex; flex-direction:column; justify-content:center; gap:0.5rem;">
                            <div class="pc-stat"><span class="pc-stat-label">DEBUT</span><span class="pc-stat-value">2010</span></div>
                            <div class="pc-stat"><span class="pc-stat-label">STYLE</span><span class="pc-stat-value">RHB</span></div>
                        </div>
                        <div class="pc-hint">TAP TO FLIP BACK</div>
                    </div>
                </div>
            `;
            squadGrid.appendChild(card);
        });
    }

    renderSquad();

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSquad(btn.getAttribute('data-filter'));
        });
    });

    // 3. Fan Poll
    const pollForm = document.getElementById('pollForm');
    const pollOptions = pollForm.querySelectorAll('input[type="radio"]');
    pollOptions.forEach(opt => {
        opt.addEventListener('change', () => {
            // Save visually
            pollForm.parentElement.querySelector('.card-footer-note').innerText = "VOTE RECORDED. THANKS!";
            pollForm.parentElement.querySelector('.card-footer-note').classList.add('text-saffron');
        });
    });

    // 4. Interactive Quiz
    const quizOptions = document.querySelectorAll('#quiz-options .radio-btn');
    const quizStatus = document.querySelector('.quiz-status');
    const quizNextBtn = document.querySelector('.quiz-footer .btn');
    
    quizOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
            // Reset all
            quizOptions.forEach(o => {
                o.style.borderColor = "var(--color-border)";
                o.style.color = "var(--color-text-main)";
            });
            // Mark selected
            e.target.style.borderColor = "var(--color-saffron)";
            e.target.style.color = "var(--color-saffron)";
            
            quizStatus.innerText = "Selection recorded.";
        });
    });
    
    quizNextBtn.addEventListener('click', () => {
        const title = document.getElementById('quiz-question');
        title.innerText = "WHAT IS INDIA'S HIGHEST TEST TOTAL?";
        quizOptions[0].innerText = "759/7d";
        quizOptions[1].innerText = "726/9d";
        quizOptions[2].innerText = "675/5d";
        quizOptions[3].innerText = "800/6d";
        
        quizOptions.forEach(o => {
            o.style.borderColor = "var(--color-border)";
            o.style.color = "var(--color-text-main)";
        });
        document.querySelector('.quiz-progress').innerText = "2/5";
        quizStatus.innerText = "Pick an answer";
    });

    // 5. Join the Squad (LocalStorage)
    const joinForm = document.getElementById('joinForm');
    const membershipCard = document.getElementById('membership-card');

    function displayMembershipCard(name, player) {
        membershipCard.innerHTML = `
            <div class="generated-card">
                <div class="gc-header">FAN HQ</div>
                <div class="gc-details">
                    NAME<br><strong style="font-size:1.2rem; color:var(--color-text-main)">${name.toUpperCase()}</strong><br><br>
                    FAVOURITE PLAYER<br><strong style="font-size:1.2rem; color:var(--color-text-main)">${player.toUpperCase()}</strong><br><br>
                    MEMBERSHIP ID<br><strong>#${Math.floor(1000 + Math.random() * 9000)}</strong>
                </div>
            </div>
        `;
        membershipCard.style.border = "none";
        membershipCard.style.background = "transparent";
    }

    // Check existing
    const savedName = localStorage.getItem('fanName');
    const savedPlayer = localStorage.getItem('fanPlayer');
    if (savedName && savedPlayer) {
        displayMembershipCard(savedName, savedPlayer);
    }

    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('fan-name').value;
        const player = document.getElementById('fan-player').value;
        
        localStorage.setItem('fanName', name);
        localStorage.setItem('fanPlayer', player);
        displayMembershipCard(name, player);
    });
});
