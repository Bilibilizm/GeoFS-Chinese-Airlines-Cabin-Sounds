document.addEventListener('DOMContentLoaded', function() {
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

    // 为每个按钮绑定点击事件
    const buttons = document.querySelectorAll('#controls button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取音频文件路径
            const audioUrl = audioFiles[button.id];
            if (audioUrl) {
                // 打开音频菜单页面
                window.location.href = 'audio-menu.html';
            } else {
                alert('音频文件未找到');
            }
        });
    });

    console.log('script.js 已加载');
});
