var popups = []
var popupIndex = 0

function updatePopupIndex() {
    let i
    for (i = 0; i < popups.length; i++) {
        if (!popups[i]) {
            popupIndex = i
            return
        }
    }
    popupIndex = i
}


const POPUP_GROUPS = {
fonts: {
    // <button class="btn" style="font-family: Comic Sans MS;" onclick="player.options.font = 'Comic Sans MS'">Comic Sans MS</button>
    html: `
        <button class="btn" style="font-family: 'Andy Bold';" onclick="player.options.font = 'Andy Bold'">Andy Bold</button>
        <button class="btn" style="font-family: Arial, Helvetica, sans-ser;" onclick="player.options.font = 'Arial, Helvetica, sans-ser'">Arial</button>
        <button class="btn" style="font-family: Bahnschrift;" onclick="player.options.font = 'Bahnschrift'">Bahnschrift</button>
        <button class="btn" style="font-family: Courier;" onclick="player.options.font = 'Courier'">Courier</button>
        <button class="btn" style="font-family: Cousine;" onclick="player.options.font = 'Cousine'">Cousine</button>
        <button class="btn" style="font-family: 'Flexi IBM VGA False';" onclick="player.options.font = 'Flexi IBM VGA False'">Flexi IBM VGA False</button>
        <button class="btn" style="font-family: Inconsolata;" onclick="player.options.font = 'Inconsolata'">Inconsolata</button>
        <button class="btn" style="font-family: 'Lato';" onclick="player.options.font = 'Lato'">Lato</button>
        <button class="btn" style="font-family: 'Lucida Handwriting';" onclick="player.options.font = 'Lucida Handwriting'">Lucida Handwriting</button>
        <button class="btn" style="font-family: 'Lunasima';" onclick="player.options.font = 'Lunasima'">Lunasima</button>
        <button class="btn" style="font-family: Monospace-Typewritter;" onclick="player.options.font = 'Monospace-Typewritter'">Monospace Typewritter</button>
        <button class="btn" style="font-family: 'MS Sans Serif';" onclick="player.options.font = 'MS Sans Serif'">MS Sans Serif</button>
        <button class="btn" style="font-family: 'Noto Sans JP';" onclick="player.options.font = 'Noto Sans JP'">Noto Sans JP</button>
        <button class="btn" style="font-family: 'Nova Mono';" onclick="player.options.font = 'Nova Mono'">Nova Mono</button>
        <button class="btn" style="font-family: 'Nunito';" onclick="player.options.font = 'Nunito'">Nunito</button>
        <button class="btn" style="font-family: 'Retron2000';" onclick="player.options.font = 'Retron2000'">Retron 2000</button>
        <button class="btn" style="font-family: 'Roboto';" onclick="player.options.font = 'Roboto'">Roboto</button>
        <button class="btn" style="font-family: 'Roboto Mono';" onclick="player.options.font = 'Roboto Mono'">Roboto Mono</button>
        <button class="btn" style="font-family: 'Source Sans Pro';" onclick="player.options.font = 'Source Sans Pro'">Source Sans Pro</button>
        <button class="btn" style="font-family: 'Source Serif Pro';" onclick="player.options.font = 'Source Serif Pro'">Source Serif Pro</button>
        <button class="btn" style="font-family: Verdana, Geneva, Tahoma, sans-serif;" onclick="player.options.font = 'Verdana, Geneva, Tahoma, sans-serif'">Verdana</button>
    `
},
notations: {
    html: `
        <button class="btn" onclick="player.options.notation = 'elemental'">Elemental</button>
        <button class="btn" onclick="player.options.notation = 'eng'">Engineering</button>
        <button class="btn" onclick="player.options.notation = 'inf'">Infinity</button>
        <button class="btn" onclick="player.options.notation = 'mixed_sc'">Mixed Scientific</button>
        <button class="btn" onclick="player.options.notation = 'layer'">Prestige Layer</button>
        <button class="btn" onclick="player.options.notation = 'sc'">Scientific</button>
        <button class="btn" onclick="player.options.notation = 'st'">Standard</button>
        <button class="btn" onclick="player.options.notation = 'old_sc'">Old Scientific</button>
        <button class="btn" onclick="player.options.notation = 'omega'">Omega</button>
        <button class="btn" onclick="player.options.notation = 'omega_short'">Omega Short</button>
    `
}}

function addNotify(text, duration=3) {
    tmp.notify.push({text: text, duration: duration});
    if (tmp.notify.length == 1) updateNotify()
}

function removeNotify() {
    if (tmp.saving > 0 && tmp.notify[0]?tmp.notify[0].text="Game Saving":false) tmp.saving--
    if (tmp.notify.length <= 1) tmp.notify = []
    let x = []
    for (let i = 1; i < tmp.notify.length; i++) x.push(tmp.notify[i])
    tmp.notify = x
    tmp.el.notify.setVisible(false)
    updateNotify()
}

function updateNotify() {
    if (tmp.notify.length > 0) {
        tmp.el.notify.setHTML(tmp.notify[0].text)
        tmp.el.notify.setVisible(true)
        tmp.el.notify.setClasses({hide: false})
        setTimeout(()=>{
            tmp.el.notify.setClasses({hide: true})
            setTimeout(removeNotify, 750)
        }, tmp.notify[0].duration*1000)
    }
}



function createPopup(text, id, txtButton) {
    if (popups.includes(id)) return

    popups[popupIndex] = id
    updatePopupIndex()

    const popup = document.createElement('div')
    popup.className = 'popup'
    popup.innerHTML = `
    <div>
        ${text}
    </div><br>
    `

    const textButton = document.createElement('button')
    textButton.className = 'btn'
    textButton.innerText = txtButton||"Awesome!"
    textButton.onclick = () => {
        popups[popups.indexOf(id)] = undefined
        updatePopupIndex()
        popup.remove()
    }

    popup.appendChild(textButton)

    document.getElementById('popups').appendChild(popup)
}

function createConfirm(text, id, yesFunction, noFunction) {
    if (popups.includes(id)) return

    popups[popupIndex] = id
    updatePopupIndex()

    const popup = document.createElement('div')
    popup.className = 'popup'
    popup.innerHTML = `
    <div>
        ${text}
    </div><br>
    `

    const yesButton = document.createElement('button')
    yesButton.className = 'btn'
    yesButton.innerText = "Yeah!"
    yesButton.onclick = () => {
        popups[popups.indexOf(id)] = undefined
        updatePopupIndex()
        if (yesFunction) yesFunction()
        popup.remove()
    }

    const noButton = document.createElement('button')
    noButton.className = 'btn'
    noButton.innerText = "No way!"
    noButton.onclick = () => {
        popups[popups.indexOf(id)] = undefined
        updatePopupIndex()
        if (noFunction) noFunction()
        popup.remove()
    }

    popup.appendChild(yesButton)
    popup.appendChild(noButton)

    document.getElementById('popups').appendChild(popup)
}

function createPrompt(text, id, func) {
    if (popups.includes(id)) return

    popups[popupIndex] = id
    updatePopupIndex()

    const popup = document.createElement('div')
    popup.className = 'popup'
    popup.innerHTML = `
    <div>
        ${text}
    </div><br>
    `

    const br = document.createElement("br")

    const input = document.createElement('input')

    const textButton = document.createElement('button')
    textButton.className = 'btn'
    textButton.innerText = "Okay!"
    textButton.onclick = () => {
        popups[popups.indexOf(id)] = undefined
        updatePopupIndex()
        if (func) func(input.value)
        popup.remove()
    }

    popup.appendChild(input)

    popup.appendChild(br)

    popup.appendChild(textButton)

    document.getElementById('popups').appendChild(popup)
}

let SEED = [42421n, 18410740n, 9247923n]

function convertStringIntoAGY(s) {
    let ca = ` abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?!/<>@#$%^&*()_-+=~№;:'"[]{}|`, cl = BigInt(ca.length), r = 0n, sd = SEED[0], result = ''

    for (let i = BigInt(s.length)-1n; i >= 0n; i--) {
        let q = BigInt(ca.indexOf(s[i])), w = q >= 0n ? cl**(BigInt(s.length)-i-1n)*q : 0

        if (i % 2n == 0n && w % 3n == i % (w % 4n + 2n)) w *= (w % 4n + 2n) * (i + 1n)

        r += w * sd

        sd = (sd + SEED[2]**(i % 3n + i * (q + 2n) % 3n)) % SEED[1]
    }

    while (r > 0n) {
result += ca[r % cl]

        r /= cl
    }

    return result
}




function setupStatsHTML() {
    let h = ""

    for (let i in RANKS.names) {
        h += `<div id="stats_${RANKS.names[i]}_btn" style="width: 145px"><button class="btn_tab" onclick="player.ranks_reward = ${i}">${RANKS.fullNames[i]}</button></div>`
    }

    new Element("ranks_reward_btn").setHTML(h)

    h = ""

    for (let i in SCALE_TYPE) {
        h += `<div id="stats_${SCALE_TYPE[i]}_btn" style="width: 145px"><button class="btn_tab" onclick="player.scaling_ch = ${i}">${FULL_SCALE_NAME[i]}</button></div>`
    }

    new Element("scaling_btn").setHTML(h)//tmp.el.help_time_btn.setAttr('onclick',createHelpPopup('time'))
}

function updateStatsHTML() {
    if (player.stab[4] == 0) for (let i in RANKS.names) {
        tmp.el[`stats_${RANKS.names[i]}_btn`].setDisplay(player.ranks[RANKS.names[i]].gt(0))
    }
    else if (player.stab[4] == 1) for (let i in SCALE_TYPE) {
        tmp.el[`stats_${SCALE_TYPE[i]}_btn`].setDisplay(tmp.scaling[SCALE_TYPE[i]].length>0)
    }
}

function capitalFirst(str) {
	if (str=="" || str==" ") return str
	return str
		.split(" ")
		.map(x => x[0].toUpperCase() + x.slice(1))
		.join(" ");
}