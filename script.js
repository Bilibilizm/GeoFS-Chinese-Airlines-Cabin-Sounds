function showAudioList() {
    var audioList = document.getElementById('audioList');
    audioList.style.display = 'block';

    // 假设音频文件名存储在数组中
    var audioFiles = ['关门.wav', '开门.wav']; // 在这里添加更多音频文件名

    // 清空现有的列表项
    audioList.innerHTML = '';

    // 动态生成音频列表项
    audioFiles.forEach(function(file) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = 'sounds/' + file; // 注意这里的路径要与你的文件夹结构相匹配
        a.textContent = file.split('.')[0]; // 显示文件名（不包含扩展名）
        a.onclick = function(event) {
            event.preventDefault(); // 阻止默认行为（即链接跳转）
            playAudio(file); // 调用播放音频的函数
        };
        li.appendChild(a);
        audioList.appendChild(li);
    });
}

function playAudio(file) {
    var audio = new Audio('sounds/' + file); // 创建Audio对象并指定音频文件路径
    audio.play(); // 播放音频
}
