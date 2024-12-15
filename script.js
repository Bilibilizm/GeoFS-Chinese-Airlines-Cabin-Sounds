// 定义一个函数来播放音频
function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
}

// 定义一个函数来切换音频列表的显示状态
function togglePlaylist() {
    const audioList = document.getElementById('audioList');
    if (audioList.classList.contains('hidden')) {
        audioList.classList.remove('hidden');
    } else {
        audioList.classList.add('hidden');
    }
}

// 可选：为 Play 按钮添加点击事件监听器（也可以直接在HTML中使用onclick属性）
document.getElementById('playButton').addEventListener('click', togglePlaylist);
