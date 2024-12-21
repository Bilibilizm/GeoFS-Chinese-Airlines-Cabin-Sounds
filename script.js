// 预加载音频文件
var audioCache = {};
var sounds = [
'关门', '起飞前', '爬升','Ding', '巡航', '用餐提醒', '早餐', '午餐', '晚餐', '娱乐', '使用娱乐系统提示',
    '颠簸提醒', '下降前', '落地前', '开门', '备降', '备降道歉', '技术故障', '撤离', '复飞'
];

// 预加载所有音频文件
sounds.forEach(function(sound) {
    var audio = new Audio(`https://raw.githubusercontent.com/Bilibilizm/GeoFS-Chinese-Airlines-Cabin-Sounds/main/sounds/${sound}.wav`);
    audioCache[sound] = audio;
});

// 语言映射
var languageMap = {
    'English': {
        '关门': 'Close Door',
        '起飞前': 'Pre-Takeoff',
        '爬升': 'climb',
        'Ding': 'Ding',
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
        '关门': '关门',
        '起飞前': '起飞前',
        '爬升': '爬升',
        'Ding': '叮',
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
        '关门': '關門',
        '起飞前': '起飛前',
        '爬升': '爬升',
        'Ding': '叮',
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

// 当前语言
var currentLanguage = 'English';

// 动态生成按钮
function generateButtons() {
    var soundList = document.getElementById('sound-list');
    soundList.innerHTML = ''; // 清空现有按钮
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

        // 添加 "PLAY" 文字
        var playText = document.createElement('span');
        playText.textContent = 'PLAY';
        playText.style.fontWeight = 'bold';
        playText.style.color = '#007bff';
        button.appendChild(playText);

        soundList.appendChild(button);
    });
}

// 切换语言
function setLanguage(lang) {
    currentLanguage = lang;
    generateButtons(); // 重新生成按钮
}

// 播放声音
function playSound(soundName) {
    var audio = audioCache[soundName];
    if (audio) {
        audio.play();
    } else {
        console.error('Audio not found:', soundName);
    }
}

// 初始化按钮
generateButtons();

// 切换菜单显示状态
function toggleMenu() {
    var menu = document.getElementById('sound-menu');
    menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
}

// 切换语言菜单显示状态
function toggleLanguageMenu() {
    var langMenu = document.getElementById('language-menu');
    langMenu.style.display = langMenu.style.display === 'none' || langMenu.style.display === '' ? 'block' : 'none';
}

// 绑定事件
document.getElementById('sound-button').addEventListener('click', toggleMenu);
document.getElementById('language-button').addEventListener('click', toggleLanguageMenu);

// 快捷键 Alt + Y 打开/关闭菜单
document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === 'y') {
        toggleMenu();
    }
});
