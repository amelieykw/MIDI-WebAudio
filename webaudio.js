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
// params
var params = document.getElementsByTagName('webaudio-param');
var paramsVal = [0, 0];
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
        str += "(" + i + ")"+ event.data[i].toString(10) + " "; 
        
        // change the value of web components by the message sent by real device
        var event_data_1 = event.data[1].toString(10);
        if (event_data_1 == 21) {
            knobs[0].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 22) {
            knobs[1].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 23) {
            knobs[2].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 24) {
            knobs[3].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 25) {
            knobs[4].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 26) {
            knobs[5].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 27) {
            knobs[6].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 28) {
            knobs[7].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 41) {
            knobs[8].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 42) {
            knobs[9].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 43) {
            knobs[10].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 44) {
            knobs[11].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 45) {
            knobs[12].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 46) {
            knobs[13].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 47) {
            knobs[14].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 48) {
            knobs[15].setValue(event.data[2].toString(10), true);
        } else if (event_data_1 == 114) {
            if (event.data[2].toString(10) == 127) {
                sliders[0].setValue(++ paramsVal[0], true);
            }
        } else if (event_data_1 == 115) {
            if (event.data[2].toString(10) == 127) {
                sliders[0].setValue(-- paramsVal[0], true);
            }
        } else if (event_data_1 == 116) {
            if (event.data[2].toString(10) == 127) {
                sliders[1].setValue(++ paramsVal[1], true);
            }
        } else if (event_data_1 == 117) {
            if (event.data[2].toString(10) == 127) {
                sliders[1].setValue(-- paramsVal[1], true);
            }
        } else if (event_data_1 == 0) {
            if (event.data[7].toString(10) == 0) {
                switchs[0].setValue(1, true);
                switchs[1].setValue(0, true);
            } else if (event.data[7].toString(10) == 8){
                switchs[0].setValue(0, true);
                switchs[1].setValue(1, true);
            } else {
                switchs[0].setValue(0, true);
                switchs[1].setValue(0, true);
            }
        } else {
            
        }
        
    }
    
    console.log( str );
}

function startLoggingMIDIInput( midiAccess, indexOfPort ) {
    midiAccess.inputs.forEach( function(entry) {entry.onmidimessage = onMIDIMessage;});
}