const TABS = {
    choose(x, stab) {
        if (stab) player.stab[player.tab] = x
        player.tab = x
    },

    1: [
        {id:"Main"},
        {id:"Elements"},
        {id:"Stats"},
        {id:"Settings"}
    ],
    2: {
        0: [
            {id:"Points"}
        ],
        1: [
            {id:"Elements",style:"light_green"}
        ],
        2: [
            {id:"Rank rewards"},
            {id:"Scaling"}
        ],
        3: [
            {id:"Options"}
        ]
    }
}