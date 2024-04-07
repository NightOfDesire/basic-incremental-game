var FPS = 20;
var diff = 0;
var date = Date.now();
function loop() {
    updateHTML()
    updateTemp()
    diff = Date.now()-date
    calc(diff/1000)
    date = Date.now()
}
function calc(dt) {
    let gs = tmp.gs.mul(dt)
    if (tmp.pass > 0) {
        tmp.pass--
        return
    }
    
    
    player.total_time += dt

    
}

function simulateTime(sec) {
    let ticks = sec * FPS
    let bonusDiff = 0
    let p = clnplayer(player,getBaseData())
    if (ticks > 1000) {
        bonusDiff = (ticks - 1000) / FPS / 1000
        ticks = 1000
    }

    /**@param bye @param error */
    for (let i=0; i<ticks; i++) {
        updateTemp()
        calc(1/FPS+bonusDiff)
    }


    let h = `You were offline for ${formatTime(sec)}.`
    
    createPopup(h, 'Offline')
}