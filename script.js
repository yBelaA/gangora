const seesaw = document.getElementById('seesaw');
const hexagon = document.getElementById('hexagon');

let time = 0; 
let rotation = 0; // Acumulador do giro no próprio eixo
const speed = 0.02; // Velocidade da animação

function animate() {
    // 1. Posição e Velocidade (Curva Senoidal)
    // Oscillator controla onde ele está (-1 a 1)
    // Velocity controla quão rápido ele está (Derivada do Seno = Cosseno)
    const oscillator = Math.sin(time); 
    const velocity = Math.cos(time);   

    // 2. Mapeia a posição para a tela (15% a 85%)
    // Deixa 30% de margem total (15% em cada ponta)
    const percent = 50 + (oscillator * 35);

    // 3. Lógica da Gangorra (Sobe onde o hexágono está - Efeito compensação)
    // Quando oscillator é 1 (direita), ângulo é -15deg (ponta direita SOBE)
    const maxTilt = 15;
    const angle = oscillator * -maxTilt;

    // 4. ROTAÇÃO NO PRÓPRIO EIXO (GIRO)
    // O hexágono gira proporcionalmente à velocidade. 
    // Quando velocity é 0 (nas pontas), ele para de girar.
    // Multiplicamos por um valor (ex: 15) para o giro ser perceptível.
    rotation += velocity * 15 * speed * 60; // Ajustado para ser mais rápido

    // 5. Aplicação Visual
    hexagon.style.left = `${percent}%`;
    
    // Aplicamos as transformações na ordem correta:
    // translateX centraliza o pivô, translateY ajusta altura, rotate gira
    hexagon.style.transform = `translateX(-50%) translateY(1px) rotate(${rotation}deg)`;
    
    seesaw.style.transform = `rotate(${angle}deg)`;

    // Incrementa o tempo
    time += speed;

    requestAnimationFrame(animate);
}

// Inicia a animação
animate();