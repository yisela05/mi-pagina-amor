function mostrarSecreto(){
    document.getElementById("secreto").classList.remove("oculto");
    explosionCorazones();
}

function mostrarFinal(){
    document.getElementById("final").classList.remove("oculto");
    explosionCorazones();
}

function abrirExtra(){
    document.getElementById("extra").classList.remove("oculto");
    explosionCorazones();
}

function respuestaSi(){
    const r = document.getElementById("respuesta");
    r.classList.remove("oculto");
    r.innerHTML = "💖 Prometo cuidarte, valorarte y amarte bonito cada día.";
    explosionCorazones();
}

// Botón Nel se escapa
const btnNel = document.getElementById("btnNel");
btnNel.addEventListener("mouseover", function(){
    const x = Math.random() * 200;
    const y = Math.random() * 80;
    btnNel.style.left = x + "px";
    btnNel.style.top = y + "px";
});

// Corazones flotando
function crearCorazon(){
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = ["💖","💗","💘","💝","💞"][Math.floor(Math.random()*5)];
    heart.style.left = Math.random()*100 + "vw";
    heart.style.animationDuration = (Math.random()*3+3) + "s";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),6000);
}
setInterval(crearCorazon, 300);

function explosionCorazones(){
    for(let i=0;i<15;i++){
        setTimeout(crearCorazon, i*80);
    }
}
