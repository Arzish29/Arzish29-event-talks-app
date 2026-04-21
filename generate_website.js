const fs = require('fs');

const talksData = [
    {
        title: "Introduction to WebAssembly",
        speakers: ["Dr. Evelyn Reed"],
        category: ["Web Development", "Performance"],
        duration: 60,
        description: "Explore the basics of WebAssembly and how it can boost web application performance."
    },
    {
        title: "Modern CSS Techniques for Responsive Design",
        speakers: ["Liam Chen", "Sophia Garcia"],
        category: ["Frontend", "CSS", "UI/UX"],
        duration: 60,
        description: "Dive into cutting-edge CSS features like Grid, Flexbox, and Container Queries for truly responsive layouts."
    },
    {
        title: "Building Scalable Microservices with Node.js",
        speakers: ["Aisha Khan"],
        category: ["Backend", "Node.js", "Architecture"],
        duration: 60,
        description: "Learn best practices for designing and implementing scalable microservices using Node.js and related tools."
    },
    {
        title: "Demystifying AI/ML for Developers",
        speakers: ["David Lee"],
        category: ["AI/ML", "Data Science"],
        duration: 60,
        description: "A practical introduction to AI/ML concepts and how developers can integrate them into their applications."
    },
    {
        title: "Effective State Management in React Applications",
        speakers: ["Olivia Brown"],
        category: ["Frontend", "React", "State Management"],
        duration: 60,
        description: "Understand different state management patterns and libraries to keep your React apps predictable and maintainable."
    },
    {
        title: "Security Best Practices for Web Applications",
        speakers: ["Mark Johnson", "Emily Davis"],
        category: ["Security", "Web Development"],
        duration: 60,
        description: "Essential security considerations and practical tips to protect your web applications from common vulnerabilities."
    }
];

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function generateSchedule(talks) {
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0); // Event starts at 10:00 AM

    let scheduleHtml = '';
    let talkIndex = 0;

    for (let i = 0; i < 6; i++) { // 6 talks + 1 lunch break
        if (i === Math.floor(6 / 2)) { // Insert lunch break in the middle
            scheduleHtml += `
            <div class="schedule-item lunch-break">
                <div class="time">${formatTime(currentTime)} - ${formatTime(new Date(currentTime.getTime() + 60 * 60 * 1000))}</div>
                <div class="details">
                    <h3>Lunch Break</h3>
                    <p>Enjoy a delicious lunch!</p>
                </div>
            </div>`;
            currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // Add 1 hour for lunch
        }

        const talk = talks[talkIndex];
        if (!talk) continue; // Should not happen with 6 talks and 6 loops

        const talkStartTime = new Date(currentTime);
        const talkEndTime = new Date(currentTime.getTime() + talk.duration * 60 * 1000);

        scheduleHtml += `
        <div class="schedule-item talk" data-category="${talk.category.map(c => c.toLowerCase()).join(' ')}">
            <div class="time">${formatTime(talkStartTime)} - ${formatTime(talkEndTime)}</div>
            <div class="details">
                <h3>${talk.title}</h3>
                <p class="speakers">Speakers: ${talk.speakers.join(' and ')}</p>
                <p class="category">Category: ${talk.category.join(', ')}</p>
                <p>${talk.description}</p>
            </div>
        </div>`;

        currentTime = new Date(talkEndTime.getTime() + 10 * 60 * 1000); // Add 10 minutes for transition
        talkIndex++;
    }
    return scheduleHtml;
}

const scheduleContent = generateSchedule(talksData);

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Talks Event Schedule</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f7f6;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 900px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 40px;
            font-size: 2.8em;
            letter-spacing: -0.5px;
        }
        .search-container {
            margin-bottom: 30px;
            text-align: center;
        }
        .search-container input[type="text"] {
            width: 70%;
            padding: 12px 18px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1em;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.06);
            transition: border-color 0.3s;
        }
        .search-container input[type="text"]:focus {
            border-color: #007bff;
            outline: none;
        }
        .schedule-item {
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            margin-bottom: 20px;
            padding: 25px;
            display: flex;
            align-items: flex-start;
            gap: 20px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .schedule-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        .schedule-item.hidden {
            display: none;
        }
        .schedule-item .time {
            font-size: 1.1em;
            font-weight: bold;
            color: #007bff;
            flex-shrink: 0;
            width: 120px;
        }
        .schedule-item .details h3 {
            margin-top: 0;
            color: #2c3e50;
            font-size: 1.5em;
            margin-bottom: 8px;
        }
        .schedule-item .details p {
            margin: 0;
            color: #555;
        }
        .schedule-item .details .speakers {
            font-style: italic;
            color: #666;
            margin-bottom: 5px;
        }
        .schedule-item .details .category {
            font-size: 0.9em;
            color: #007bff;
            margin-top: 5px;
            font-weight: bold;
        }
        .lunch-break {
            background-color: #e6f7ff;
            border-color: #91d5ff;
            color: #0056b3;
            text-align: center;
            font-size: 1.2em;
            padding: 30px;
            display: block; /* Override flex for centering */
        }
        .lunch-break .time, .lunch-break .details h3 {
            color: #0056b3;
        }
        .lunch-break .details p {
            color: #0056b3;
        }
        @media (max-width: 768px) {
            .schedule-item {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            .schedule-item .time {
                width: auto;
                margin-bottom: 10px;
            }
            .search-container input[type="text"] {
                width: 90%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tech Talks Event Schedule</h1>

        <div class="search-container">
            <input type="text" id="categorySearch" placeholder="Search by category (e.g., Frontend, AI/ML)...">
        </div>

        <div id="schedule">
            ${scheduleContent}
        </div>
    </div>

    <script>
        const talksData = ${JSON.stringify(talksData, null, 4)}; // Embed data here

        // Function to filter talks based on category
        document.getElementById('categorySearch').addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const scheduleItems = document.querySelectorAll('.schedule-item.talk');

            scheduleItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                if (categories.includes(searchTerm) || searchTerm === '') {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    </script>
</body>
</html>
