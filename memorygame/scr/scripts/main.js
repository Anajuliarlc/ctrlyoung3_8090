

let menu = document.getElementById('menu');
let select = document.getElementById('numCards');
let start = document.getElementById('start');

for (let index = 4; index<= 10; index +=2){
    let numero = index*index
    let op = document.createElement("option")

    op.value = numero;
    op.innerHTML = numero;

    select.appendChild(op);
}
