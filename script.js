let interval;
let isWork = true;

function startTimer() {
  let time = (isWork ? document.getElementById('workTime').value : document.getElementById('breakTime').value) * 60;
  clearInterval(interval);
  document.getElementById('status').innerText = `Status: ${isWork ? 'Work' : 'Break'}`;
  interval = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    time--;
    if (time < 0) {
      clearInterval(interval);
      notify(`${isWork ? 'Work' : 'Break'} time is over!`);
      isWork = !isWork;
      startTimer();
    }
  }, 1000);
}

function notify(message) {
  if (Notification.permission === 'granted') {
    new Notification(message);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(message);
      }
    });
  }
  alert(message); // fallback
}

function addTask() {
  const task = document.getElementById('taskInput').value;
  if (task.trim()) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('div');
    taskItem.innerText = '- ' + task;
    taskList.appendChild(taskItem);
    document.getElementById('taskInput').value = '';
  }
}
