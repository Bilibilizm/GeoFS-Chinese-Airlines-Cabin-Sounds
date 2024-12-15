document.addEventListener('DOMContentLoaded', function() {
    // 确保页面中有一个 audio 元素
    const audio = document.getElementById('audio');

    // 音频文件路径
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

    // 为每个按钮绑定点击事件
    const buttons = document.querySelectorAll('#controls button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            playAudio(button.id);
        });
    });

    // 添加显示/隐藏按钮
    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggle-controls';
    toggleButton.textContent = '显示/隐藏按钮';
    document.body.appendChild(toggleButton);

    // 显示/隐藏按钮组
    toggleButton.addEventListener('click', function() {
        const controls = document.getElementById('controls');
        controls.classList.toggle('hidden');
    });

    console.log('script.js 已加载');
});
