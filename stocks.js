import { mulberry32 , chartStuff, interval } from './mulberry.js';

const stocks = document.querySelector('.stock');
const balance = document.querySelector('.balance')
const plus = document.querySelector('.plus')
const value = document.querySelector('.value')
const advice = document.querySelector('.advice')
const minus = document.querySelector('.minus')
const buy = document.querySelector('.buyb')
const sell = document.querySelector('.sell')
const info = document.querySelector('.googleinfo')
const ainfo = document.querySelector('.appleinfo')
const minfo = document.querySelector('.metainfo')
const scwinfo = document.querySelector('.scwinfo')
const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d');
const cprice = document.querySelector('.current-price');
const nprice = document.querySelector('.next');
let rng = mulberry32(0);
let prices = [];
let current;
let next;
let hoveredIndex = null;

balance.textContent = localStorage.getItem('balance')

if (info !== null) {
    rng = mulberry32(132500);
    stocks.textContent = localStorage.getItem('Gstocks')
} else if (ainfo !== null) {
    console.log('APPLE')
    rng = mulberry32(163205)
    stocks.textContent = localStorage.getItem('Astocks')
} else if (minfo !== null) {
    console.log('META')
    rng = mulberry32(315260)
    stocks.textContent = localStorage.getItem('Mstocks')
} else if (scwinfo !== null) {
    rng = mulberry32(162797)
    stocks.textContent = localStorage.getItem('scwStocks')
}

document.addEventListener('click', (e) => {
    if (e.target === plus) {
        value.textContent = (Number(value.textContent) + 1).toString()
    } else if (e.target === minus && Number(value.textContent) > 0) {
        value.textContent = (Number(value.textContent) - 1).toString()
    }

    if (e.target === buy && (Number(balance.textContent) - (current * Number(value.textContent))) >= 0) {
        balance.textContent = (Number(balance.textContent) - (current * Number(value.textContent))).toString();
        if (balance < 0) {
            balance.textContent = '0'
        }
        localStorage.setItem('balance', balance.textContent)
        stocks.textContent = (Number(stocks.textContent) + Number(value.textContent)).toString()
        if (info) {
            localStorage.setItem('Gstocks', stocks.textContent)
        } else if (ainfo) {
            localStorage.setItem('Astocks', stocks.textContent)
        } else if (minfo) {
            localStorage.setItem('Mstocks', stocks.textContent)
        } else if (scwinfo) {
            localStorage.setItem('scwStocks', stocks.textContent)
        }
    } else if (e.target === sell && Number(stocks.textContent) > 0 && (Number(stocks.textContent) - Number(value.textContent)) >= 0) {
        balance.textContent = (Number(balance.textContent) + (current * Number(value.textContent))).toString()
        localStorage.setItem('balance', balance.textContent)
        stocks.textContent = (Number(stocks.textContent) - Number(value.textContent)).toString()
        if (info) {
            localStorage.setItem('Gstocks', stocks.textContent)
        } else if (ainfo) {
            localStorage.setItem('Astocks', stocks.textContent)
        } else if (minfo) {
            localStorage.setItem('Mstocks', stocks.textContent)
        } else if (scwinfo) {
            localStorage.setItem('scwStocks', stocks.textContent)
        }
    }
})

canvas?.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
                const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
                const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

                const padding = 40;
                const chartWidth = canvas.width - padding * 2;
                const chartHeight = canvas.height - padding * 2;

                const min = Math.min(...prices);
                const max = Math.max(...prices);

                const getX = (index) => padding + (index / (prices.length - 1)) * chartWidth;
                const getY =(val) => canvas.height - padding - ((val - min) / (max - min)) * chartHeight;

                let foundIndex = null;

                prices.forEach((price, i)=> {
                    const x = getX(i);
                    const y = getY(price);
                    const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
                    if (distance < 15) {
                        foundIndex = i;
                    }
                    if (hoveredIndex === i) {
                        const text = `$${price}`;
                        const textWidth = ctx.measureText(text).width;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = 'hsl(0 0% 10%)';
                        ctx.fillRect(x - textWidth / 2 - 5, y - 30, textWidth + 10, 30);
                        ctx.fillStyle = 'white';
                        ctx.fillText(text, x, y - 15);
                    } 
                });

                if (hoveredIndex !== foundIndex) {
                    hoveredIndex = foundIndex;
                    chartStuff(prices)
                }
        });
            
            canvas?.addEventListener('mouseleave', () => {
                if (hoveredIndex !== null) {
                    hoveredIndex = null;
                }
            });
setInterval(() => {
    prices = [];
    let x = interval(10 * 60 * 1000)
    for (let i = x; i < (25 + x); i++) {
        prices.push(Math.floor(rng(i) * 1000));
    }
    cprice.textContent = `${prices[prices.length - 1]}`;
    nprice.textContent = `${Math.floor((rng(x+25)*1000) + Math.floor(mulberry32(200)(12) * 100))}`
    current = parseInt(cprice.textContent, 10)
    next = parseInt(nprice.textContent, 10);
    chartStuff(prices);
    current = prices[prices.length - 1];
    next = Math.floor(Math.floor((rng(x+25)*1000) + Math.floor(mulberry32(200)(12) * 100)));
    if (current > next && (current - next) < 250) {
        advice.textContent = 'Keep Your Stocks.'
    } else if (current > next && (current - next) >= 250) {
        advice.textContent = 'Sell or Keep Your Stocks, Buy Next Stock Update.'
    } else if (current < next && (next - current) < 250) {
        advice.textContent = 'Buy Little of Stock, Its Gonna Rise Mildly Soon.'
    } else if (current < next && (next - current) >= 250) {
        advice.textContent = 'Buy Lot Now, Sell Later.'
    }
}, 3000);
