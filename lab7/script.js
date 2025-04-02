window.onload = function() {
    var container = document.getElementById('container');
    
    // 初始隨機產生 0-2 個字元
    generateRandomChars(0, 2);
    
    window.addEventListener("keyup", function(e) {
        console.log(e.key);
        
        if (e.key === 'Escape') {
            container.textContent = "";
        } else if (e.key === 'Backspace') {
            var str = container.textContent;
            container.textContent = str.substring(0, str.length-1);
        } else {
            // 檢查第一個字元是否與e.key一樣
            // 一樣的話就把第一個字元消除
            if (container.textContent.length > 0 && container.textContent[0] === e.key) {
                container.textContent = container.textContent.substring(1);
                // 隨機產生 1-3 個新字元並添加到字串後面
                generateRandomChars(1, 3);
            } else {
                container.textContent += e.key;
            }
        }
    });
    
    container.focus();
    
    // 生成隨機字元函數
    function generateRandomChars(min, max) {
        var chars = 'abcdefghijklmnopqrstuvwxyz';
        var numChars = Math.floor(Math.random() * (max - min + 1)) + min;
        var randomStr = '';
        
        for (var i = 0; i < numChars; i++) {
            var randomIndex = Math.floor(Math.random() * chars.length);
            randomStr += chars[randomIndex];
        }
        
        container.textContent += randomStr;
    }
};