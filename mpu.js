
var socket;

var firstconnect = true,
fs = 8000,
Ts = 1/fs*1000,
samples = 80,

plotTop,

samplesCollected = 0,

globalDataX = [],globalDataY = [],globalDataZ = [];

globalDataX[samples] = 0,globalDataY[samples] = 0,globalDataZ[samples] = 0;

function connect()
 {
      if(firstconnect) 
      {
        socket = io.connect(null);

    	socket.emit('mpustart',1);

    	socket.on('mpu',refreshmpu);

            firstconnect = false;
      }
      else 
      {
        socket.socket.reconnect();
      }

    function disconnect()
     {
      socket.disconnect();
    }
}

connect();

function refreshmpu(data)
{
    $("#0").html(data[0]);
    $("#1").html(data[1]);
    $("#2").html(data[2]);
    $("#0g").html(Math.round(1000*data[0]/16384.0)/1000 + "g");
    $("#1g").html(Math.round(1000*data[1]/16384.0)/1000 + "g");
    $("#2g").html(Math.round(1000*data[2]/16384.0)/1000 + "g");

    if (samplesCollected < samples) {
	globalDataX[samplesCollected] = [samplesCollected*Ts, Math.round(1000*data[0]/16384.0)/1000];
	globalDataY[samplesCollected] = [samplesCollected*Ts, Math.round(1000*data[1]/16384.0)/1000];
	globalDataZ[samplesCollected] = [samplesCollected*Ts, Math.round(1000*data[2]/16384.0)/1000];

	samplesCollected++;

	plotTop.setData([globalDataX,globalDataY,globalDataZ]);
    	plotTop.draw();

    } 
    else 
    {
    	samplesCollected = 0;
	    plotTop.setData([globalDataX,globalDataY,globalDataZ]);
    	plotTop.draw();
    }
}

$(function () 
{

    function initPlotData() 
    {
        var result = [];
        for (var i = 0; i <= samples; i++)
            result[i] = [i*Ts, 0];
        return result;
    }

    var updateInterval = 100;

    var optionsTop = 
    {
        series: { 
            shadowSize: 0, /
            points: { show: false},
            lines:  { show: true, lineWidth: 3}
        }, 
        yaxis:  { min: -2, max: 2 },
        xaxis:	{ show: true },
        legend:	{ position: "ne" }
    };

    console.log("setting up plot");
    plotTop = $.plot($("#plotTop"), 
        [ 
          { data:  initPlotData(), 
            label: "X" },
          { data:  initPlotData(), 
            label: "Y" },
	  { data:  initPlotData(), 
            label: "Z" }
        ],
            optionsTop );

    
    function update() 
    {
        socket.emit('mpustart', 1);
        setTimeout(update, updateInterval);
    }
    update();
});

