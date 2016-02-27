import $ from 'jquery';
import './lib/speech';

if (annyang) {
    var commands = {
        "(hola)": function() {
            console.log('hola');
        }
    }
        
    annyang.addCommands(commands); 
    annyang.addCallback("resultMatch", function(n, a, o) {
        console.log("said: " + n + ", cmd: " + a + ", phrases: " + o)
    });
    annyang.debug(); 
    annyang.start();
}