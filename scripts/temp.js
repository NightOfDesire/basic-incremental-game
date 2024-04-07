var tmp = {}
var tmp_update = []
function resetTemp() {
    let d = new Date()
    keep = [tmp.el, tmp.prevSave]
    tmp = {
        

        cx: 0,
        cy: 0,

        mobile: false,

        start: false,

       
        tab: 0,
        stab: [],
       
        pass: 0,
        notify: [],
        popup: [],
        saving: 0,
       

       

       
       

        prevSave: "",

       build: {}
    }
    tmp.el = keep[0]
    tmp.prevSave = keep[1]
}

function updateTemp() {
    if (!tmp.notify) tmp.notify = []
    if (!tmp.popup) tmp.popup = []
    if (!tmp.update) tmp.update = []
    tmp.offlineActive = player.offline.time > 1
    tmp.offlineMult = tmp.offlineActive?player.offline.time+1:1
    tmp.gs = E(1).mul(player.devoptions.speed)
    
    updateScalingTemp()
    for (let x = 0; x < tmp_update.length; x++) tmp_update[x]()
    
}