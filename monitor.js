const os = require('os');

function getCPUInfo() {
  const cpus = os.cpus();
  let idle = 0, total = 0;

  cpus.forEach(cpu => {
    for (let type in cpu.times) {
      total += cpu.times[type];
    }
    idle += cpu.times.idle;
  });

  return { idle, total };
}

let prev = getCPUInfo();

setInterval(() => {
  const curr = getCPUInfo();
  const idleDiff = curr.idle - prev.idle;
  const totalDiff = curr.total - prev.total;

  const cpuUsage = 100 - Math.round((idleDiff / totalDiff) * 100);
  console.log(`CPU Usage: ${cpuUsage}%`);

  if (cpuUsage > 70) {
    console.log('High CPU usage detected! Restarting server...');
    process.exit(1); // PM2 will auto-restart
  }

  prev = curr;
}, 5000); // every 5 seconds
