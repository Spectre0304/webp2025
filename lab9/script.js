// 定義 API 網址
var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

// 建立 XMLHttpRequest 物件
var xhr = new XMLHttpRequest();

// 開啟連線，使用 GET 方法，第三個參數 true 表示非同步請求
xhr.open('GET', openUrl, true);

// 發送請求
xhr.send();

// 監聽 readystatechange 事件，處理伺服器響應
xhr.onreadystatechange = function() {
    // 檢查請求是否成功完成 (readyState 4 表示請求完成，status 200 表示成功)
    if(this.readyState == 4 && this.status == 200) {
        // 將伺服器回傳的 JSON 字串解析為 JavaScript 物件
        dataset = JSON.parse(this.responseText);
        
        // 調用函數處理資料並顯示在網頁上
        addNewData(dataset);
    }
};

// 處理並顯示資料的函數
function addNewData(dataset) {
    // 獲取表格元素
    var myTable = document.getElementById("csie");
    
    // 遍歷 dataset 陣列，處理每筆資料
    dataset.forEach(function(data, index) {
        // 在表格尾部插入新行 (-1 表示在最後一行之後插入)
        var row = myTable.insertRow(-1);
        
        // 在新行中插入單元格並設置內容
        row.insertCell(0).innerHTML = data['title'];               // 名稱
        row.insertCell(1).innerHTML = data['showInfo'][0]['location'];  // 地點
        row.insertCell(2).innerHTML = data['showInfo'][0]['price'];     // 票價
    });
}

// 清空表格資料的函數 (保留表頭)
function delOldData() {
    var myTable = document.getElementById("csie");
    
    // 獲取表格行數
    var rowCount = myTable.rows.length;
    
    // 從最後一行開始刪除，保留表頭
    for (var i = rowCount - 1; i > 0; i--) {
        myTable.deleteRow(i);
    }
}