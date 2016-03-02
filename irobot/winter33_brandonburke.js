var irobot = require('./index');

var robot = new irobot.Robot('/dev/ttyUSB0');

robot.on('ready', function() {
    console.log('READY');
});

// robot.on('sensordata', function (data) {
//   console.log('SENSOR DATA', data);
// });

var keypress = require('keypress');
velocity = { left: 0, right: 0 };
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function(ch, key) {
    console.log('got "keypress"', key);
    if (!key) return;

    if (key.name == 'w') {
        console.log("moved up");
        //up(10);
        velocity.left += 50;
        velocity.right += 50;
        robot.drive(velocity);
        //robot.rtsTrue();
    } else if (key.name == 's') {
        velocity.left -= 10;
        velocity.right -= 10;
        robot.drive(velocity);
        //robot.rtsFalse();
    } else if (key.name == 'd') {
        velocity.left -= 5;
        velocity.right += 5;
        robot.drive(velocity);
        console.log("moved right");
    } else if (key.name == 'a') {
        velocity.left += 50;
        velocity.right -= 50;
        robot.drive(velocity);
        console.log("moved left");
        //turnRightDegrees(10);
        //turnLeftDegrees(10);
    } else if (key.name == 'space') {
        console.log("stop me");
        velocity.left = 0;
        velocity.right = 0;
        robot.drive(velocity);
    } else if (key.name == 'f') {
        console.log("fullMode");
        robot.fullMode();
    } else if (key.name == 'p') {
        console.log("passiveMode");
        robot.passiveMode();
    } else if (key.name == 'g') {
        console.log("go -- safeMode");
        robot.safeMode();
    } else if (key.name == 'q') {
        console.log("play song");
        mysong = [
            [587, 900],
            [587, 450],
            [523, 450],
            [523, 400],
            [587, 400],
            [523, 400],
            [440, 400],
            [349, 400],
            [440, 400],
            [261, 400],
            [220, 400],
            [261, 400],
            [440, 400],
            [698, 400],
            [659, 400],
            [698, 400],
            [587, 400],
            [523, 400],
            [587, 400],
            [523, 400],
            [440, 400],
            [349, 400],
            [440, 400],
            [698, 200],
            [598, 200],
            [698, 200],
            [598, 200],
            [698, 200],
            [598, 200],
            [698, 200],
            [598, 200]
            
        ];
        robot.sing(mysong);

        setTimeout(function(){robot.drive({left: 1000, right: 1000});},0)

        setTimeout(function(){robot.drive({left: 1000, right: -1000});},2000)

        setTimeout(function(){robot.drive({left: 1000, right: 1000});},3500)

        setTimeout(function(){robot.drive({left: 1000, right: -1000});},5000)

        setTimeout(function(){robot.drive({left: 1000, right: 1000});},6000)

        setTimeout(function(){robot.drive({left: -1000, right: -1000});},7000)

        setTimeout(function(){robot.drive({left: 1000, right: 1000});},7500)

        setTimeout(function(){robot.drive({left: 1000, right: -1000});},8000)

        // setTimeout(function() {
        //                 socket.emit('drive', {left: 50, right: 50});
        //             }, 0);

        // setTimeout(function() {
        //                 socket.emit('drive', {left:-50, right: 50});
        //             }, 1000);

        // setTimeout(function() {
        //                 socket.emit('drive', {left: 50, right: 50});
        //             }, 3000);

        // setTimeout(function() {
        //                 socket.emit('drive', {left: 0, right: 0});
        //             }, 5000);
    }


    if (key && key.ctrl && key.name == 'c') {
        console.log('shift control.c');
        process.exit();
        //process.stdin.pause();
    }
});


process.stdin.setRawMode(true);

process.stdin.resume();
batteryVolts = 0;
robot.on('sensordata', function(data) {
    if (batteryVolts !== data.battery.voltage.volts) {
        batteryVolts = data.battery.voltage.volts;
        console.log('voltage', batteryVolts);
    }
});
robot.on('bump', function(e) {
    console.log('BUMP', e);
});
robot.on('button', function(e) {
    console.log('BUTTON', e);
});
robot.on('cliff', function(e) {
    console.log('CLIFF', e);
});
robot.on('ir', function(e) {
    console.log('IR', e);
});
robot.on('mode', function(e) {
    console.log('MODE', e);
});
robot.on('overcurrent', function(e) {
    console.log('OVERCURRENT', e);
});
robot.on('virtualwall', function(e) {
    console.log('VIRTUALWALL', e);
});
robot.on('wall', function(e) {
    console.log('WALL', e);
});
robot.on('wheeldrop', function(e) {
    console.log('WHEELDROP', e);
});
