// Preloader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
});

// Cursor Animation
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Text animation (Hero title)
const chars = document.querySelectorAll('.char');
chars.forEach((char, index) => {
    char.style.animationDelay = `${index * 0.1}s`;
    char.style.animation = 'fadeInUp 0.8s ease forwards';
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.project-card, .timeline-item, .about-text, .about-visual').forEach(el => {
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    observer.observe(el);
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
        }
    });
});

skillBars.forEach(bar => skillObserver.observe(bar));

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Parallax effect for hero profile
window.addEventListener('mousemove', (e) => {
    const profile = document.querySelector('.profile-3d');
    const rect = profile.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateX = (y / rect.height) * 20;
    const rotateY = -(x / rect.width) * 20;
    
    profile.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// Canvas particles (Hero background)
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        ctx.fillStyle = 'rgba(102, 126, 234, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Skills canvas animation
const skillsCanvas = document.getElementById('skillsCanvas');
if (skillsCanvas) {
    const skillsCtx = skillsCanvas.getContext('2d');
    skillsCanvas.width = 500;
    skillsCanvas.height = 400;
    
    // Simple animated background
    let time = 0;
    function animateSkills() {
        skillsCtx.fillStyle = 'rgba(30, 41, 59, 0.1)';
        skillsCtx.fillRect(0, 0, skillsCanvas.width, skillsCanvas.height);
        
        skillsCtx.strokeStyle = `hsl(${time % 360}, 70%, 60%)`;
        skillsCtx.lineWidth = 2;
        skillsCtx.shadowBlur = 20;
        skillsCtx.shadowColor = `hsl(${time % 360}, 70%, 60%)`;
        
        for (let i = 0; i < 5; i++) {
            skillsCtx.beginPath();
            skillsCtx.arc(
                skillsCanvas.width / 2 + Math.cos(time * 0.02 + i) * 100,
                skillsCanvas.height / 2 + Math.sin(time * 0.02 + i) * 100,
                50,
                0,
                Math.PI * 2
            );
            skillsCtx.stroke();
        }
        
        time++;
        requestAnimationFrame(animateSkills);
    }
    animateSkills();
}

// Form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Xabar yuborildi! Tez orada javob beraman 🚀');
});

// Window resize handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});