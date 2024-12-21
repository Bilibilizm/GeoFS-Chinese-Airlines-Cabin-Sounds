// ==/UserScript==
(function() {
    'use strict';

    // 音频缓存对象
    var audioCache = {};

    // 音频文件列表
    var sounds = [
        "Annie's Wonderland(2m25s)",
        "Moonglow(2m25s)",
        "青花瓷(2m25s)",
        'Ding',
        '关门', '起飞前', '爬升',
        '巡航', '用餐提醒', '早餐', '午餐', '晚餐', '娱乐', '使用娱乐系统提示',
        '颠簸提醒', '下降前', '落地前', '开门', '备降', '备降道歉', '技术故障', '撤离', '复飞'
    ];

    // 加载所有音频文件
    sounds.forEach(function(sound) {
        var audio = new Audio(`https://raw.githubusercontent.com/Bilibilizm/GeoFS-Chinese-Airlines-Cabin-Sounds/main/sounds/${sound}.WAV`);
        audioCache[sound] = audio;
    });

    // 当前语言
    var currentLanguage = 'English';

    // 多语言映射
    var languageMap = {
        'English': {
            'Ding': 'Ding',
            '关门': 'Close Door',
            '起飞前': 'Pre-Takeoff',
            '爬升': 'Climb',
            '巡航': 'Cruise',
            '用餐提醒': 'Meal Reminder',
            '早餐': 'Breakfast',
            '午餐': 'Lunch',
            '晚餐': 'Dinner',
            '娱乐': 'Entertainment',
            '使用娱乐系统提示': 'Entertainment System Prompt',
            '颠簸提醒': 'Turbulence Warning',
            '下降前': 'Pre-Descent',
            '落地前': 'Pre-Landing',
            '开门': 'Open Door',
            '备降': 'Divert',
            '备降道歉': 'Divert Apology',
            '技术故障': 'Technical Fault',
            '撤离': 'Evacuation',
            '复飞': 'Go Around',
            '声音': 'Volume',
            "Annie's Wonderland(2m25s)": "Annie's Wonderland",
            "Moonglow(2m25s)": "Moonglow",
            "青花瓷(2m25s)": "Blue and White Porcelain"
        },
        '简体中文': {
            'Ding': '叮',
            '关门': '关门',
            '起飞前': '起飞前',
            '爬升': '爬升',
            '巡航': '巡航',
            '用餐提醒': '用餐提醒',
            '早餐': '早餐',
            '午餐': '午餐',
            '晚餐': '晚餐',
            '娱乐': '娱乐',
            '使用娱乐系统提示': '使用娱乐系统提示',
            '颠簸提醒': '颠簸提醒',
            '下降前': '下降前',
            '落地前': '落地前',
            '开门': '开门',
            '备降': '备降',
            '备降道歉': '备降道歉',
            '技术故障': '技术故障',
            '撤离': '撤离',
            '复飞': '复飞',
            '声音': '声音',
            "Annie's Wonderland(2m25s)": "安妮的仙境",
            "Moonglow(2m25s)": "月光",
            "青花瓷(2m25s)": "青花瓷"
        },
        '繁體中文': {
            'Ding': '叮',
            '关门': '關門',
            '起飞前': '起飛前',
            '爬升': '爬升',
            '巡航': '巡航',
            '用餐提醒': '用餐提醒',
            '早餐': '早餐',
            '午餐': '午餐',
            '晚餐': '晚餐',
            '娱乐': '娛樂',
            '使用娱乐系统提示': '使用娛樂系統提示',
            '颠簸提醒': '顛簸提醒',
            '下降前': '下降前',
            '落地前': '落地前',
            '开门': '開門',
            '备降': '備降',
            '备降道歉': '備降道歉',
            '技术故障': '技術故障',
            '撤离': '撤離',
            '复飞': '復飛',
            '声音': '聲音',
            "Annie's Wonderland(2m25s)": "安妮的仙境",
            "Moonglow(2m25s)": "月光",
            "青花瓷(2m25s)": "青花瓷"
        }
    };

    // 创建UI元素
    var soundButton = document.createElement('div');
    soundButton.id = 'sound-button';
    soundButton.textContent = 'Sounds';
    soundButton.style.position = 'fixed';
    soundButton.style.bottom = '20px';
    soundButton.style.right = '20px';
    soundButton.style.backgroundColor = 'white';
    soundButton.style.color = 'black';
    soundButton.style.padding = '10px 20px';
    soundButton.style.borderRadius = '5px';
    soundButton.style.cursor = 'pointer';
    soundButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    soundButton.style.zIndex = '9999';
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
    soundMenu.style.zIndex = '9999';
    document.body.appendChild(soundMenu);

    var menuTitle = document.createElement('h1');
    menuTitle.textContent = 'GeoFS Chinese Airlines Cabin Sounds';
    menuTitle.style.fontSize = '18px';
    menuTitle.style.marginBottom = '10px';
    soundMenu.appendChild(menuTitle);

    var menuSubtitle = document.createElement('h2');
    menuSubtitle.textContent = 'Created by bilibili-開飛機のzm';
    menuSubtitle.style.fontSize = '14px';
    menuSubtitle.style.marginBottom = '20px';
    menuSubtitle.style.color = '#666';
    soundMenu.appendChild(menuSubtitle);

    var languageButton = document.createElement('button');
    languageButton.textContent = 'Language';
    languageButton.style.display = 'flex';
    languageButton.style.justifyContent = 'space-between';
    languageButton.style.alignItems = 'center';
    languageButton.style.width = '100%';
    languageButton.style.padding = '10px';
    languageButton.style.marginBottom = '10px';
    languageButton.style.backgroundColor = '#f0f0f0';
    languageButton.style.border = 'none';
    languageButton.style.borderRadius = '5px';
    languageButton.style.textAlign = 'left';
    languageButton.style.cursor = 'pointer';
    languageButton.addEventListener('click', function() {
        toggleLanguageMenu();
    });

    var dropdownArrow = document.createElement('span');
    dropdownArrow.textContent = '▼';
    dropdownArrow.style.fontWeight = 'bold';
    dropdownArrow.style.color = '#666';
    languageButton.appendChild(dropdownArrow);

    soundMenu.appendChild(languageButton);

    var languageMenu = document.createElement('div');
    languageMenu.id = 'language-menu';
    languageMenu.style.display = 'none';
    languageMenu.style.marginBottom = '20px';
    soundMenu.appendChild(languageMenu);

    ['简体中文', '繁體中文', 'English'].forEach(function(lang) {
        var langButton = document.createElement('button');
        langButton.textContent = lang;
        langButton.style.display = 'flex';
        langButton.style.justifyContent = 'space-between';
        langButton.style.alignItems = 'center';
        langButton.style.width = '100%';
        langButton.style.padding = '10px';
        langButton.style.marginBottom = '10px';
        langButton.style.backgroundColor = '#f0f0f0';
        langButton.style.border = 'none';
        langButton.style.borderRadius = '5px';
        langButton.style.textAlign = 'left';
        langButton.style.cursor = 'pointer';
        langButton.addEventListener('click', function() {
            setLanguage(lang);
            toggleLanguageMenu();
        });

        var switchText = document.createElement('span');
        switchText.textContent = lang === '简体中文' ? '切换' :
                                 lang === '繁體中文' ? '切換' :
                                 'Switch';
        switchText.style.fontWeight = 'bold';
        switchText.style.color = '#007bff';
        langButton.appendChild(switchText);

        languageMenu.appendChild(langButton);
    });

    // 添加音量控制
    var volumeLabel = document.createElement('label');
    volumeLabel.textContent = languageMap[currentLanguage]['声音'];
    volumeLabel.style.display = 'block';
    volumeLabel.style.marginBottom = '5px';
    volumeLabel.style.fontWeight = 'bold';
    soundMenu.appendChild(volumeLabel);

    var volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.min = '0';
    volumeSlider.max = '1';
    volumeSlider.step = '0.01';
    volumeSlider.value = '0.5';
    volumeSlider.style.width = '100%';
    volumeSlider.style.marginBottom = '20px';
    volumeSlider.addEventListener('input', function() {
        setVolume(volumeSlider.value);
    });
    soundMenu.appendChild(volumeSlider);

    var soundList = document.createElement('div');
    soundList.id = 'sound-list';
    soundMenu.appendChild(soundList);

    var joinGroup = document.createElement('div');
    joinGroup.id = 'join-group';
    joinGroup.textContent = '加入我们QQ交流群:797834076';
    joinGroup.style.marginTop = '20px';
    joinGroup.style.fontSize = '12px';
    joinGroup.style.color = '#666';
    joinGroup.style.textAlign = 'center';
    soundMenu.appendChild(joinGroup);

    // 生成声音按钮
    function generateButtons() {
        soundList.innerHTML = '';
        sounds.forEach(function(sound) {
            var button = createSoundButton(sound);
            soundList.appendChild(button);
        });
    }

    // 创建声音按钮
    function createSoundButton(soundName) {
        var button = document.createElement('button');
        button.textContent = languageMap[currentLanguage][soundName];
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
            playSound(soundName, button);
        });

        // 添加播放/暂停图标
        var playPauseIcon = document.createElement('span');
        playPauseIcon.textContent = '▶'; // 默认显示播放图标
        playPauseIcon.style.fontWeight = 'bold';
        playPauseIcon.style.color = '#007bff';
        playPauseIcon.style.marginRight = '10px';
        button.appendChild(playPauseIcon);

        // 添加进度条
        var progressBarContainer = document.createElement('div');
        progressBarContainer.style.width = '100%';
        progressBarContainer.style.height = '5px';
        progressBarContainer.style.backgroundColor = 'white';
        progressBarContainer.style.margin = '5px 0';
        progressBarContainer.style.position = 'relative';
        button.appendChild(progressBarContainer);

        var progressBar = document.createElement('div');
        progressBar.style.width = '0%';
        progressBar.style.height = '100%';
        progressBar.style.backgroundColor = '#007bff';
        progressBar.style.position = 'absolute';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.className = 'progress-bar'; // 添加类名以便后续查找
        progressBarContainer.appendChild(progressBar);

        return button;
    }

    // 切换菜单显示状态
    function toggleMenu() {
        var menu = document.getElementById('sound-menu');
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    }

    // 切换语言菜单显示状态
    function toggleLanguageMenu() {
        var langMenu = document.getElementById('language-menu');
        if (langMenu.style.display === 'none' || langMenu.style.display === '') {
            langMenu.style.display = 'block';
        } else {
            langMenu.style.display = 'none';
        }
    }

    // 设置当前语言
    function setLanguage(lang) {
        currentLanguage = lang;
        volumeLabel.textContent = languageMap[currentLanguage]['声音'];
        generateButtons();
    }

    // 设置音量
    function setVolume(volume) {
        Object.values(audioCache).forEach(function(audio) {
            audio.volume = volume;
        });
    }

    // 播放声音
    function playSound(soundName, button) {
        var audio = audioCache[soundName];
        if (audio) {
            var playPauseIcon = button.querySelector('span');
            if (!audio.paused) {
                // 如果音频正在播放，则停止播放
                audio.pause();
                audio.currentTime = 0;
                button.querySelector('.progress-bar').style.width = '0%';
                playPauseIcon.textContent = '▶'; // 切换为播放图标
            } else {
                // 播放音频
                audio.play();
                // 更新进度条
                audio.addEventListener('timeupdate', function() {
                    var progress = (audio.currentTime / audio.duration) * 100;
                    button.querySelector('.progress-bar').style.width = progress + '%';
                });
                // 音频播放完毕后重置进度条
                audio.addEventListener('ended', function() {
                    button.querySelector('.progress-bar').style.width = '0%';
                    playPauseIcon.textContent = '▶'; // 切换为播放图标
                });
                playPauseIcon.textContent = '▐▐'; // 切换为暂停图标
            }
        } else {
            console.error('Audio not found:', soundName);
        }
    }

    // 初始化按钮
    generateButtons();

    // 绑定事件
    soundButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        event.stopPropagation();
        console.log('Sound button clicked');
        toggleMenu();
    });

    document.addEventListener('keydown', function(event) {
