import Chart from 'chart.js/auto';

export const ScoreProgressionChart = () => {
    return `
        <div class="h-64"> <!-- Tinggi untuk chart, agar responsif -->
            <canvas id="scoreChart"></canvas>
        </div>
    `;
};

export const initializeScoreChart = () => {
    const ctx = document.getElementById('scoreChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                    {
                        label: 'Listening',
                        data: [300, 350, 320, 380, 400, 370, 420],
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: 'Writing',
                        data: [280, 310, 300, 350, 330, 390, 360],
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    },
                    {
                        label: 'Structure',
                        data: [250, 270, 290, 310, 300, 320, 340],
                        borderColor: 'rgb(54, 162, 235)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, 
                plugins: {
                    legend: {
                        position: 'bottom', 
                    }
                }
            }
        });
    }
};