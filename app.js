const { useState, useEffect, useRef } = React;

// Create icon components from lucide
const {
    Moon,
    Sun,
    Mail,
    MapPin,
    Github,
    Linkedin,
    ExternalLink,
    Menu,
    Star,
    StarHalf
} = lucide;

// Node class for network points
class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.lifetime = 150 + Math.random() * 100;
    }

    update(width, height) {
        this.x += this.vx;
        this.y += this.vy;
        this.lifetime--;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
}

// Network Background Component
const NetworkBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const nodesRef = useRef([]);
    const connectionsRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let lastTime = 0;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize nodes
        const initNodes = () => {
            const numberOfNodes = Math.floor((canvas.width * canvas.height) / 20000);
            nodesRef.current = Array.from({ length: numberOfNodes }, () =>
                new Node(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                )
            );
        };
        initNodes();

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };

            // Create new nodes at cursor
            for (let i = 0; i < 3; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 50;
                nodesRef.current.push(
                    new Node(
                        e.clientX + Math.cos(angle) * distance,
                        e.clientY + Math.sin(angle) * distance
                    )
                );
            }
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = (timestamp) => {
            if (!lastTime) lastTime = timestamp;
            const delta = timestamp - lastTime;
            lastTime = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodesRef.current = nodesRef.current.filter(node => node.lifetime > 0);
            connectionsRef.current = [];

            // Draw connections
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
            nodesRef.current.forEach((node, i) => {
                node.update(canvas.width, canvas.height);

                nodesRef.current.slice(i + 1).forEach(otherNode => {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        connectionsRef.current.push({
                            from: node,
                            to: otherNode,
                            distance
                        });
                    }
                });
            });
            ctx.stroke();

            // Draw nodes
            nodesRef.current.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
                ctx.fill();
            });

            // Draw cursor connections
            if (mouseRef.current) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
                nodesRef.current.forEach(node => {
                    const dx = node.x - mouseRef.current.x;
                    const dy = node.y - mouseRef.current.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 200) {
                        ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
                        ctx.lineTo(node.x, node.y);
                    }
                });
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate(0);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'transparent' }}
        />
    );
};

// Work Experience Data
const experiences = [
    {
        company: "Tech Corp",
        logo: "/api/placeholder/64/64",
        role: "Senior Data Scientist",
        period: "2020 - Present",
        location: "Johannesburg, SA",
        description: [
            "Led a team of 5 data scientists in developing ML models",
            "Improved process efficiency by 40% through automation",
            "Implemented real-time analytics dashboard for 300+ users"
        ],
        technologies: ["Python", "TensorFlow", "AWS"]
    },
    {
        company: "Data Solutions Inc",
        logo: "/api/placeholder/64/64",
        role: "Data Engineer",
        period: "2018 - 2020",
        location: "Cape Town, SA",
        description: [
            "Designed and maintained data pipelines processing 1TB+ daily",
            "Reduced data processing costs by 60%",
            "Implemented automated testing reducing bugs by 45%"
        ],
        technologies: ["Spark", "Airflow", "GCP"]
    }
];

// Skills Data with Proficiency (1-5)
const skills = [
    {
        category: "Data Science",
        items: [
            { name: "Machine Learning", proficiency: 5, description: "Advanced model development and deployment" },
            { name: "Deep Learning", proficiency: 4, description: "Neural networks and computer vision" },
            { name: "Statistics", proficiency: 5, description: "Advanced statistical analysis and modeling" }
        ]
    },
    {
        category: "Programming",
        items: [
            { name: "Python", proficiency: 5, description: "Expert level, 8+ years experience" },
            { name: "R", proficiency: 4, description: "Statistical computing and graphics" },
            { name: "SQL", proficiency: 5, description: "Complex queries and database design" }
        ]
    }
];

// Technology Stack
const techStack = [
    {
        category: "Languages & Frameworks",
        tools: [
            { name: "Python", logo: "/api/placeholder/48/48" },
            { name: "TensorFlow", logo: "/api/placeholder/48/48" },
            { name: "PyTorch", logo: "/api/placeholder/48/48" },
            { name: "React", logo: "/api/placeholder/48/48" }
        ]
    },
    {
        category: "Cloud & Infrastructure",
        tools: [
            { name: "AWS", logo: "/api/placeholder/48/48" },
            { name: "GCP", logo: "/api/placeholder/48/48" },
            { name: "Docker", logo: "/api/placeholder/48/48" },
            { name: "Kubernetes", logo: "/api/placeholder/48/48" }
        ]
    }
];

// Portfolio Component
const Portfolio = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Render proficiency stars
    const renderProficiency = (level) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= level) {
                stars.push(<Star key={i} size={16} className="fill-current text-yellow-500" />);
            } else if (i - 0.5 === level) {
                stars.push(<StarHalf key={i} size={16} className="text-yellow-500" />);
            } else {
                stars.push(<Star key={i} size={16} className="text-gray-400" />);
            }
        }
        return stars;
    };

    return (
        <div className={`min-h-screen relative ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <NetworkBackground />

            <nav className="sticky top-0 w-full bg-opacity-50 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center border-b border-gray-700">
                <h1 className="text-2xl font-bold">Tevin Richard</h1>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <div className="flex gap-4">
                        <a href="mailto:tevinric@gmail.com" className="hover:text-blue-500 transition-colors">
                            <Mail size={20} />
                        </a>
                        <a href="#" className="hover:text-blue-500 transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="#" className="hover:text-blue-500 transition-colors">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-12 relative z-10">
                <section className="mb-16">
                    <div className={`interactive-card ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} rounded-lg p-8`}>
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700">
                                {/* Profile image placeholder */}
                            </div>
                            <div>
                                <h2 className="text-4xl font-bold mb-4">Tevin Richard</h2>
                                <p className="text-xl mb-4">Data Science Manager | Chemical Engineer | AI Enthusiast</p>
                                <p className="flex items-center gap-2 text-gray-400">
                                    <MapPin size={16} /> Gauteng, South Africa
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="space-y-8">
                    <div className="tabs">
                        <div className="tabs-list grid w-full grid-cols-3 bg-opacity-50 backdrop-blur-md rounded-lg overflow-hidden">
                            <button className="tabs-trigger" data-active="true">Experience</button>
                            <button className="tabs-trigger">Skills</button>
                            <button className="tabs-trigger">Tech Stack</button>
                        </div>

                        {/* Experience Section */}
                        <div className="tabs-content space-y-8">
                            {experiences.map((exp, index) => (
                                <div
                                    key={index}
                                    className={`card-hover-effect interactive-card ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} rounded-lg p-6`}
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="md:w-24">
                                            <div className="w-16 h-16 bg-gray-700 rounded-lg"></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between flex-wrap gap-2">
                                                <h3 className="text-xl font-bold">{exp.role}</h3>
                                                <span className="text-gray-400">{exp.period}</span>
                                            </div>
                                            <p className="text-lg text-blue-500 mb-2">{exp.company}</p>
                                            <p className="text-gray-400 mb-4">{exp.location}</p>
                                            <ul className="list-disc list-inside space-y-2 mb-4">
                                                {exp.description.map((item, i) => (
                                                    <li key={i} className="text-gray-300">{item}</li>
                                                ))}
                                            </ul>
                                            <div className="flex flex-wrap gap-2">
                                                {exp.technologies.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-500 rounded-full text-sm"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Skills Section */}
                        <div className="tabs-content hidden space-y-8">
                            {skills.map((skillGroup, index) => (
                                <div key={index}>
                                    <h3 className="text-2xl font-bold mb-4">{skillGroup.category}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {skillGroup.items.map((skill, i) => (
                                            <div
                                                key={i}
                                                className={`card-hover-effect interactive-card ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} rounded-lg p-6`}
                                            >
                                                <h4 className="text-lg font-semibold mb-2">{skill.name}</h4>
                                                <div className="flex mb-2">
                                                    {renderProficiency(skill.proficiency)}
                                                </div>
                                                <p className="text-gray-400 text-sm">{skill.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tech Stack Section */}
                        <div className="tabs-content hidden space-y-8">
                            {techStack.map((category, index) => (
                                <div key={index}>
                                    <h3 className="text-2xl font-bold mb-4">{category.category}</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                        {category.tools.map((tool, i) => (
                                            <div
                                                key={i}
                                                className={`card-hover-effect interactive-card ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} rounded-lg p-4 flex flex-col items-center`}
                                            >
                                                <div className="w-12 h-12 bg-gray-700 rounded-lg mb-2"></div>
                                                <span className="text-sm text-center">{tool.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Tab functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabTriggers = document.querySelectorAll('.tabs-trigger');
    const tabContents = document.querySelectorAll('.tabs-content');

    tabTriggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => {
            // Update triggers
            tabTriggers.forEach(t => {
                t.setAttribute('data-active', 'false');
                t.classList.remove('text-blue-500', 'border-b-2', 'border-blue-500');
            });
            trigger.setAttribute('data-active', 'true');
            trigger.classList.add('text-blue-500', 'border-b-2', 'border-blue-500');

            // Update content
            tabContents.forEach(content => content.classList.add('hidden'));
            tabContents[index].classList.remove('hidden');
        });
    });
});

// Mount the app
ReactDOM.render(<Portfolio />, document.getElementById('root'));
