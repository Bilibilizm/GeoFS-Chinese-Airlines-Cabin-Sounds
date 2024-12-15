// script.js
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const audioFiles = {
        'closedoor': 'sounds/关门.wav',
        'pre-takeoff': 'sounds/b take off.wav',
        'climb': 'sounds/爬升.wav',
        'shake': 'sounds/颠簸.wav',
        'cruise': 'sounds/巡航.wav',
        'eat-meal': 'sounds/用餐提醒.wav',
        'breakfast': 'sounds/早餐.wav',
        'lunch': 'sounds/午餐.wav',
        'dinner': 'sounds/晚餐.wav',
        'before-decline': 'sounds/下降前.wav',
        'before-take-on': 'sounds/落地前.wav',
        'opendoor': 'sounds/开门.wav',
    };
    document.getElementById('closedoor').addEventListener('click', function() {
        playAudio('closedoor');
    });

    document.getElementById('pre-takeoff').addEventListener('click', function() {
        playAudio('pre-takeoff');
    });

    document.getElementById('climb').addEventListener('click', function() {
        playAudio('climb');
    });

    document.getElementById('shake').addEventListener('click', function() {
        playAudio('shake');
    });

    document.getElementById('cruise').addEventListener('click', function() {
        playAudio('cruise');
    });

    document.getElementById('eat-meal').addEventListener('click', function() {
        playAudio('eat-meal');
    });

    document.getElementById('breakfast').addEventListener('click', function() {
        playAudio('breakfast');
    });

    document.getElementById('lunch').addEventListener('click', function() {
        playAudio('lunch');
    });

    document.getElementById('dinner').addEventListener('click', function() {
        playAudio('dinner');
    });

    document.getElementById('before-decline').addEventListener('click', function() {
        playAudio('before-decline');
    });

    document.getElementById('before-take-on').addEventListener('click', function() {
        playAudio('before-take-on');
    });

    document.getElementById('opendoor').addEventListener('click', function() {
        playAudio('opendoor');
    });

    // 播放音频的函数
    function playAudio(audioName) {
        const audioUrl = audioFiles[audioName];
        if (audioUrl) {
            audio.src = audioUrl;
            audio.play();
        } else {
            alert('音频文件未找到');
        }
    }
});
