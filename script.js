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

    // 动态创建按钮
    const buttons = [
        { id: 'closedoor', text: '关门' },
        { id: 'pre-takeoff', text: '起飞前' },
        { id: 'climb', text: '爬升' },
        { id: 'shake', text: '颠簸' },
        { id: 'cruise', text: '巡航' },
        { id: 'eat-meal', text: '用餐提醒' },
        { id: 'breakfast', text: '早餐' },
        { id: 'lunch', text: '午餐' },
        { id: 'dinner', text: '晚餐' },
        { id: 'before-decline', text: '下降前' },
        { id: 'before-take-on', text: '落地前' },
        { id: 'opendoor', text: '开门' }
    ];

    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.id = button.id;
        btn.textContent = button.text;
        btn.addEventListener('click', function() {
            playAudio(button.id);
        });
        document.body.appendChild(btn);
    });

    console.log('script.js 已加载');
});
