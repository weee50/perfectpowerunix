function updateTime()
{
  let unixTime = Math.floor(Date.now() / 1000)
  document.getElementById("time").innerText = unixTime

  let nextSquare = Math.ceil(unixTime ** (1/2)) ** 2
  document.getElementById("squareTime").innerText = nextSquare
  document.getElementById("squareDate").innerText = formatDate(nextSquare)
  document.getElementById("squareCountdown").innerText = formatCountdown(unixTime, nextSquare, 1)
  document.getElementById("squareMarker").innerText = "(" + Math.round(nextSquare ** (1/2)) + "^2)"

  let nextCube = Math.ceil(unixTime ** (1/3)) ** 3
  document.getElementById("cubeTime").innerText = nextCube
  document.getElementById("cubeDate").innerText = formatDate(nextCube)
  document.getElementById("cubeCountdown").innerText = formatCountdown(unixTime, nextCube, 2)
  document.getElementById("cubeMarker").innerText = "(" + Math.round(nextCube ** (1/3)) + "^3)"

  let nextFourth = Math.ceil(unixTime ** (1/4)) ** 4
  document.getElementById("fourthTime").innerText = nextFourth
  document.getElementById("fourthDate").innerText = formatDate(nextFourth)
  document.getElementById("fourthCountdown").innerText = formatCountdown(unixTime, nextFourth, 3)
  document.getElementById("fourthMarker").innerText = "(" + Math.round(nextFourth ** (1/4)) + "^4)"

  let nextHigher = Infinity
  let nextHigherPower = 0

  for (let i = 5; i < 64; i++) // there probably isn't going to be anyone using this website at 2^65 unix time, is there?
  {
    let nextPower = Math.ceil(unixTime ** (1/i)) ** i
    if (nextPower < nextHigher)
    {
      nextHigher = nextPower
      nextHigherPower = i
    }
  }

  document.getElementById("higherTime").innerText = nextHigher
  document.getElementById("higherDate").innerText = formatDate(nextHigher)
  document.getElementById("higherCountdown").innerText = formatCountdown(unixTime, nextHigher, 4)
  document.getElementById("higherMarker").innerText = "(" + Math.round(nextHigher ** (1/nextHigherPower)) + "^" + nextHigherPower + ")"
}

function formatDate(unixTime)
{
  let unixDate = new Date(unixTime * 1000)

  let day = unixDate.getDate()
  let month = unixDate.getMonth() + 1
  let year = unixDate.getFullYear()

  let hour = unixDate.getHours()
  let minute = unixDate.getMinutes()
  let second = unixDate.getSeconds()

  return leftpad(year, 4) + "-" + leftpad(month, 2) + "-" + leftpad(day, 2) + " " + leftpad(hour, 2) + ":" + leftpad(minute, 2) + ":" + leftpad(second, 2)
}

function formatCountdown(currentTime, finalTime, daysPadding)
{
  let gap = finalTime - currentTime

  let seconds = gap % 60
  let minutes = Math.floor(gap / 60) % 60
  let hours = Math.floor(gap / 3600) % 24
  let days = Math.floor(gap / 86400)

  return leftpad(days, daysPadding) + ":" + leftpad(hours, 2) + ":" + leftpad(minutes, 2) + ":" + leftpad(seconds, 2)
}

function leftpad(num, digits)
{
  let stringNum = String(num)
  let neededZeros = digits - stringNum.length;

  if (neededZeros < 0)
  {
    return stringNum
  }
  return "0".repeat(neededZeros) + stringNum
}

a = setInterval(updateTime, 100)