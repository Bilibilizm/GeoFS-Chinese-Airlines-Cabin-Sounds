// ==UserScript==
// @name         GeoFS Chinese Cabin Sounds
// @namespace    http://tampermonkey.net/
// @version      1.45
// @description  nothing
// @author       zm
// @match        https://www.geo-fs.com/geofs.php?v=3.9
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geo-fs.com
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    var audioCache = {};
    var sounds = [
        'Ding',
        '关门', '起飞前', '爬升',
        '巡航', '用餐提醒', '早餐', '午餐', '晚餐', '娱乐',
        '颠簸提醒', '下降前', '落地前', '开门', '备降', '备降道歉', '技术故障', '撤离', '复飞',
        'Annies Wonderland', 'Moonglow', '青花瓷',
        'See you again'
    ];

    sounds.forEach(function(sound) {
        var audio = new Audio(`https://raw.githubusercontent.com/Bilibilizm/GeoFS-Chinese-Airlines-Cabin-Sounds/main/sounds/${sound}.wav`);
        audioCache[sound] = audio;
    });

    var currentLanguage = 'English';
    var uploadedSounds = []; // To keep track of uploaded sounds

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
            '颠簸提醒': 'Turbulence Warning',
            '下降前': 'Pre-Descent',
            '落地前': 'Pre-Landing',
            '开门': 'Open Door',
            '备降': 'Divert',
            '备降道歉': 'Divert Apology',
            '技术故障': 'Technical Fault',
            '撤离': 'Evacuation',
            '复飞': 'Go Around',
            'Annies Wonderland': 'Annies Wonderland',
            'Moonglow': 'Moonglow',
            '青花瓷': 'Blue and White Porcelain',
            '声音': 'Volume',
            '上传音频': 'Upload Sounds',
            '请输入文字': 'Please enter text',
            '浏览本地文件': 'Browse local files',
            '上传': 'Upload',
            '文件过大': 'File is too large (max 10MB)',
            '文件格式错误': 'Only .wav files are allowed',
            '删除': 'Delete',
            'Visit the author': 'Visit the author'
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
            '颠簸提醒': '颠簸提醒',
            '下降前': '下降前',
            '落地前': '落地前',
            '开门': '开门',
            '备降': '备降',
            '备降道歉': '备降道歉',
            '技术故障': '技术故障',
            '撤离': '撤离',
            '复飞': '复飞',
            'Annies Wonderland': 'Annies Wonderland',
            'Moonglow': 'Moonglow',
            '青花瓷': '青花瓷',
            'See you again': 'See you again',
            '声音': '声音',
            '上传音频': '上传音频',
            '请输入文字': '请输入文字',
            '浏览本地文件': '浏览本地文件',
            '上传': '上传',
            '文件过大': '文件过大（最大 10MB）',
            '文件格式错误': '仅支持 .wav 文件',
            '删除': '删除',
            'Visit the author': '查看帅比作者'
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
            '颠簸提醒': '顛簸提醒',
            '下降前': '下降前',
            '落地前': '落地前',
            '开门': '開門',
            '备降': '備降',
            '备降道歉': '備降道歉',
            '技术故障': '技術故障',
            '撤离': '撤離',
            '复飞': '復飛',
            'Annies Wonderland': 'Annies Wonderland',
            'Moonglow': 'Moonglow',
            '青花瓷': '青花瓷',
            '声音': '聲音',
            '上传音频': '上傳音頻',
            '请输入文字': '請輸入文字',
            '浏览本地文件': '瀏覽本地文件',
            '上传': '上傳',
            '文件过大': '文件過大（最大 10MB）',
            '文件格式错误': '僅支持 .wav 文件',
            '删除': '刪除',
            'Visit the author': '查看作者'
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

    var liveryImage = document.createElement('img');
    liveryImage.src = 'https://i.ibb.co/YcVRmVL/SW.png'; 
    liveryImage.alt = 'Chinese Livery Design Group-Sino Wings Logo'; 
    liveryImage.style.width = '45px';
    liveryImage.style.height = 'auto'; 
    liveryImage.style.marginBottom = '20px';
    soundMenu.appendChild(liveryImage);

    var liveryInfo = document.createElement('p');
    liveryInfo.textContent = 'from Chinese Livery Design Group-Sino Wings';
    liveryInfo.style.fontSize = '12px';
    liveryInfo.style.marginBottom = '20px';
    liveryInfo.style.color = '#666';
    soundMenu.appendChild(liveryInfo);

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
    dropdownArrow.style.fontWeight= 'bold';
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


var fileUploadSection = document.createElement('div');
fileUploadSection.id = 'file-upload-section';
fileUploadSection.style.marginTop = '20px';
soundMenu.appendChild(fileUploadSection);

var uploadTitle = document.createElement('h3');
uploadTitle.textContent = languageMap[currentLanguage]['上传音频'];
uploadTitle.style.fontSize = '16px';
uploadTitle.style.marginBottom = '10px';
fileUploadSection.appendChild(uploadTitle);

var fileNameInput = document.createElement('input');
fileNameInput.type = 'text';
fileNameInput.id = 'file-name-input';
fileNameInput.placeholder = languageMap[currentLanguage]['请输入文字'];
fileNameInput.style.width = '100%';
fileNameInput.style.marginBottom = '10px';
fileUploadSection.appendChild(fileNameInput);

var fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.wav';
fileInput.id = 'file-input';
fileInput.style.display = 'none';
fileInput.addEventListener('change', function(e) {
    var files = e.target.files;
    if (files.length > 0) {
        var file = files[0];
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert(languageMap[currentLanguage]['文件过大']);
            return;
        }
        if (!file.name.endsWith('.wav')) {
            alert(languageMap[currentLanguage]['文件格式错误']);
            return;
        }
        var fileName = file.name; // 获取文件名
        fileNameInput.value = fileName; // 显示文件名
        uploadButton.disabled = false; // Enable when a file is selected
    }
});
fileUploadSection.appendChild(fileInput);

var browseButton = document.createElement('button');
browseButton.textContent = languageMap[currentLanguage]['浏览本地文件'];
browseButton.style.display = 'block';
browseButton.style.marginTop = '10px';
browseButton.style.width = '100%';
browseButton.style.padding = '10px';
browseButton.style.backgroundColor = '#f0f0f0';
browseButton.style.border = 'none';
browseButton.style.borderRadius = '5px';
browseButton.style.textAlign = 'left';
browseButton.style.cursor = 'pointer';
browseButton.addEventListener('click', function() {
    fileInput.click(); // 触发文件输入的点击事件，打开文件选择对话框
});
fileUploadSection.appendChild(browseButton);

var uploadButton = document.createElement('button');
uploadButton.textContent = languageMap[currentLanguage]['上传'];
uploadButton.id = 'upload-button';
uploadButton.style.display = 'block';
uploadButton.style.marginTop = '10px';
uploadButton.style.width = '100%';
uploadButton.style.padding = '10px';
uploadButton.style.backgroundColor = '#007bff';
uploadButton.style.color = 'white';
uploadButton.style.border = 'none';
uploadButton.style.borderRadius = '5px';
uploadButton.style.cursor = 'pointer';
uploadButton.disabled = true; // Disable by default
uploadButton.addEventListener('click', function() {
    if (fileInput.files.length > 0 && fileNameInput.value.trim() !== '') {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            var audio = new Audio(event.target.result);
            audioCache[fileNameInput.value] = audio;
            generateButtons();
            fileInput.value = ''; // Clear the input
            fileNameInput.value = ''; // Clear the input
            uploadButton.disabled = true;
        };
        reader.readAsDataURL(file);
    }
});
fileUploadSection.appendChild(uploadButton);

var fileDisplay = document.createElement('div');
fileDisplay.id = 'file-display';
fileDisplay.style.display = 'none';
fileDisplay.style.marginTop = '10px';
soundMenu.appendChild(fileDisplay);

function removeFile() {
    fileInput.value = '';
    fileNameInput.value = '';
    fileDisplay.textContent = '';
    fileDisplay.style.display = 'none';
    uploadButton.disabled = true;
}

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
    volumeLabel.textContent = languageMap[currentLanguage]['声音'];
    fileNameInput.placeholder = languageMap[currentLanguage]['请输入文字'];
    uploadButton.textContent = languageMap[currentLanguage]['上传'];
    browseButton.textContent = languageMap[currentLanguage]['浏览本地文件'];
    uploadTitle.textContent = languageMap[currentLanguage]['上传音频'];
    visitAuthorTitle.textContent = languageMap[currentLanguage]['Visit the author']; // 添加这行代码以切换语言
    generateButtons();
}


function setVolume(volume) {
    Object.values(audioCache).forEach(function(audio) {
        audio.volume = volume;
    });
}

function playSound(soundName, button) {
    var audio = audioCache[soundName];
    if (audio) {
        var playPauseIcon = button.querySelector('span');
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
            button.querySelector('.progress-bar').style.width = '0%';
            playPauseIcon.textContent = '▶';
        } else {
            audio.play();
            audio.addEventListener('timeupdate', function() {
                var progress = (audio.currentTime / audio.duration) * 100;
                button.querySelector('.progress-bar').style.width = progress + '%';
            });
            audio.addEventListener('ended', function() {
                button.querySelector('.progress-bar').style.width = '0%';
                playPauseIcon.textContent = '▶';
            });
            playPauseIcon.textContent = '▐▐';
        }
    } else {
        console.error('Audio not found:', soundName);
    }
}

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
        button.style.marginBottom= '10px';
        button.style.backgroundColor = '#f0f0f0';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.textAlign = 'left';
        button.style.cursor = 'pointer';
        button.addEventListener('click', function() {
        playSound(sound, button);
        });

        var playPauseIcon = document.createElement('span');
        playPauseIcon.textContent = '▶';
        playPauseIcon.style.fontWeight = 'bold';
        playPauseIcon.style.color = '#007bff';
        playPauseIcon.style.marginRight = '10px';
        button.appendChild(playPauseIcon);

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
        progressBar.className = 'progress-bar';
        progressBarContainer.appendChild(progressBar);

        soundList.appendChild(button);
    });

    Object.keys(audioCache).forEach(function(sound) {
        if (!sounds.includes(sound)) {
            var button = document.createElement('button');
            button.textContent = sound;
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
                playSound(sound, button);
            });

            var playPauseIcon = document.createElement('span');
            playPauseIcon.textContent = '▶';
            playPauseIcon.style.fontWeight = 'bold';
            playPauseIcon.style.color = '#007bff';
            playPauseIcon.style.marginRight = '10px';
            button.appendChild(playPauseIcon);

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
            progressBar.className = 'progress-bar';
            progressBarContainer.appendChild(progressBar);

            var deleteButton = document.createElement('button');
            deleteButton.textContent = languageMap[currentLanguage]['删除'];
            deleteButton.style.backgroundColor = '#ff4d4d';
            deleteButton.style.color = 'white';
            deleteButton.style.border = 'none';
            deleteButton.style.borderRadius = '5px';
            deleteButton.style.padding = '5px 10px';
            deleteButton.style.marginLeft = '10px';
            deleteButton.style.cursor = 'pointer';
            deleteButton.addEventListener('click', function(event) {
                event.stopPropagation();
                delete audioCache[sound];
                generateButtons();
            });
            button.appendChild(deleteButton);

            soundList.appendChild(button);
        }
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

// Add Visit the author section
var visitAuthorSection = document.createElement('div');
visitAuthorSection.id = 'visit-author-section';
visitAuthorSection.style.marginTop = '20px';
visitAuthorSection.style.textAlign = 'center';
visitAuthorSection.style.fontSize = '12px';
visitAuthorSection.style.color = '#666';
soundMenu.appendChild(visitAuthorSection);

var visitAuthorTitle = document.createElement('h3');
visitAuthorTitle.textContent = languageMap[currentLanguage]['Visit the author'];
visitAuthorTitle.style.marginBottom = '5px';
visitAuthorSection.appendChild(visitAuthorTitle);

var bilibiliLink = document.createElement('img');
bilibiliLink.src = 'https://i.ibb.co/WBXZKn9/bl.png';
bilibiliLink.alt = 'Bilibili Link';
bilibiliLink.style.width = '45px';
bilibiliLink.style.height = 'auto';
bilibiliLink.style.marginRight = '10px';
bilibiliLink.style.cursor = 'pointer';
bilibiliLink.addEventListener('click', function() {
    window.open('https://space.bilibili.com/3493078037957365?spm_id_from=333.1007.0.0', '_blank');
});
visitAuthorSection.appendChild(bilibiliLink);

var youtubeLink = document.createElement('img');
youtubeLink.src = 'https://i.ibb.co/Bz1cMBn/ytl.png';
youtubeLink.alt = 'YouTube Link';
youtubeLink.style.width = '45px';
youtubeLink.style.height = 'auto';
youtubeLink.style.cursor = 'pointer';
youtubeLink.addEventListener('click', function() {
    window.open('https://www.youtube.com/channel/UCcNizdsaoeIy_kNbIr50pYA', '_blank');
});
visitAuthorSection.appendChild(youtubeLink);

generateButtons();

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
})();
