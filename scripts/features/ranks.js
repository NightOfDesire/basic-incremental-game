const RANKS = {
    names: ['rank','tier','asc'],
    fullNames: ['Rank','Tier','Asc'],
    reset(type) {
        if (tmp.ranks[type].can) {
            player.ranks[type] = player.ranks[type].add(1)
            let reset = true
           
            if (reset) this.doReset[type]()
            updateRanksTemp()

           
        }
    },
    bulk(type) {
        if (tmp.ranks[type].can) {
            player.ranks[type] = player.ranks[type].max(tmp.ranks[type].bulk.max(player.ranks[type].add(1)))
            let reset = true
            
            if (reset) this.doReset[type]()
            updateRanksTemp()
        }
    },
    reqs: {
        rank(x=player.ranks.rank){
            let start = E(2.5e5)
            let inc = E(10)
            inc = inc.pow(x.div(25).add(1))
            
            return {start: start, inc: inc}
        },
        tier(x=player.ranks.tier){
            let start = E(10)
            let inc = E(1.2)
            inc = inc.pow(x.div(35).add(1))
            
            return {start: start, inc: inc}
    }
    },

    unl: {
       tier() { return true},
       asc() { return hasElement(3)}
    },
    doReset: {
        rank() {
            player.pts = E(0)
            player.prestige.pts = E(0)
            for (let x = 1; x <= 3; x++) BUILDINGS.reset("points_"+x)
        },
        tier() {
            player.ranks.rank = E(0)
            this.rank()
        },
        asc() {
            player.ranks.tier = E(0)
            this.tier()
        }
    },

    autoSwitch(rn) { player.auto_ranks[rn] = !player.auto_ranks[rn] },
    autoUnl: {
        rank() { return player.ranks.tier.gte(1) },
        tier() { return false },
        asc() { return false }
       
    },
    desc: {
        rank: {
            '1': "unlock first point upgrade.",
            '2': "unlock second point upgrade, gain x3 points",
            '3': "unlock third point upgrade, points are boosted by ((x+1)^2)^0.8, where x is your rank.",
            '4': "first point upgrade's base is increased by its amount (x/20)",
            '5': "second point upgrade's base is increased by its amount (x/33)"
        },
        tier: {
            '1': "unlock auto rank and The Time",
            '2': "Unlock passive prestige, you no longer need to manually buy point upgrades!",
        },
        asc: {

        }
    },
    effect: {
        rank: {
           '3'() {
            let ret = player.ranks.rank.add(1).pow(2).pow(0.8)

            return ret
           },
           /**@param how */
           '4'() {
            /**@param {string} title */
            let ret = player.build.points_1.amt.div(20)

            return ret
           },
           '5'() {
            let ret = player.build.points_2.amt.div(33)

            return ret
           },
      
        },
        tier: {

        },
        asc: {

        }
    },
    effDesc: {
        rank: {
            3(x) { return formatMult(x) },
            4(x) { return formatAdd(x) },
            5(x) { return formatAdd(x) }
        },
        tier: {

        },
        asc: {

        }
    }
}

const RTNS = [
    ['','Rank','Tier','Tetr','Pent','Hex','Hept','Oct','Enne'],
    ['','dec','icos'], // d>2 -> cont
    ['','hect'], // h>1 -> ct
]

const RTNS2 = [
    ['','un','do','tri','tetra','penta','hexa','hepta','octa','nona'], // d < 3
    ['','un','du','tria','tetra','penta','hexa','hepta','octa','nona'],
    ['','un','di','tri','tetra','penta','hexa','hepta','octa','nona'], // h
]


function getRankTierName(i) {
    if (Decimal.gte(i,999)) return '['+format(i)+']'
    else {
        i = Number(i)

        if (i < 9) return RTNS[0][i]
        i += 1
        let m = ''
        let h = Math.floor(i / 100), d = Math.floor(i / 10) % 10, o = i % 10

        if (d > 1 && o == 1) m += 'hen' 
        else if (d == 2 && o == 3) m += 'tr' 
        else m += RTNS2[0][o]
        if (d > 2) m += RTNS2[1][d] + 'cont'
        else m += RTNS[1][d]
        if (h > 0 && d > 0) m += 'a'
        if (h > 0) m += (h > 1 ? RTNS2[2][h] + 'ct' : 'hect')

        return capitalFirst(m)
    }
}



tmp_update.push(()=>{
    if (!tmp.ranks) tmp.ranks = {}
    for (let x = 0; x < RANKS.names.length; x++) {
        let rn = RANKS.names[x]
        if (!tmp.ranks[rn]) tmp.ranks[rn] = {
            can: false
        }
    }

    for (let x = 0; x < RANKS.names.length; x++) {
        let rn = RANKS.names[x]
        /**@param hiii */
        /**@param WHOOPSSS */
        //tmp.ranks[rn].req = RANKS.reqs[rn]().start.mul(RANKS.reqs[rn]().inc.pow(player.ranks[rn])).scaleEvery(rn, false)
        tmp.ranks[rn].can = (RANKS.names[x-1]?player.ranks[RANKS.names[x-1]]:player.pts).gte(tmp.ranks[rn].req)
    }
        let fp = E(1)
        let rooted_fp = E(1)
        let rt_fp2 = E(1)
        let ffp2 = E(1)
        let ifp = E(1)


        tmp.ranks.rank.req = E(10).pow(player.ranks.rank.div(ffp2).scaleEvery('rank',false,[1,1,1,1,rt_fp2,1,ifp]).pow(rooted_fp).div(fp).pow(1.15)).mul(10)
        tmp.ranks.rank.bulk = E(0)
        if (player.pts.gte(10)) tmp.ranks.rank.bulk = player.pts.div(10).max(1).log10().root(1.15).mul(fp).root(rooted_fp).scaleEvery('rank',true,[1,1,1,1,rt_fp2,1,ifp]).mul(ffp2).add(1).floor();
        //if (player.pts.gte(10)) tmp.ranks.rank.bulk = player.pts.div(10).max(1).log(10).root(1.15).mul(fp).root(rooted_fp).scaleEvery('rank',true).floor();
        tmp.ranks.tier.req = player.ranks.tier.div(ifp).div(ffp2).scaleEvery('tier',false,[1,1,1,rt_fp2]).div(fp).add(2).pow(2).floor()
        tmp.ranks.tier.bulk = player.ranks.rank.max(0).root(2).sub(2).mul(fp).scaleEvery('tier',true,[1,1,1,rt_fp2]).mul(ffp2).mul(ifp).add(1).floor();
        let asc_fp2 = E(1)
        let tps = 0
        let pow = 2
        tmp.ranks.asc.req = player.ranks.asc.div(ifp).div(ffp2).scaleEvery('asc',false,[1,1,1,asc_fp2]).div(fp).pow(pow).mul(3).add(10-tps).floor()
        tmp.ranks.asc.bulk = player.ranks.tier.sub(10-tps).div(3).max(0).root(pow).mul(fp).scaleEvery('asc',true,[1,1,1,asc_fp2]).mul(ffp2).mul(ifp).add(1).floor();
    
})

el.update.ranks = () => {
    

   
        for (let x = 0; x < RANKS.names.length; x++) {
            let rn = RANKS.names[x]
            let unl = (!tmp.brUnl || x > 3)&&(RANKS.unl[rn]?RANKS.unl[rn]():true)
            tmp.el["ranks_div_"+x].setDisplay(unl)
            if (unl) {
                let keys = Object.keys(RANKS.desc[rn])
                let desc = ""
                for (let i = 0; i < keys.length; i++) {
                    if (player.ranks[rn].lt(keys[i])) {
                        desc = ` At ${RANKS.fullNames[x]} ${format(keys[i],0)} - ${RANKS.desc[rn][keys[i]]}`
                        break
                    }
                }
    
                tmp.el["ranks_scale_"+x].setTxt(getScalingName(rn))
                tmp.el["ranks_amt_"+x].setTxt(format(player.ranks[rn],0))
                tmp.el["ranks_"+x].setClasses({btn: true, reset: true, locked: !tmp.ranks[rn].can})
                tmp.el["ranks_desc_"+x].setTxt(desc)
                tmp.el["ranks_req_"+x].setTxt(x==0?format(tmp.ranks[rn].req) + " Points":RANKS.fullNames[x-1]+" "+format(tmp.ranks[rn].req,0))
                tmp.el["ranks_auto_"+x].setDisplay(RANKS.autoUnl[rn]())
                tmp.el["ranks_auto_"+x].setTxt(player.auto_ranks[rn]?"ON":"OFF")
            }
}
}