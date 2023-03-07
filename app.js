const playBtn = document.querySelector(".button_play")
const stopBtn = document.querySelector(".button_stop")
let fastFood = document.querySelector(".burger")
let vegi  = document.querySelector(".green_vegi")
let pointCounter = document.querySelector(".point_counter")
let timerCounter = document.querySelector(".timer_counter")
window.addEventListener("load", setupEvents)

let point = 0;
let posFastFood = 0;
let aniReqFastFood;
let timer = 60

function startTimer() {
    setInterval(() => {
        timer--
        timerCounter.innerHTML = timer
    }, 1000)
}

function fastFoodFalling() {
    posFastFood+=2
    if (posFastFood > 550) {
        posFastFood = 0;
        point--
        pointCounter.innerHTML = point
    }
    
    fastFood.style.transform = `translateY(${posFastFood}px)`
    
    aniReqFastFood = requestAnimationFrame(fastFoodFalling)
}

let posVegi = 0;
let aniReqVegiFood;

function vegiFoodFalling() {
    posVegi+=2
    if (posVegi > 550) {
        posVegi = 0
        point++
        pointCounter.innerHTML = point
    }
    vegi.style.transform = `translateY(${posVegi}px)`
    aniReqVegiFood = requestAnimationFrame(vegiFoodFalling)
}

function stopFalling(e) {
    if (e.target.className === "burger") {
        cancelAnimationFrame(aniReqFastFood)
        // fastFood.offsetHeight
        posFastFood = 0
        fastFood.style.transform = `translateY(0px)`
        fastFoodFalling()
    } else if (e.target.className === "green_vegi") {
        cancelAnimationFrame(aniReqVegiFood)
        posVegi = 0
        vegi.style.transform = `translateY(0px)`
        vegiFoodFalling()
    }
    console.log(e.target.className)
}

function resetGame() {
    fastFood.classList.remove("stop__food-falling")
}

function stopGame() {
}

function startGame() {
    resetGame()
    startTimer()
    fastFood.addEventListener("click", stopFalling)
    vegi.addEventListener("click", stopFalling)
    fastFoodFalling()
    setTimeout(vegiFoodFalling, 2000)
    playBtn.setAttribute("disabled", true)
}

function setupEvents() {
    console.log("script is running...")
    playBtn.addEventListener("click", startGame)
}
