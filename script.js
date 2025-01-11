// Dark mode toggle (Optional - If you want a toggle)
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

if (darkModeToggle) { // Check if the element exists
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            darkModeToggle.innerHTML = '<i data-lucide="moon"></i>';
        } else {
            darkModeToggle.innerHTML = '<i data-lucide="sun"></i>';
        }
        lucide.createIcons();
    });
}

// Network Background (Optional - If you want the animated background)
const canvas = document.getElementById('network-canvas');
if (canvas) { // Check if the canvas element exists
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    const numNodes = Math.floor((canvas.width * canvas.height) / 20000);

    class Node {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(100, 149, 237, 0.5)'; // Cornflower blue with some transparency
            ctx.fill();
        }
    }

    for (let i = 0; i < numNodes; i++) {
        nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const node of nodes) {
            node.update();
            node.draw();
        }

        // Draw connections (basic example)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(100, 149, 237, 0.2)';
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) { // Adjust connection distance
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                }
            }
        }
        ctx.stroke();

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
         nodes.length = 0
        const numNodes = Math.floor((canvas.width * canvas.height) / 20000);
        for (let i = 0; i < numNodes; i++) {
            nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height));
        }
    });
}

lucide.createIcons(); // Initialize icons (Important: call this after DOM is loaded)
