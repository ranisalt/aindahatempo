(() => {
  const timeout = new Date("May 18 2018 12:00:00 UTC-3").getTime(),
    frameTime = 1000 / 15,  // limit to 15 fps
    msPerSec = 1000,
    msPerMin = 1000 * 60,
    msPerHour = 1000 * 60 * 60,
    msPerDay = 1000 * 60 * 60 * 24

  function leadingZero(num, width = 2) {
    return Math.floor(num).toFixed().padStart(width, '0')
  }

  document.addEventListener('DOMContentLoaded', ev => {
    const title = document.querySelector('.title'),
      countdown = document.querySelector('.countdown')

    let nextUpdate = performance.now()
    function updateCountdown(timestamp) {
      // the next 5 lines limit to one update every frameTime ms
      const nextFrame = window.requestAnimationFrame(updateCountdown)
      if (timestamp < nextUpdate) {
        return
      }
      nextUpdate += frameTime

      const distance = Math.max(0, timeout - Date.now())
      if (distance == 0) {
        window.cancelAnimationFrame(nextFrame)  // won't update after timeout
        title.innerHTML = 'não há mais tempo'
      }

      const days = leadingZero(distance / msPerDay),
        hours = leadingZero((distance % msPerDay) / msPerHour),
        mins = leadingZero((distance % msPerHour) / msPerMin),
        secs = leadingZero((distance % msPerMin) / msPerSec),
        msecs = leadingZero(distance % msPerSec, 3)

      countdown.innerHTML = `${days}:${hours}:${mins}:${secs}:${msecs}`
    }

    window.requestAnimationFrame(updateCountdown)
  })
})()
