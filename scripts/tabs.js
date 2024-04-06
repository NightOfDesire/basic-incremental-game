const TABS = {
    choose(x, stab) {
        if (stab) player.stab[player.tab] = x
        player.tab = x
    },

    1: [
        {id:"Main"},
        {id:"Settings"}
    ],
    2: {
        0: [
            {id:"Main"}
        ],
        1: [
            {id:"Options"}
        ]
    }
}