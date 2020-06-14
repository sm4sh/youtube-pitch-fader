function save(e) {
    let elemInput = document.getElementById("pitch-fader")
    let newValue = elemInput.value
    
    browser.storage.sync.set({
        "playback_speed": newValue
    })

    setOutput(newValue)
}

function reset(e) {
    let pitchElem = document.getElementById("pitch-fader")
    pitchElem.value = 1
    save()
}

function restore() {
    let getValue = browser.storage.sync.get("playback_speed")
    getValue.then((val) => {
        let newValue = val["playback_speed"]
        let pitchElem = document.getElementById("pitch-fader")
        pitchElem.value = newValue

        setOutput(newValue)
    })
}

function setOutput(newValue) {
    let percent = newValue * 100
    document.getElementById("output").innerText = parseInt(percent) + " %"
}

restore();
document.getElementById("pitch-fader").addEventListener("input", save)
document.getElementById("pitch-fader").addEventListener("dblclick", reset)