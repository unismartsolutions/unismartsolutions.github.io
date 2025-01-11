// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        darkModeToggle.innerHTML = '<i data-lucide="moon"></i>';
    } else {
        darkModeToggle.innerHTML = '<i data-lucide="sun"></i>';
    }
    lucide.createIcons();
});

// Tab functionality
const tabTriggers = document.querySelectorAll('.tab-trigger');
const tabContents = document.querySelectorAll('.tab-content');

tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const tab = trigger.dataset.tab;

        tabTriggers.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        trigger.classList.add('active');
        document.getElementById(tab).classList.add('active');
    });
});

// Network Background (Simplified - adapt as needed)
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Rest of the canvas drawing logic (from the React component) goes here
// ... (Copy the relevant parts from the React code)

lucide.createIcons();
