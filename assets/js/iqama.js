// https://stackoverflow.com/a/35970894/3431636
function getJSON(url, callback) {
  let xhr = new XMLHttpRequest()
  xhr.open("GET", url, true)
  xhr.responseType = "json"
  xhr.onload = function() {
    let status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send()
}

function appendTimes(key, value) {
  const prayerName = document.createElement("li")
  prayerName.textContent = key

  const todaysIqama = document.createElement("li")
  todaysIqama.textContent = value["iqama"]

  const todaysAdhan = document.createElement("li")
  todaysAdhan.textContent = value["adhan"]

  const tomorrowsIqamaPlaceHoler = document.createElement("li")

  const ul = document.createElement("ul")
  ul.appendChild(prayerName)
  ul.appendChild(todaysIqama)
  ul.appendChild(todaysAdhan)
  ul.appendChild(tomorrowsIqamaPlaceHoler)
  ul.id = key
  ul.classList = ["prayertimeul"]

  // Append the time container to #ul_times
  const tableDOM =  document.getElementById("ul_times");
  tableDOM.appendChild(ul)

}

function appendChangingTime(changingTimes) {
  for (const [key, value] of Object.entries(changingTimes)) {
    const tomorrowsIqamaLI = document.getElementById(key).getElementsByTagName("li")[3]
    tomorrowsIqamaLI.textContent = value
    tomorrowsIqamaLI.style = "background-color: red;"
  }
}

function iqama() {
  // const url = "http://localhost:9191/"
  const url = "https:iqama.ccil-kbw.com/iqamatimes.php"
  getJSON(url, function(err, data) {
    if (err !== null) {
      console.log("Something went wrong in loading the Iqama.")
    } else {
      for (const [key, value] of Object.entries(data)) {
        if (["fajr", "dhuhr", "asr", "maghrib", "isha"].includes(key)) {
          appendTimes(key, value)
        }
        if (key === "salatsToChangeTomorrow") {
          appendChangingTime(value)
        }
      }
    }
  })
}

iqama()
