const playBtn = document.querySelector(".button_play")
const stopBtn = document.querySelector(".button_stop")
const fastFood = document.querySelector(".burger")
const vegi = document.querySelector(".green_vegi")
const pointCounter = document.querySelector(".point_counter")
const timerCounter = document.querySelector(".timer_counter")
window.addEventListener("load", setupEvents)

let point = 0;
let posFastFood = 0;
let aniReqFastFood;
let timer;
let timeInterval;

function startTimer() {
    timer = 60;
    timeInterval = setInterval(() => {
        timer--
        timerCounter.innerHTML = timer
    }, 1000)
}

function stopTimer() {
    clearInterval(timeInterval)
    timerCounter.innerHTML = 60
}

function fastFoodFalling() {
    posFastFood += 2
    if (posFastFood > 545) {
        posFastFood = 0;
        point--
        pointCounter.innerHTML = point
        document.querySelector("#sound_bomb").play()
    }

    fastFood.style.transform = `translateY(${posFastFood}px)`

    aniReqFastFood = requestAnimationFrame(fastFoodFalling)
}

let posVegi = 0;
let aniReqVegiFood;

function vegiFoodFalling() {
    posVegi += 2
    if (posVegi > 545) {
        posVegi = 0
        point++
        pointCounter.innerHTML = point
        document.querySelector("#sound_coin").play()
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
        document.querySelector("#sound_coin").play()
    } else if (e.target.className === "green_vegi") {
        cancelAnimationFrame(aniReqVegiFood)
        posVegi = 0
        vegi.style.transform = `translateY(0px)`
        vegiFoodFalling()
        document.querySelector("#sound_bomb").play()
    }
    console.log(e.target.className)
}

function resetGame() {
    document.querySelector("#sound_dreams").currentTime = 0
}

function stopGame() {
    document.querySelector("#sound_dreams").pause()
    playBtn.removeAttribute("disabled")
    stopBtn.setAttribute("disabled", true)

    stopTimer()
    cancelAnimationFrame(aniReqFastFood)
    posFastFood = 0
    fastFood.style.transform = `translateY(0px)`

    cancelAnimationFrame(aniReqVegiFood)
    posVegi = 0
    vegi.style.transform = `translateY(0px)`

    point = 0;
    pointCounter.innerHTML = point
    playBtn.addEventListener("click", startGame)
}

function startGame() {
    resetGame()
    startTimer()
    document.querySelector("#sound_dreams").play()
    playBtn.setAttribute("disabled", true)
    stopBtn.removeAttribute("disabled")
    fastFood.addEventListener("click", stopFalling)
    vegi.addEventListener("click", stopFalling)

    stopBtn.addEventListener("click", stopGame)
    playBtn.removeEventListener("click", startGame)

    fastFoodFalling()
    setTimeout(vegiFoodFalling, 2000)

}

function setupEvents() {
    console.log("script is running...")
    playBtn.addEventListener("click", startGame)
    stopBtn.setAttribute("disabled", true)
}
