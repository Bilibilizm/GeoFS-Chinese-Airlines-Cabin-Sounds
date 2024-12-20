// ==/UserScript==

(function() {
    'use strict';

    // 预加载音频文件
    var audioCache = {};
    var sounds = [
        '起飞前', '关门', 'Ding', '巡航', '用餐提醒', '早餐', '午餐', '晚餐', '娱乐', '使用娱乐系统提示',
        '颠簸提醒', '下降前', '落地前', '开门', '备降', '备降道歉', '技术故障', '撤离', '复飞'
    ];

    // 预加载所有音频文件
    sounds.forEach(function(sound) {
        var audio = new Audio(`https://raw.githubusercontent.com/Bilibilizm/GeoFS-Chinese-Airlines-Cabin-Sounds/main/sounds/${sound}.wav`);
        audioCache[sound] = audio;
    });

    // HTML
    var soundButton = document.createElement('div');
    soundButton.id = 'sound-button';
    soundButton.textContent = 'Sounds';
    soundButton.style.position = 'fixed';
    soundButton.style.bottom = '30px';
    soundButton.style.right = '20px';
    soundButton.style.backgroundColor = 'white';
    soundButton.style.color = 'black';
    soundButton.style.padding = '10px 20px';
    soundButton.style.borderRadius = '5px';
    soundButton.style.cursor = 'pointer';
    soundButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    document.body.appendChild(soundButton);

    var soundMenu = document.createElement('div');
    soundMenu.id = 'sound-menu';
    soundMenu.style.position = 'fixed';
    soundMenu.style.bottom = '80px';
    soundMenu.style.right = '20px';
    soundMenu.style.width = '300px';
    soundMenu.style.backgroundColor = 'white';
    soundMenu.style.color = 'black';
    soundMenu.style.padding = '20px';
    soundMenu.style.borderRadius = '5px';
    soundMenu.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    soundMenu.style.display = 'none';
    soundMenu.style.maxHeight = '400px';
    soundMenu.style.overflowY = 'auto';
    document.body.appendChild(soundMenu);

    var menuTitle = document.createElement('h1');
    menuTitle.textContent = 'GeoFS Chinese Cabin Sounds';
    menuTitle.style.fontSize = '18px';
    menuTitle.style.marginBottom = '10px';
    soundMenu.appendChild(menuTitle);

    var menuSubtitle = document.createElement('h2');
    menuSubtitle.textContent = 'Created by bilibili-開飛機のzm';
    menuSubtitle.style.fontSize = '14px';
    menuSubtitle.style.marginBottom = '20px';
    menuSubtitle.style.color = '#666';
    soundMenu.appendChild(menuSubtitle);

    var soundList = document.createElement('div');
    soundList.id = 'sound-list';
    soundMenu.appendChild(soundList);

    // 动态生成按钮
    sounds.forEach(function(sound) {
        var button = document.createElement('button');
        button.textContent = sound === '起飞前' ? 'Pre-Takeoff' :
                             sound === '关门' ? 'Close Door' :
                             sound === 'Ding' ? 'Ding' :
                             sound === '巡航' ? 'Cruise' :
                             sound === '用餐提醒' ? 'Meal Reminder' :
                             sound === '早餐' ? 'Breakfast' :
                             sound === '午餐' ? 'Lunch' :
                             sound === '晚餐' ? 'Dinner' :
                             sound === '娱乐' ? 'Entertainment' :
                             sound === '使用娱乐系统提示' ? 'Entertainment System Prompt' :
                             sound === '颠簸提醒' ? 'Turbulence Warning' :
                             sound === '下降前' ? 'Pre-Descent' :
                             sound === '落地前' ? 'Pre-Landing' :
                             sound === '开门' ? 'Open Door' :
                             sound === '备降' ? 'Divert' :
                             sound === '备降道歉' ? 'Divert Apology' :
                             sound === '技术故障' ? 'Technical Fault' :
                             sound === '撤离' ? 'Evacuation' :
                             sound === '复飞' ? 'Go Around' : sound;
        button.style.display = 'flex';
        button.style.justifyContent = 'space-between';
        button.style.alignItems = 'center';
        button.style.width = '100%';
        button.style.padding = '10px';
        button.style.marginBottom = '10px';
        button.style.backgroundColor = '#f0f0f0';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.textAlign = 'left';
        button.style.cursor = 'pointer';
        button.addEventListener('click', function() {
            playSound(sound);
        });

        // 添加 "PLAY" 文字
        var playText = document.createElement('span');
        playText.textContent = 'PLAY';
        playText.style.fontWeight = 'bold';
        playText.style.color = '#007bff';
        button.appendChild(playText);

        soundList.appendChild(button);
    });

    var joinGroup = document.createElement('div');
    joinGroup.id = 'join-group';
    joinGroup.textContent = '加入我们QQ交流群:797834076';
    joinGroup.style.marginTop = '20px';
    joinGroup.style.fontSize = '12px';
    joinGroup.style.color = '#666';
    joinGroup.style.textAlign = 'center';
    soundMenu.appendChild(joinGroup);

    // JavaScript
    soundButton.addEventListener('click', function() {
        if (soundMenu.style.display === 'none' || soundMenu.style.display === '') {
            soundMenu.style.display = 'block';
        } else {
            soundMenu.style.display = 'none';
        }
    });

    function playSound(soundName) {
        var audio = audioCache[soundName];
        if (audio) {
            audio.play();
        } else {
            console.error('Audio not found:', soundName);
        }
    }
})();
