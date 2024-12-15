// script.js
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');

    // 从GitHub加载音频文件
    const audioFiles = {
        'closedoor': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/raw/main/sounds/%E5%85%B3%E9%97%A8.wav',
        'pre-takeoff': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/raw/main/sounds/b%20take%20off.wav',
        'climb': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/raw/main/sounds/%E7%88%AC%E5%8D%87.wav',
        'shake': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/raw/main/sounds/%E9%A2%A0%E7%B0%B8.wav',
        'cruise': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/raw/main/sounds/%E5%B7%A1%E8%88%AA.wav',
        'eat-meal': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/raw/main/sounds/%E7%94%A8%E9%A4%90%E6%8F%90%E9%86%92.wav',
        'breakfast': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/raw/main/sounds/%E6%97%A9%E9%A4%90.wav',
        'lunch': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/raw/main/sounds/%E5%8D%88%E9%A4%90.wav',
        'dinner': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/raw/main/sounds/%E6%99%9A%E9%A4%90.wav',
        'before-decline': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/raw/main/sounds/%E4%B8%8B%E9%99%8D%E5%89%8D.wav',
        'before-take-on': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/raw/main/sounds/%E8%90%BD%E5%9C%B0%E5%89%8D.wav',
        'opendoor': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/raw/main/sounds/%E5%BC%80%E9%97%A8.wav',
    };

    // 为每个按钮添加点击事件
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
            alert('did'nt find!');
        }
    }
});
