// script.js
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');

    // 从GitHub加载音频文件
    const audioFiles = {
        '关门': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/blob/main/sounds/%E5%85%B3%E9%97%A8.wav',
        '起飞前': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/blob/main/sounds/b%20take%20off.wav',
        '爬升': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/blob/main/sounds/%E7%88%AC%E5%8D%87.wav',
        '颠簸': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/blob/main/sounds/%E9%A2%A0%E7%B0%B8.wav',
        '巡航': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/blob/main/sounds/%E9%A2%A0%E7%B0%B8.wav',
        '用餐提醒': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/blob/main/sounds/%E7%94%A8%E9%A4%90%E6%8F%90%E9%86%92.wav',
        '早餐': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/blob/main/sounds/%E6%97%A9%E9%A4%90.wav',
        '午餐': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/blob/main/sounds/%E5%8D%88%E9%A4%90.wav',
        '晚餐': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/blob/main/sounds/%E6%99%9A%E9%A4%90.wav',
        '下降前': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/blob/main/sounds/%E4%B8%8B%E9%99%8D%E5%89%8D.wav',
        '落地前': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/blob/main/sounds/%E8%90%BD%E5%9C%B0%E5%89%8D.wav',
        '开门': 'https://github.com/Bilibilizm/-test-GeoFS-China-Eastern-cabin-sounds/blob/main/sounds/%E5%BC%80%E9%97%A8.wav',
        
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
