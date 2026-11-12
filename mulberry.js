export function mulberry32(seed) {
            return function(index) {
                let t = (seed + index * 0x6D2B79F5) | 0;
                t = Math.imul(t ^ t >>> 15, t | 1);
                t ^= t + Math.imul(t ^ t >>> 7, t | 61);
                return ((t ^ t >>> 14) >>> 0) / 4294967296;
            }
        }

export function chartStuff(prices) {
            const canvas = document.querySelector('.canvas');
            const ctx = canvas.getContext('2d');
            let hoveredIndex = null;
            function renderChart() {
                ctx.lineWidth = 2;
                const padding = 40;
                const chartWidth = canvas.width - padding * 2;
                const chartHeight = canvas.height - padding * 2;

                const min = Math.min(...prices);
                const max = Math.max(...prices);

                const getX = (index) => padding + (index / (prices.length - 1)) * chartWidth;
                const getY =(val) => canvas.height - padding - ((val - min) / (max - min)) * chartHeight;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = 'white';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                for (let i = 0; i < prices.length; i++) {
                    ctx.fillText(`${i + 1}D`, getX(i), canvas.height - padding/2);
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'gray';
                    ctx.moveTo(getX(i), canvas.height - padding/2);
                    ctx.lineTo(getX(i),  0);
                    ctx.stroke();
                }
                for (let i = 0; i < prices.length + 1; i++) {
                    ctx.fillText(`${min + Math.round(((max - min) / (prices.length - 1))) * i}`, canvas.width - padding/2, getY(min + ((max - min) / (prices.length - 1)) * i));
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'gray';
                    ctx.moveTo(canvas.width - padding/2, getY(min + ((max - min) / (prices.length - 1)) * i));
                    ctx.lineTo(0, getY(min + ((max - min) / (prices.length - 1)) * i));
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.lineWidth = 2;
                prices.forEach((price, i) => {
                    const x = getX(i);
                    const y = getY(price);

                    ctx.strokeStyle = 'green';
                    
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else{
                        ctx.lineTo(x, y);
                    }
                })
                ctx.stroke();
            }
            renderChart();
        }      

export function interval(IntervalMS) {
    const startDate = new Date('2026-11-11').getTime();
    const now = Date.now();

    const missedIntervals = Math.floor((now - startDate) / IntervalMS);

    return missedIntervals;
}