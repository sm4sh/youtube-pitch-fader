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
    let deltaPercent = ((newValue - 1) * 100).toFixed(1);
    let sign = '';
    if (deltaPercent > 0) {
        let sign = '+ ';
    } else if (deltaPercent < 0) {
        let sign = '- ';
    }

    document.getElementById("output").innerText = sign + deltaPercent + " %"
}

function mapNumber(in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

restore();
document.getElementById("pitch-fader").addEventListener("input", save)
document.getElementById("pitch-fader").addEventListener("dblclick", reset)