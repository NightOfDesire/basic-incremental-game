var EINF = Decimal.dInf


function wipe(reload=false) {
    if (reload) {
        wipe()
        save()
        location.reload()
    }
    else player = getBaseData()
}

function ldplayer(load) {
    const DATA = getBaseData()
    player = deepNaN(load, DATA)
    player = deepUndefinedAndDecimal(player, DATA)
   
}

function clnplayer(obj,data) {
    let unique = {}

    for (let k in obj) {
        if (data[k] == null || data[k] == undefined) continue
        unique[k] = Object.getPrototypeOf(data[k]).constructor.name == "Decimal"
        ? E(obj[k])
        : typeof obj[k] == 'object'
        ? clnplayer(obj[k],data[k])
        : obj[k]
    }

    return unique
}

function deepNaN(obj, data) {
    for (let k in obj) {
        if (typeof obj[k] == 'string') {
            if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) obj[k] = data[k]
        } else {
            if (typeof obj[k] != 'object' && isNaN(obj[k])) obj[k] = data[k]
            if (typeof obj[k] == 'object' && data[k] && obj[k] != null) obj[k] = deepNaN(obj[k], data[k])
        }
    }
    return obj
}

function deepUndefinedAndDecimal(obj, data) {
    if (obj == null) return data
    for (let k in data) {
        if (obj[k] === null) continue
        if (obj[k] === undefined) obj[k] = data[k]
        else {
            if (Object.getPrototypeOf(data[k]).constructor.name == "Decimal") obj[k] = E(obj[k])
            else if (typeof obj[k] == 'object') deepUndefinedAndDecimal(obj[k], data[k])
        }
    }
    return obj
}



function save(){
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) return
    if (localStorage.getItem("testSave") == '') wipe()
    localStorage.setItem("testSave",str)
    tmp.prevSave = localStorage.getItem("testSave")
    if (player.options.savenotif) addNotify('Game saved.', 3)
   
}

function exporty() {
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) {
        addNotify("Error Exporting, because it got NaNed")
        return
    }
    save();
    let file = new Blob([str], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "PTI:R-"+new Date().toLocaleTimeString()+".txt"
    a.click()
}

function export_copy() {
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) {
        addNotify("Error Exporting, because it got NaNed")
        return
    }

    let copyText = document.getElementById('copy')
    copyText.value = str
    copyText.style.visibility = "visible"
    copyText.select();
    document.execCommand("copy");
    copyText.style.visibility = "hidden"
    addNotify("Copied to Clipboard")
}
function importy() {
    let loadgame = prompt("Paste in your save. this will OVERWRITE your current save.")
    let st = ""
    if (loadgame.length <= 100) st = convertStringIntoAGY(loadgame)
    if (st == 'OJY$VFe*b') {
        addNotify('monke<br><img style="width: 100%; height: 100%" src="https://i.kym-cdn.com/photos/images/original/001/132/314/cbc.jpg">')
        return
    }
    else if (st == 'p4H)pb{v2y5?g!') {
        addNotify('2+2=5<br><img src="https://cdn2.penguin.com.au/authors/400/106175au.jpg">')
        return
    }
    else if (st == 'L5{W*oI.NhA-lE)C1#e') {
        addNotify('<img src="https://steamuserimages-a.akamaihd.net/ugc/83721257582613769/22687C6536A50ADB3489A721A264E0EF506A89B3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false">',6)
        return
    }
    else if (st == 'a+F4gro<?/Sd') {
        addNotify('YOU ARE CURSED FOREVER!!!')
        player.options.font = 'Wingding'
        return
    }
    if (loadgame != null) {
        let keep = player
        try {
            setTimeout(()=>{
                if (findNaN(loadgame, true)) {
                    addNotify("Error importing, part of save is NaNed.")
                    return
                }
                load(loadgame)
                save()
                resetTemp()
                loadGame(false)
            }, 200)
        }
        catch (error) {
            addNotify("Error importing.")
            player = keep
        }
    }
}


function load(x){
    if(typeof x == "string" & x != ''){
        ldplayer(JSON.parse(atob(x)))
    } else {
        wipe()
    }
}

function loadGame(start=true, gotNaN=false) {
    if (!gotNaN) tmp.prevSave = localStorage.getItem("testSave")
    wipe()
    load(tmp.prevSave)
    
    if (start) {
        updateTemp()
        setupHTML()
        setInterval(save,15000)

        /**@param {stfu} shutUpError */
        updateHTML()

       

       
        }
        let t = (Date.now() - player.offline.current)/1000
        if (player.offline.active && t > 60) simulateTime(t)

       
        document.onmousemove = e => {
            tmp.cx = e.clientX
            tmp.cy = e.clientY
        }
       
        setInterval(loop, 1000/FPS)
       

        setTimeout(()=>{
            tmp.start = true
        },2000)

       
}

function checkNaN() {

    let naned = findNaN(player)

    if (naned) {
        console.log(naned)

       

        resetTemp()

        tmp.start = true

        loadGame(false, true)

        for (let x = 0; x < 5; x++) updateTemp()
    }
}

function isNaNed(val) {
    return typeof val == "number" ? isNaN(val) : Object.getPrototypeOf(val).constructor.name == "Decimal" ? isNaN(val.mag) : false
}

function findNaN(obj, str=false, data=getBaseData(), node='player') {
    if (str ? typeof obj == "string" : false) obj = JSON.parse(atob(obj))
    for (let k in obj) {
        if (typeof obj[k] == "number") if (isNaNed(obj[k])) return node+'.'+k
        if (str) {
            if (typeof obj[k] == "string") if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return node+'.'+k
        } else {
            if (obj[k] == null || obj[k] == undefined ? false : Object.getPrototypeOf(obj[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return node+'.'+k
        }
        if (typeof obj[k] == "object") {
            let node2 = findNaN(obj[k], str, data[k], (node?node+'.':'')+k)
            if (node2) return node2
        }
    }

    return false
}