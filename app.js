const playBtn = document.querySelector(".button_play")
const stopBtn = document.querySelector(".button_stop")
const fastFood = document.querySelector(".burger")
const vegi = document.querySelector(".green_vegi")
const pointCounter = document.querySelector(".point_counter")
const timerCounter = document.querySelector(".timer_counter")
const gameOverEl = document.querySelector(".game_over")
const winnerEl = document.querySelector(".winner")
window.addEventListener("load", setupEvents)

let point = 0;
let posFastFood = 0;
let aniReqFastFood;
let timer;
let timeInterval;
let isGameOver
let isWinner;
let delayFood;

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
    if (point < 0) {
        cancelAnimationFrame(aniReqFastFood)
        isGameOver = true
        stopTimer()
        gameOver()
        return
    }

    if(point >= 5){
        isWinner = true
        console.log("we have a winner")
        gameWinner()
        stopTimer()
        cancelAnimationFrame(aniReqFastFood)
        return
    }

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
    if (point < 0) {
        cancelAnimationFrame(aniReqVegiFood)
        isGameOver = true
        return
    }

    if(point >= 5){
        isWinner = true
        console.log("we have a winner")
        winnerEl.style.display = "block"
        cancelAnimationFrame(aniReqVegiFood)
        return
    }

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

function gameWinner() {
    console.log("in here")
    winnerEl.style.display = "block"
    playBtn.removeAttribute("disabled")
    stopBtn.setAttribute("disabled", true)
    document.querySelector("#sound_dreams").pause()
    document.querySelector("#sound_success").play()
    playBtn.addEventListener("click", startGame)
}

function gameOver() {
    console.log("in here")
    gameOverEl.style.display = "block"
    playBtn.removeAttribute("disabled")
    stopBtn.setAttribute("disabled", true)
    document.querySelector("#sound_dreams").pause()
    playBtn.addEventListener("click", startGame)
    document.querySelector("#sound_tada").play()
}

function resetGame() {
    document.querySelector("#sound_dreams").currentTime = 0
    gameOverEl.style.display = "none"
    winnerEl.style.display = "none"
    playBtn.removeAttribute("disabled")
    stopBtn.setAttribute("disabled", true)
    point = 0
    posFastFood = 0
    posVegi = 0
    pointCounter.innerHTML = point
    fastFood.style.transform = `translateY(0px)`
    vegi.style.transform = `translateY(0px)`
}

function stopGame() {
    document.querySelector("#sound_dreams").pause()
    resetGame()
    
    stopTimer()

    cancelAnimationFrame(aniReqFastFood)
    posFastFood = 0
    fastFood.style.transform = `translateY(0px)`

    cancelAnimationFrame(aniReqVegiFood)
    posVegi = 0
    vegi.style.transform = `translateY(0px)`

    point = 0;
    pointCounter.innerHTML = point
    stopBtn.removeEventListener("click", stopGame)
    playBtn.addEventListener("click", startGame)
    clearTimeout(delayFood)
}

async function startGame() {
    resetGame()
    startTimer()
    await document.querySelector("#sound_dreams").play()
    playBtn.setAttribute("disabled", true)
    stopBtn.removeAttribute("disabled")
    fastFood.addEventListener("click", stopFalling)
    vegi.addEventListener("click", stopFalling)

    stopBtn.addEventListener("click", stopGame)
    playBtn.removeEventListener("click", startGame)

    fastFoodFalling()
    delayFood = setTimeout(vegiFoodFalling, 2000)

}

function setupEvents() {
    console.log("script is running...")
    playBtn.addEventListener("click", startGame)
    stopBtn.setAttribute("disabled", true)
}
