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

// 显示/隐藏菜单
document.getElementById('sound-button').addEventListener('click', function() {
    var menu = document.getElementById('sound-menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});

// 播放音频
function playSound(soundName) {
    var audio = audioCache[soundName];
    if (audio) {
        audio.play();
    } else {
        console.error('Audio not found:', soundName);
    }
}
