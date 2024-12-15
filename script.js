// script.js
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');

    // 从GitHub加载音频文件
    const audioFiles = {
        'pre-takeoff': 'https://github.com/yourusername/yourrepository/raw/main/sounds/pre-takeoff.wav',
        'climb': 'https://github.com/yourusername/yourrepository/raw/main/sounds/climb.wav',
        // 添加更多的音频文件路径
    };

    // 为每个按钮添加点击事件
    document.getElementById('pre-takeoff').addEventListener('click', function() {
        playAudio('pre-takeoff');
    });

    document.getElementById('climb').addEventListener('click', function() {
        playAudio('climb');
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
