import { mulberry32 , interval } from "./mulberry.js";

const googlebtn = document.querySelector('.Google');
const applebtn = document.querySelector('.Apple');
const metabtn = document.querySelector('.Meta');
const gcurrent = document.querySelector('.Gcurrent')
const acurrent = document.querySelector('.Acurrent')
const mcurrent = document.querySelector('.Mcurrent')
const scwcurrent = document.querySelector('.Scurrent')
const scwbtn = document.querySelector('.SumChingWong');
const bal = document.querySelector('.bal')
const homebtn = document.querySelector('.Home');

const grng = mulberry32(132500)
const arng = mulberry32(163205)
const mrng = mulberry32(315260)
const scwrng = mulberry32(162797)

setInterval(() => {
    let x = interval(60 * 1000)
    gcurrent.textContent = `${Math.floor(grng(x+24)*1000)}`
    acurrent.textContent = `${Math.floor(arng(x+24)*1000)}`
    mcurrent.textContent = `${Math.floor(mrng(x+24)*1000)}`
    scwcurrent.textContent = `${Math.floor(scwrng(x+24)*1000)}`
}, 3000)

if (!localStorage.getItem('balance')) {
    localStorage.setItem('balance', '3000')
}
bal.textContent = `Balance: $${localStorage.getItem('balance')}`

document.addEventListener('click', (e) => {
    if (e.target === googlebtn) {
        window.location.href = 'google.html';
    } else if (e.target === applebtn) {
        window.location.href = 'apple.html'
    } else if (e.target === metabtn) {
        window.location.href = 'meta.html'
    } else if (e.target === scwbtn) {
        window.location.href = 'SCW.html'
    }
});

homebtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
