const ELEMENTS = {
    map: [
        `x_________________xvxx___________xxxxxxvxx___________xxxxxxvxx_xxxxxxxxxxxxxxxxvxx_xxxxxxxxxxxxxxxxvxx1xxxxxxxxxxxxxxxxvxx2xxxxxxxxxxxxxxxxv_v__3xxxxxxxxxxxxxx__v__4xxxxxxxxxxxxxx__`,
    ],
    la: [null,'*','**','*','**'],
    exp: [0,118,218,362,558,814,1138],
    max_hsize: [19],
    names: [
        null,
        'H','He','Li','Be','B','C','N','O','F','Ne',
        'Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca',
        'Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn',
        'Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr',
        'Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn',
        'Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd',
        'Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb',
        'Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg',
        'Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th',
        'Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm',
        'Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds',
        'Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'
    ],
    fullNames: [
        null,
        'Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon',
        'Sodium','Magnesium','Aluminium','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium',
        'Scandium','Titanium','Vanadium','Chromium','Manganese','Iron','Cobalt','Nickel','Copper','Zinc',
        'Gallium','Germanium','Arsenic','Selenium','Bromine','Krypton','Rubidium','Strontium','Yttrium','Zirconium',
        'Niobium','Molybdenum','Technetium','Ruthenium','Rhodium','Palladium','Silver','Cadmium','Indium','Tin',
        'Antimony','Tellurium','Iodine','Xenon','Caesium','Barium','Lanthanum','Cerium','Praseodymium','Neodymium',
        'Promethium','Samarium','Europium','Gadolinium','Terbium','Dysprosium','Holmium','Erbium','Thulium','Ytterbium',
        'Lutetium','Hafnium','Tantalum','Tungsten','Rhenium','Osmium','Iridium','Platinum','Gold','Mercury',
        'Thallium','Lead','Bismuth','Polonium','Astatine','Radon','Francium','Radium','Actinium','Thorium',
        'Protactinium','Uranium','Neptunium','Plutonium','Americium','Curium','Berkelium','Californium','Einsteinium','Fermium',
        'Mendelevium','Nobelium','Lawrencium','Rutherfordium','Dubnium','Seaborgium','Bohrium','Hassium','Meitnerium','Darmstadium',
        'Roeritgenium','Copernicium','Nihonium','Flerovium','Moscovium','Livermorium','Tennessine','Oganesson'
    ],
    canBuy(x) {
        let u = this.upgs[x]
        return player.sn.ions.gte(u.cost)
    },
    buyUpg(x) {

        if (this.canBuy(x)) {
            let u = this.upgs[x]
            player.sn.elem.push(x)
            
            player.sn.ions = player.sn.ions.sub(u.cost)
        }
    },
    upgs: [
        null,
        {
            cost: E(1),
            desc: "Prestige formula is better."
        },
        {
            cost: E(7),
            desc: "Points are boosted by supernova time.",
            effect() {
                let eff = E(player.sn.time).div(10).root(3).add(1)

                return eff
            },
            effDesc: x => formatMult(x)
        },
        {
            cost: E(100),
            desc: "Unlock the third rank type."
        },
        {
            cost: E(7.5e3),
            desc: "Gain more Prestige Points based off of unspent Ions.",
            effect() {
                let eff = player.sn.ions.div(2).root(3).add(1)

                return eff
            },
            effDesc: x => formatMult(x)
        }
        /*{
            cost: E(1e9),
            effect() {
                let x = E(1)

                return x
            },
            effDesc(x) => formatMult(x)
        } */
    ],

    getUnlLength() {
        let u = 4
        let snt = player.sn.tier
        if (snt.gte(1)) u += 4


        return u
    },
}

const MAX_ELEM_TIERS = 1


function getElementName(x) {
    if (x <= 118) return ELEMENTS.fullNames[x]
    let log = Math.floor(Math.log10(x))
    let listF = ["Nil", "Un", "Bi", "Tri", "Quad", "Pent", "Hex", "Sept", "Oct", "Enn"]
    let list = ["nil", "un", "bi", "tri", "quad", "pent", "hex", "sept", "oct", "enn"]
    let r = ""
    for (var i = log; i >= 0; i--) {
        let n = Math.floor(x / Math.pow(10, i)) % 10
        if (r == "") r = listF[n]
        else r += list[n]
        if (i == 0) r += n != 2 && n != 3 ? "ium" : "um"
    }
    return r
}

for (let x = 1; x <= MAX_ELEM_TIERS; x++) {
    let [ts,te] = [ELEMENTS.exp[x-1],ELEMENTS.exp[x]]

    if (x > 1) {
        ELEMENTS.max_hsize[x-1] = 11 + 4*x

        let m = 'xx1xxxxxxxxxxxxxxxxvxx2xxxxxxxxxxxxxxxxv_v'

        for (let y = x; y >= 1; y--) {
            let k = 10 + 4 * y
            m += "1"+'x'.repeat(k)+"v"
            m += "2"+'x'.repeat(k)
            if (y > 1) m += "v_v"
        }

        for (let y = ts+1; y <= te; y++) {
            ELEMENTS.names.push(getElementId(y))
            ELEMENTS.fullNames.push(getElementName(y))
            if (!ELEMENTS.upgs[y]) ELEMENTS.upgs.push({
                desc: `Placeholder.`,
                cost: EINF,
            })
        }

        ELEMENTS.map.push(m)
    }

    if (x == 1) {
        for (let n = 1; n <= 118; n++) {
            if (!ELEMENTS.upgs[n]) ELEMENTS.upgs.push({
                desc: `Placeholder.`,
                
                cost: EINF
            })
        }
    }

    // Muonic Elements

    /*for (let y = ts+1; y <= te; y++) {
        if (!MUONIC_ELEM.upgs[y]) MUONIC_ELEM.upgs.push({
            desc: `Placeholder.`,
            cost: EINF,
        })
    }*/
}

function buyElement(x,layer=1) {
    if (layer==1) {
        ELEMENTS.buyUpg(x)
    } else if (layer==2) {

    }
}

function hasElement(x) {
    return player.sn.elem.includes(x)
}

function elemEffect(x,def=1) {
    return tmp.elem.effect[x]||def
}

const html = {
    setup: {},
    update: {}
}

html.setup.elements = () => {
    let elem_table = new Element("elements_table")
    let table = ""
    let num = 0
    for (let k = 1; k <= MAX_ELEM_TIERS; k++) {
        let hs = `style="width: ${50*ELEMENTS.max_hsize[k-1]}px; margin: auto"`
        table += `<div id='elemTier${k}_div'><div ${hs}><div class='table_center'>`
        for (let i = 0; i < ELEMENTS.map[k-1].length; i++) {
            let m = ELEMENTS.map[k-1][i]
            if (m=='v') table += `</div><div class="table_center">`
            else if (m=='_' || !isNaN(Number(m))) table += `<div ${ELEMENTS.la[m]!==undefined&&k==1?`id='element_la_${m}'`:""} style="width: 50px; height: 50px">${ELEMENTS.la[m]!==undefined?"<br>"+ELEMENTS.la[m]:""}</div>`
            else if (m=='x') {
                num++
                table += ELEMENTS.upgs[num]===undefined?`<div style="width: 50px; height: 50px"></div>`
                :`<button class="elements ${num == 118 ? 'final' : ''}" id="Element${num}" style="width: 50px; height: 50px;" onclick="buyElement(${num})" onmouseover="player.chosenElem = ${num}" onmouseleave="player.chosenElem = 0">
                <div style="font-size: 12px;">${num}</div>${ELEMENTS.names[num]}
                </button>`
                if (num==56 || num==88) num += 14
                else if (num==70) num += 18
                else if (num==118) num = 56
                else if (num==102) num = 118
            }
        }
    }
    table += "</div></div></div>"


    elem_table.setHTML(table)

}

function setupHTML() {
    for (i in html.setup) {
        html.setup[i]()
    }
}

function updateHTML() {
    for (i in html.update) {
        html.update[i]()
    }
}

html.update.elements = () => {
    let tElem = tmp.elem
    let ch = player.chosenElem > 0
    for (let x = 1; x < ELEMENTS.upgs.length; x++) {
        /**@param how @param the @param hell. */
        tmp.el[`Element${x}`].setClasses({elements: true, bought: hasElement(x)})
        tmp.el[`Element${x}`].setDisplay(tElem.unl_length >= x)
    }
    tmp.el.elem_ch_div.setDisplay(ch)
    if (ch) {
        let u = ELEMENTS.upgs[player.chosenElem]
        let tElem = tmp.elem
        /**@param youarenotreal. */
        let res = [u.dark?'Dark Shadow':(u.cost.gt(1)?'Ions':'Ion')]
        tmp.el.elem_eff.setDisplay(u.effect && u.effDesc)
        tmp.el.elem_eff.setHTML(u.effDesc ? `Currently: ${u.effDesc(tElem.effect[player.chosenElem])}`: ``)
        tmp.el.elem_desc.setHTML(`<b>[${ELEMENTS.names[player.chosenElem]}-${player.chosenElem}]</b> ${u.desc}`)
        tmp.el.elem_cost.setHTML(hasElement(player.chosenElem) ? '' : `Cost: ${format(u.cost, 0)} ${res}`)
    }


    let unllen = tElem.unl_length
    tmp.el.element_la_1.setVisible(unllen>56)
    tmp.el.element_la_3.setVisible(unllen>56)
    tmp.el.element_la_2.setVisible(unllen>88)
    tmp.el.element_la_4.setVisible(unllen>88)
}
tmp_update.push(()=>{
    if (!tmp.elem) tmp.elem = {}
    if (!tmp.elem.effect) tmp.elem.effect = []
    let tElem = tmp.elem
    tmp.elem.choseElem = player.chosenElem > 0
    if (!tElem.upg_length) tElem.upg_length = ELEMENTS.upgs.length-1
    for (let x = tElem.upg_length; x >= 1; x--) if (ELEMENTS.upgs[x].effect) {
        tElem.effect[x] = ELEMENTS.upgs[x].effect()
    }

    tElem.unl_length = ELEMENTS.getUnlLength()

})