import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const NewcurrentTime = localStorage.getItem('videoplayer-current-time');

if (NewcurrentTime) {
  player.setCurrentTime(NewcurrentTime);
}

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  console.log(data);
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(data.seconds)
  );
}
