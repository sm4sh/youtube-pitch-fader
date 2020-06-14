browser.storage.onChanged.addListener((settings) => {
    if ("playback_speed" in settings) {
        setPlaybackSpeed()
    }
})

function setPlaybackSpeed() {
    function onGot(val) {        
        let videoElementList = document.getElementsByTagName("video")
        if (videoElementList.length > 0)
        {
            console.info(`Playback speed: ${val["playback_speed"]}.`)
            videoElementList[0].playbackRate=val["playback_speed"] || 1
        }
        setOutput(val["playback_speed"]);
    }

    function onError(err) {
        console.error(`Error: ${err}`)
    }

    function setOutput(val) {
        let percent = val * 100
        document.getElementById("output").innerText = percent + " %"
    }

    let getValue = browser.storage.sync.get("playback_speed")
    getValue.then(onGot, onError)
}

setPlaybackSpeed()
console.log('injectpitch');
