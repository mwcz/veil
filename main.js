var INTRO = [
    "\"Goodnight\", a waving hand glides past the corner of your eye as your last",
    "colleague leaves for the weekend.  You're momentarily distracted by a muffled",
    "hiss followed by a pleasant beep; the sterilization chamber letting her out.",
    "Were you given a choice, you'd be running out the door too, but that isn't an",
    "option for you.  This software isn't going to write itself.  You must get back",
    "to work.",
    "",
    "",
    "                            <span class=glitch data-text='THE VEIL MACHINE'></span>",
    "",
    "                            A text adventure",
    "",
    "Copyright (c) 2016 by Michael Clayton.  All rights reserved.",
    "Built with the VMachine engine.",
    "",
    "",
    "",
    "",
];
var eye_lines = [
    "                            ...',;;:cccccccc:;,..",
    "                        ..,;:cccc::::ccccclloooolc;'.",
    "                     .',;:::;;;;:loodxk0kkxxkxxdocccc;;'..",
    "                   .,;;;,,;:coxldKNWWWMMMMWNNWWNNKkdolcccc:,.",
    "                .',;;,',;lxo:...dXWMMMMMMMMNkloOXNNNX0koc:coo;.",
    "             ..,;:;,,,:ldl'   .kWMMMWXXNWMMMMXd..':d0XWWN0d:;lkd,",
    "           ..,;;,,'':loc.     lKMMMNl. .c0KNWNK:  ..';lx00X0l,cxo,.",
    "         ..''....'cooc.       c0NMMX;   .l0XWN0;       ,ddx00occl:.",
    "       ..'..  .':odc.         .x0KKKkolcld000xc.       .cxxxkkdl:,..",
    "     ..''..   ;dxolc;'         .lxx000kkxx00kc.      .;looolllol:'..",
    "    ..'..    .':lloolc:,..       'lxkkkkk0kd,   ..':clc:::;,,;:;,'..",
    "    ......   ....',;;;:ccc::;;,''',:loddol:,,;:clllolc:;;,'........",
    "        .     ....'''',,,;;:cccccclllloooollllccc:c:::;,'..",
    "                .......'',,,,,,,,;;::::ccccc::::;;;,,''...",
    "                  ...............''',,,;;;,,''''''......",
    "                       ............................",
    "",
    "",
    "",
    "                            ...'',;;;;::;;;,'..",
    "                       ..,;:cloodddxxxkkkkkkkkxol;..",
    "                    .';codxxkkk000000000000kkkkkkxdoc,..",
    "                  .,codxk0000000000000000000000000kkxddoc,..",
    "               .':ldxk00000000000000000000000000000000kkxxol:'",
    "            .,:ldxkk000000000K000000000000000K0000000000kkxkkx:.",
    "         ..,coxkk000000000000000kk000000000000000000000000kxxxxl'",
    "        .,;codxxkk00000000kkk0KK0XNWWWWWWWWWNX0kkkkk00000kkxdool;.",
    "      .';::ccldk00KKKK00oc;..,x00KNNXXXXXNNX0000000000kkkkkkxoc:,..",
    "    ..,;,'..,o00000kkxo,       ,lkKKKKKK0K0d,.;ldk000KK0kxxxdoc:'..",
    "   ..,,'.  .,lk0xxxdol:,..       .,ldddl:,.   .,codkk00kxdollc:,...",
    "   ..'.......',;:c::cclccc::;,,,',,;::::;,;;:clodddxdol:;::;'......",
    "      .....  ...''',,,;;;:ccllloooooooooooooolllcccc:;;,....",
    "               .......'',,,,,,;;;:::ccclllccc:::;;;,''...",
    "                 ..............'''',,;;;;;,,,''''......",
    "                      .............................",
    "",
    "",
    "",
    "                           ...'',;;;;;;;,,...",
    "                      ..,:loxkk000000KKKKKK00xdc,..",
    "                   .,cox000KXXXXXXXXXXXXXXXXXXXK00xo:,..",
    "                ..;lx000KKKKK000000000000000KKKKXXXXK00xl;..",
    "             ..,:oxk00000000000000000000000000000000KKKKKK0d:.",
    "          ..;codxkk000kkkkkkkxxxxxxxxxxxxxxxxkkkkkk000000KK0kl'",
    "        ..;ldxkkkkkkxxxxxddddddddddddddddddddddddxxxxxxkkk000xc.",
    "      ..,:oxxkkkkkxxxxdddddddddddddddddddddddddddddddddxxkkkkxl;.",
    "    ..,;codxxkkkxxddddddddddddddddddddddddddddddddxdxxxk000kxdo:..",
    "   .';::::cldk000kkkxxxxxxdddddddddddddddddddddxxxxxkk0000xkddl;..",
    "  .';:;,..,ckXXXKKK0KK000kxk0doddxxdddddddxxxxxxkk0000kkkkkxdoc,..",
    "  .',,''..,:oxxxxxxxkkxkkxk00xxk000000000000KKKKKKK000kxdllll:,..",
    "   .........',,,:ccllllooooxkxxx000kk0000000000000000kxdoc,'...",
    "           ......',;;::cc::clllloddoox0xdxxkxxxxddollllc:'.",
    "                .....'',,,,,,,;;;;;::cllc::ccc::;;,,,'...",
    "                    ..................'''..'''......",
    ];

var state = {
    intro: INTRO,
    lines: _.clone(eye_lines),
};

var font = "amiga 16px";

var ractive = new Ractive({
    // The `el` option can be a node, an ID, or a CSS selector.
    el: 'main',

    // We could pass in a string, but for the sake of convenience
    // we're passing the ID of the <script> tag above.
    template: '#template',

    // Here, we're passing in some initial data
    data: state,
});


// credit: http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
function get_text_width(text, font) {
    // re-use canvas object for better performance
    var canvas = get_text_width.canvas || (get_text_width.canvas = document.createElement("canvas"));
    var context = get_text_width.context || (get_text_width.context = canvas.getContext("2d"));
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

var update_lines = _.throttle(function add_line() {
    var rand_line = ~~(Math.random() * state.lines.length);
    state.lines.push( state.lines.splice(rand_line, 1)[0] );
    // state.lines.push( state.lines.splice(0, 1)[0] );
}, 70);

function update() {
    requestAnimationFrame(update);
    update_lines();
    console.log('added a line of width ' + get_text_width(_.last(state.lines), font) + 'px');
    ractive.update();
}

function greyscale() {
    document.body.classList.add('greyscale');
}

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(greyscale);

update();

