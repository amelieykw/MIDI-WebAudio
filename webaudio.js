// knobs
var knobs = document.getElementsByTagName('webaudio-knob');
for (var i = 0; i < knobs.length; i++) {
    var knob = knobs[i];
    knob.addEventListener('change', change);
}
// sliders
var sliders = document.getElementsByTagName('webaudio-slider');
for (var i = 0; i < sliders.length; i++) {
    var slider = sliders[i];
    slider.addEventListener('change', change);
}
// switchs
var switchs = document.getElementsByTagName('webaudio-switch');
for (var i = 0; i < switchs.length; i++) {
    var switcher = switchs[i];
    switcher.addEventListener('change', change);
}
// keys
//var keyboard = document.getElementById("keyboard");
//keyboard.addEventListener('change', changeKeyboard);
        
// function for knobs/sliders/switchs
function change(e) {
    var str = e.type + " => " + e.target.id + " [ " + e.target.value + " ] ";
    console.log(str);
}
// function for keys
//function changeKeyboard(e) {
//    if(e.note[0])
//        console.log("Note-On: Key "+e.note[1]);
//    else
//        console.log("Note-Off: Key "+e.note[1]);
//}
        
/* Web MIDI API */
        
var midi, data;
// start talking to MIDI controller
if (navigator.requestMIDIAccess) {
    /* request access to the MIDI system, including the ability to send and receive system exclusive messages. (sysex: true) */
    navigator.requestMIDIAccess({
            sysex: true
        }).then(onMIDISuccess, onMIDIFailure);
    } else {
        console.warn("No MIDI support in your browser")
    }
     
// on success
function onMIDISuccess(midiAccess) {
    console.log( "MIDI ready!" );
    listInputsAndOutputs( midiAccess );
    startLoggingMIDIInput( midiAccess, 1 );
            
//          // this is all our MIDI data
//          midi = midiAccess;
//          var allInputs = midi.inputs.values();
//          // loop over all available inputs and listen for any MIDI input
//          for (var input = allInputs.next(); input && !input.done; input = allInputs.next())             {
//            // when a MIDI value is received call the onMIDIMessage function
//            input.value.onmidimessage = gotMIDImessage;
//          }
//        }
////        var dataList = document.querySelector('#midi-data ul')
//        function gotMIDImessage(messageData) {
////            var newItem = document.createElement('li');
////            newItem.appendChild(document.createTextNode(messageData.data));
////            dataList.appendChild(newItem);
//            console.log(messageData.data);
}

// on failure
function onMIDIFailure(msg) {
    console.warn("Not recognising MIDI controller")
    console.log( "Failed to get MIDI access - " + msg );
}
        
// gets the list of the input and output ports and prints their information to the console log
function listInputsAndOutputs( midiAccess ) {
    for (var entry of midiAccess.inputs) {
        var input = entry[1];
        console.log( "Input port [type:'" + input.type + "'] id:'" + input.id +
            "' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
            "' version:'" + input.version + "'" );
        }

    for (var entry of midiAccess.outputs) {
        var output = entry[1];
        console.log( "Output port [type:'" + output.type + "'] id:'" + output.id +
            "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
            "' version:'" + output.version + "'" );
        }
    }
        
// prints incoming MIDI messages on a single arbitrary input port to the console log.
function onMIDIMessage( event ) {
    var str = "MIDI message received [" + event.data.length + " bytes]: ";
    for (var i=0; i<event.data.length; i++) {
        str += event.data[i].toString(10) + " ";
    }
    console.log( str );
}

function startLoggingMIDIInput( midiAccess, indexOfPort ) {
    midiAccess.inputs.forEach( function(entry) {entry.onmidimessage = onMIDIMessage;});
}