document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const Mario = document.createElement('div')
    let isGameOver = false
    let speed = 3
    let platformCount = 5
    let platforms = []
    let score = 0
    let MarioLeftSpace = 50
    let startPoint = 150
    let MarioBottomSpace = startPoint
    const gravity = 0.9
    let upTimerId
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId
  
    class Platform {
      constructor(newPlatBottom) {
        this.left = Math.random() * 315
        this.bottom = newPlatBottom
        this.visual = document.createElement('div')
  
        const visual = this.visual
        visual.classList.add('platform')
        visual.style.left = this.left + 'px'
        visual.style.bottom = this.bottom + 'px'
        grid.appendChild(visual)
      }
    }
  
  
    function createPlatforms() {
      for(let i =0; i < platformCount; i++) {
        let platGap = 600 / platformCount
        let newPlatBottom = 100 + i * platGap
        let newPlatform = new Platform (newPlatBottom)
        platforms.push(newPlatform)
        console.log(platforms)
      }
    }
  
    function movePlatforms() {
      if (MarioBottomSpace > 200) {
          platforms.forEach(platform => {
            platform.bottom -= 4
            let visual = platform.visual
            visual.style.bottom = platform.bottom + 'px'
  
            if(platform.bottom < 10) {
              let firstPlatform = platforms[0].visual
              firstPlatform.classList.remove('platform')
              platforms.shift()
              console.log(platforms)
              score++
              var newPlatform = new Platform(600)
              platforms.push(newPlatform)
            }
        }) 
      }
      
    }
  
    function createMario() {
      grid.appendChild(Mario)
      Mario.classList.add('Mario')
      MarioLeftSpace = platforms[0].left
      Mario.style.left = MarioLeftSpace + 'px'
      Mario.style.bottom = MarioBottomSpace + 'px'
    }
  
  function fall() {
    isJumping = false
      clearInterval(upTimerId)
      downTimerId = setInterval(function () {
        MarioBottomSpace -= 5
        Mario.style.bottom = MarioBottomSpace + 'px'
        if (MarioBottomSpace <= 0) {
          gameOver()
        }
        platforms.forEach(platform => {
          if (
            (MarioBottomSpace >= platform.bottom) &&
            (MarioBottomSpace <= (platform.bottom + 15)) &&
            ((MarioLeftSpace + 60) >= platform.left) && 
            (MarioLeftSpace <= (platform.left + 85)) &&
            !isJumping
            ) {
              console.log('tick')
              startPoint = MarioBottomSpace
              jump()
              console.log('start', startPoint)
              isJumping = true
            }
        })
  
      },20)
  }
  
    function jump() {
      clearInterval(downTimerId)
      isJumping = true
      upTimerId = setInterval(function () {
        console.log(startPoint)
        console.log('1', MarioBottomSpace)
        MarioBottomSpace += 20
        Mario.style.bottom = MarioBottomSpace + 'px'
        console.log('2',MarioBottomSpace)
        console.log('s',startPoint)
        if (MarioBottomSpace > (startPoint + 200)) {
          fall()
          isJumping = false
        }
      },30)
    }
  
    function moveLeft() {
      if (isGoingRight) {
          clearInterval(rightTimerId)
          isGoingRight = false
      }
      isGoingLeft = true
      leftTimerId = setInterval(function () {
          if (MarioLeftSpace >= 0) {
            console.log('going left')
            MarioLeftSpace -=5
             Mario.style.left = MarioLeftSpace + 'px'
          } else moveRight()
      },20)
    }
  
    function moveRight() {
      if (isGoingLeft) {
          clearInterval(leftTimerId)
          isGoingLeft = false
      }
      isGoingRight = true
      rightTimerId = setInterval(function () {
        //changed to 313 to fit Mario image
        if (MarioLeftSpace <= 313) {
          console.log('going right')
          MarioLeftSpace +=5
          Mario.style.left = MarioLeftSpace + 'px'
        } else moveLeft()
      },20)
    }
    
    function moveStraight() {
      isGoingLeft = false
      isGoingRight = false
      clearInterval(leftTimerId)
      clearInterval(rightTimerId)
    }
  
    //assign functions to keyCodes
    function control(e) {
      Mario.style.bottom = MarioBottomSpace + 'px'
      if(e.key === 'ArrowLeft') {
        moveLeft()
      } else if (e.key === 'ArrowRight') {
        moveRight()
      } else if (e.key === 'ArrowUp') {
        moveStraight()
      }
    }
  
    function gameOver() {
      isGameOver = true
      while (grid.firstChild) {
        console.log('remove')
        grid.removeChild(grid.firstChild)
      }
      grid.innerHTML = score
      clearInterval(upTimerId)
      clearInterval(downTimerId)
      clearInterval(leftTimerId)
      clearInterval(rightTimerId)
    }
  
  
    function start() {
      if (!isGameOver) {
        createPlatforms()
        createMario()
        setInterval(movePlatforms,30)
        jump(startPoint)
        document.addEventListener('keyup', control)
      } 
    }
    start()
  })