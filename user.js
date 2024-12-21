// ==/UserScript==
(function() {
    'use strict';

    var audioCache = {};
    var sounds = [
        'Ding',
        '关门', '起飞前', '爬升',
        '巡航', '用餐提醒', '早餐', '午餐', '晚餐', '娱乐', '使用娱乐系统提示',
        '颠簸提醒', '下降前', '落地前', '开门', '备降', '备降道歉', '技术故障', '撤离', '复飞'
    ];


    sounds.forEach(function(sound) {
        var audio = new Audio(`https://raw.githubusercontent.com/Bilibilizm/GeoFS-Chinese-Airlines-Cabin-Sounds/main/sounds/${sound}.wav`);
        audioCache[sound] = audio;
    });

 
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
            '复飞': 'Go Around'
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
            '复飞': '复飞'
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
            '复飞': '復飛'
        }
    };


    var currentLanguage = 'English';

    // HTML
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

    var soundList = document.createElement('div');
    soundList.id = 'sound-list';
    soundMenu.appendChild(soundList);

    function generateButtons() {
        soundList.innerHTML = '';
        sounds.forEach(function(sound) {
            var button = document.createElement('button');
            button.textContent = languageMap[currentLanguage][sound];
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

            var playText = document.createElement('span');
            playText.textContent = 'PLAY';
            playText.style.fontWeight = 'bold';
            playText.style.color = '#007bff';
            button.appendChild(playText);

            soundList.appendChild(button);
        });
    }

    var joinGroup = document.createElement('div');
    joinGroup.id = 'join-group';
    joinGroup.textContent = '加入我们QQ交流群:797834076';
    joinGroup.style.marginTop = '20px';
    joinGroup.style.fontSize = '12px';
    joinGroup.style.color = '#666';
    joinGroup.style.textAlign = 'center';
    soundMenu.appendChild(joinGroup);

    // JavaScript
    soundButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        event.stopPropagation();
        console.log('Sound button clicked');
        toggleMenu();
    });

    document.addEventListener('keydown', function(event) {
        if (event.altKey && event.key === 'y') {
            toggleMenu();
        }
    });

    function toggleMenu() {
        var menu = document.getElementById('sound-menu');
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    }

    function toggleLanguageMenu() {
        var langMenu = document.getElementById('language-menu');
        if (langMenu.style.display === 'none' || langMenu.style.display === '') {
            langMenu.style.display = 'block';
        } else {
            langMenu.style.display = 'none';
        }
    }

    function setLanguage(lang) {
        currentLanguage = lang;
        generateButtons();
    }

    function playSound(soundName) {
        var audio = audioCache[soundName];
        if (audio) {
            audio.play();
        } else {
            console.error('Audio not found:', soundName);
        }
    }

    generateButtons();
})();
