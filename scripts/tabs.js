const TABS = {
    choose(x, stab) {
        if (stab) player.stab[player.tab] = x
        player.tab = x
    },

    1: [
        {id:"Main"},
        {id:"Prestige",unl() {return false}},
        {id:"Elements"},
        {id:"Stats"},
        {id:"Settings"}
    ],
    2: {
        0: [
            {id:"Points"}
        ],
        1: [
            {id:"Main"}
        ],
        2: [
            {id:"Elements",style:"light_green"}
        ],
        3: [
            {id:"Rank rewards"},
            {id:"Scaling"}
        ],
        4: [
            {id:"Options"}
        ]
    }
}