// variables
let slimeParticles = 0
let atk = 1
let cr = 50
let cd = 50
let pyroDmgBonus = 0
let upgradeCost = 10
let scaling = 0.1

// setup buttons
let buttons = document.querySelectorAll("button");
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (slimeParticles < upgradeCost) {
        this.classList.add("red");
        setTimeout(function () {
          button.classList.remove("red");
        }, 300);
      } else {
        this.classList.add("green");
        setTimeout(function () {
          button.classList.remove("green");
        }, 200);
      }
    });
});

function punch() {
    let dmgIndicator = document.getElementById("dmg-indicator");
    dmg = Math.ceil(atk * (1 + pyroDmgBonus / 100) * scaling);
    crit = cr > Math.random() * 100
    if (crit) {
        dmg = Number((dmg * (1 + cd / 100)).toFixed(0));
    }
    dmgIndicator.innerHTML = `${dmg}`;
    displayDmg(crit);
    displayPunch();
    slimeParticles += dmg;
    displaySlimeParticles();
}

function displayDmg(crit) {
    let dmgIndicator = document.getElementById("dmg-indicator");
    if (crit) {
        dmgIndicator.style.display = "block";
        dmgIndicator.style.fontSize = "9vh";
        setTimeout(function () {
            dmgIndicator.style.display = "none";
            dmgIndicator.style.fontSize = "7vh";
        }, 100);
    } else {
        dmgIndicator.style.display = "block";
        setTimeout(function () {
            dmgIndicator.style.display = "none";
        }, 100);
    }
}

let counter = 0;

function displayPunch() {
    let defaultimg = document.getElementById("default");
    let punchimg = document.getElementById("right");
    if (counter % 2 == 1) {
        punchimg = document.getElementById("left");
    }
    defaultimg.style.display = "none";
    punchimg.style.display = "block";
    setTimeout(function () {
        punchimg.style.display = "none";
        defaultimg.style.display = "block";
    }, 30);
    playSqueak();
    ++counter;
}

function playSqueak() {
    var audio = new Audio("audio/squeak.mp3");
    audio.play();
}

function displaySlimeParticles() {
    document.getElementById("slime particles").innerHTML = `Slime Particles: ${slimeParticles}`
}

function upgradable() {
    return slimeParticles >= upgradeCost;
}

function upgradeAtk() {
    if (upgradable()) {
        setTimeout(function () {
            slimeParticles -= upgradeCost;
            atk += 1;
            displaySlimeParticles();
            document.getElementById("atk").innerHTML = `Current: ${atk}`
        }, 1);
    }
}

function upgradeCR() {
    if (upgradable()) {
            setTimeout(function () {
            slimeParticles -= upgradeCost;
            cr += 1;
            displaySlimeParticles();
            document.getElementById("cr").innerHTML = `Current: ${cr}%`
        }, 1);
    }
}

function upgradeCD() {
    if (upgradable()) {
        setTimeout(function () {
            slimeParticles -= upgradeCost;
            cd += 1;
            displaySlimeParticles();
            document.getElementById("cd").innerHTML = `Current: ${cd}%`
        }, 1);
    }
}

function upgradePyroDmgBonus() {
    if (upgradable()) {
        setTimeout(function () {
            slimeParticles -= upgradeCost;
            pyroDmgBonus += 1;
            displaySlimeParticles();
            document.getElementById("pyro dmg bonus").innerHTML = `Current: ${pyroDmgBonus}%`
        }, 1);
    }
}