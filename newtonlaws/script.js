// === TAB NAVIGATION LOGIC ===
function openTab(tabId) {
    // Hide all tabs and remove active class from buttons
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab and highlight button
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

// === 1ST LAW: INERTIA (Skateboard) ===
function updateLaw1() {
    let friction = document.getElementById('l1-friction').value;
    let track = document.getElementById('l1-track');
    
    // Change floor appearance based on friction
    if (friction === 'ice') track.style.background = '#BAE6FD'; // Light blue ice
    if (friction === 'wood') track.style.background = '#DEB887'; // Wood color
    if (friction === 'sand') track.style.background = '#FCD34D'; // Yellow sand
    
    resetLaw1();
}

function pushSkateboard() {
    let friction = document.getElementById('l1-friction').value;
    let skater = document.getElementById('l1-skater');
    let result = document.getElementById('l1-result');
    
    skater.style.transition = 'none'; // reset
    
    setTimeout(() => {
        if (friction === 'ice') {
            // Low friction: Glides smoothly off screen
            skater.style.transition = 'transform 3s linear';
            skater.style.transform = 'translate(800px, -50%)';
            result.innerText = "Wow! Almost no friction. It just keeps going and going!";
        } else if (friction === 'wood') {
            // Medium friction: Slows down to a stop gracefully
            skater.style.transition = 'transform 2s cubic-bezier(0.1, 1, 0.5, 1)';
            skater.style.transform = 'translate(450px, -50%)';
            result.innerText = "The friction of the wheels on the wood slowed it down to a stop.";
        } else if (friction === 'sand') {
            // High friction: Stops almost immediately
            skater.style.transition = 'transform 0.5s ease-out';
            skater.style.transform = 'translate(100px, -50%)';
            result.innerText = "Oof! The thick sand created too much friction. It stopped instantly!";
        }
    }, 50);
}

function resetLaw1() {
    let skater = document.getElementById('l1-skater');
    skater.style.transition = 'none';
    skater.style.transform = 'translate(0, -50%)';
    document.getElementById('l1-result').innerText = "Ready to push!";
}

// === 2ND LAW: F=MA (Slingshot) ===
document.getElementById('l2-mass').addEventListener('change', function() {
    // Change emoji based on dropdown selection
    let ammo = document.getElementById('l2-ammo');
    if(this.value == 1) ammo.innerText = '🪶';
    if(this.value == 5) ammo.innerText = '⚾';
    if(this.value == 20) ammo.innerText = '🧲';
    resetLaw2();
});

function fireSlingshot() {
    let mass = parseInt(document.getElementById('l2-mass').value);
    let force = parseInt(document.getElementById('l2-force').value);
    let ammo = document.getElementById('l2-ammo');
    let result = document.getElementById('l2-result');
    
    // The Physics Equation! Acceleration = Force / Mass
    let acceleration = force / mass;
    
    // We use acceleration to determine how fast the CSS animation plays
    // Higher acceleration = smaller time duration (faster)
    let flightTime = 3 / acceleration; 
    
    // Cap the time so it doesn't break if it's too slow
    if (flightTime > 5) flightTime = 5; 

    // Animate the ammo flying
    ammo.style.transition = `transform ${flightTime}s ease-out`;
    ammo.style.transform = 'translate(700px, -50%)';
    
    // Update text based on the math
    if (acceleration >= 5) {
        result.innerText = "ZOOM! High force + Light object = Massive Acceleration!";
    } else if (acceleration <= 0.5) {
        result.innerText = "Thud... Low force + Heavy object = Very little Acceleration.";
    } else {
        result.innerText = "A perfectly normal throw! Nice arc.";
    }
}

function resetLaw2() {
    let ammo = document.getElementById('l2-ammo');
    ammo.style.transition = 'none';
    ammo.style.transform = 'translate(0, -50%)';
    document.getElementById('l2-result').innerText = "Waiting to fire...";
}

// === 3RD LAW: ACTION/REACTION (Astronaut) ===
function throwRock() {
    let astro = document.getElementById('l3-astro');
    let rock = document.getElementById('l3-rock');
    
    rock.style.opacity = '1';
    
    // ACTION: Rock moves fast to the right
    rock.style.transition = 'transform 1s linear';
    rock.style.transform = 'translate(300px, -50%)';
    
    // REACTION: Astronaut is heavier, so he moves slower, but to the left!
    astro.style.transition = 'transform 2s linear';
    astro.style.transform = 'translate(-250px, -50%)';
    
    // Highlight the explanation boxes
    document.getElementById('action-text').classList.add('active');
    document.getElementById('reaction-text').classList.add('active');
}

function resetLaw3() {
    let astro = document.getElementById('l3-astro');
    let rock = document.getElementById('l3-rock');
    
    astro.style.transition = 'none';
    rock.style.transition = 'none';
    
    astro.style.transform = 'translate(0, -50%)';
    rock.style.transform = 'translate(0, -50%)';
    rock.style.opacity = '0';
    
    document.getElementById('action-text').classList.remove('active');
    document.getElementById('reaction-text').classList.remove('active');
}

// Initialize the first tab visuals when page loads
window.onload = () => {
    updateLaw1();
};