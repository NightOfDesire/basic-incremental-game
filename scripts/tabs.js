const TABS = {
    choose(x, stab) {
        if (stab) player.stab[player.tab] = x
        player.tab = x
    },

    1: [
        {id:"Main"},
        {id:"Prestige",unl() {return false}},
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
            {id:"Rank rewards"},
            {}
        ],
        3: [
            {id:"Options"}
        ]
    }
}