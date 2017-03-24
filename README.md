## QCN | WorldWide Earthquake Catcher Network

The Quake-Catcher Network is a collaborative initiative for developing the world’s largest, low-cost strong-motion seismic network by utilizing sensors in and attached to internet-connected computers. With your help, the Quake-Catcher Network can provide better understanding of earthquakes, give early warning to schools, emergency response systems, and others

<p align="center"><img src="http://quakecatcher.net/sensor/img/trigger_latest_w.jpg" alt="Nodes presently active" width="600"/></p>
___________________________________________________________________________________________________

## QCN in action :) 

<p align="left"><img src="https://thumb.ibb.co/cyKhWF/xy.png" alt="sensor node" width="200"/><img src="https://thumb.ibb.co/daNuBF/READING_GOT.png" alt="sensor node" width="200"/><img src="https://thumb.ibb.co/guO9BF/server.png" alt="sensor node" width="200"/><img src="https://thumb.ibb.co/fwigQa/help.png" width="200"/></p>
  
QCN: How QCN helps in earthquakes (in rescue & research) ?       https://www.youtube.com/watch?v=DMVoesKNqNU

QCN: How a node works and sends real-time data to QCN servers ?  https://www.youtube.com/watch?v=-NTuPoXPWE8
___________________________________________________________________________________________________

for latest npm install-

sudo npm cache clean -f


sudo npm install -g n


sudo n stable


node -v to see version mine 7.6


to install bonescript - 


TERM=none npm install -g bonescript 


for socket.io-


npm install socket.io


to install other node.js packages to communicate with the device we are using-


npm config set strict-ssl false


npm install i2c


npm install mpu6050


npm install jquery


float charts have been used and included over here which is a jquery based plotting tool http://www.flotcharts.org/


just install these things and then run-


to enable i2c1 -


sudo sh -c "echo 'BB-I2C1' > /sys/devices/platform/bone_capemgr/slots"


then to run the server and start plotting use- 


node seismometerNode.js 