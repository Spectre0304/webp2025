// script.js
window.onload = function() {
    var container = document.getElementById('container');
    var consecutiveErrors = 0; // 追蹤連續錯誤次數
    
    // 初始隨機產生 0-2 個字元
    generateRandomChars(0, 2);
    
    // 使用 addEventListener 監聽鍵盤事件
    window.addEventListener("keyup", function(e) {
        console.log(e.key);
        
        if (e.key === 'Escape') {
            // 清空容器內容
            container.textContent = "";
            // 重置錯誤計數
            consecutiveErrors = 0;
        } else if (e.key === 'Backspace') {
            // 刪除最後一個字元
            var str = container.textContent;
            container.textContent = str.substring(0, str.length-1);
            // 不計入錯誤
        } else {
            // 檢查輸入是否正確（與第一個字元匹配）
            if (container.textContent.length > 0 && container.textContent[0] === e.key) {
                // 正確輸入
                container.textContent = container.textContent.substring(1);
                // 正確時重置錯誤計數
                consecutiveErrors = 0;
                // 隨機產生 1-3 個新字元並添加到字串後面
                generateRandomChars(1, 3);
            } else {
                // 錯誤輸入
                container.textContent += e.key;
                // 增加錯誤計數
                consecutiveErrors++;
                
                // 連續錯誤三次時的處理
                if (consecutiveErrors >= 3) {
                    // 除了原本的隨機字元外，再額外增加 6 個隨機字元
                    generateRandomChars(6, 6);
                    // 重置錯誤計數
                    consecutiveErrors = 0;
                    
                    // 使用 innerHTML 顯示警告訊息
                    // 創建一個暫時的警告元素
                    var warningElement = document.createElement('div');
                    warningElement.innerHTML = '<span style="color: red; font-weight: bold;">連續錯誤三次！增加 6 個字元</span>';
                    document.body.appendChild(warningElement);
                    
                    // 2 秒後移除警告
                    setTimeout(function() {
                        document.body.removeChild(warningElement);
                    }, 2000);
                }
            }
        }
    });
    
    // 讓 container 獲得焦點
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
        
        // 使用 textContent 更新內容
        container.textContent += randomStr;
    }
};