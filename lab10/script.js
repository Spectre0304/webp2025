var imglist_Url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=10&format=json&nojsoncallback=1';

document.addEventListener('DOMContentLoaded', function() {
});

function getimg() {
    showLoading(true);
    hideError();
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', imglist_Url, true);
    xhr.timeout = 10000; // 10 秒超時
    
    xhr.onload = function() {
        showLoading(false);
        
        if (xhr.status === 200) {
            try {
                var data = JSON.parse(this.responseText);
                if (data.stat === 'ok') {
                    add_new_img(data);
                } else {
                    showError('API 返回錯誤: ' + data.message);
                }
            } catch (e) {
                showError('解析 JSON 時出錯: ' + e.message);
            }
        } else {
            showError('API 請求失敗, 狀態碼: ' + xhr.status);
        }
    };
    
    xhr.ontimeout = function() {
        showLoading(false);
        showError('請求超時，請稍後再試');
    };
    
    xhr.onerror = function() {
        showLoading(false);
        showError('網絡錯誤，請檢查您的連接');
    };
    
    xhr.send();
}

function add_new_img(dataset) {
    var gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    
    if (dataset && dataset.photos && dataset.photos.photo && dataset.photos.photo.length > 0) {

      var maxPhotos = Math.min(dataset.photos.photo.length, 9); 
        
        for (var i = 0; i < maxPhotos; i++) {
            var photo = dataset.photos.photo[i];
            
            
            var imgUrl = constructImageUrl(photo);
            
            var img = document.createElement('img');
            img.src = imgUrl;
            img.alt = photo.title || 'flickr photo';
                        
            img.addEventListener('click', createClickHandler(photo));
            
            gallery.appendChild(img);
        }
    } else {
        showError('沒有找到照片');
    }
}


function constructImageUrl(photo) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
}


function createClickHandler(photo) {
    return function() {

        var photoPageUrl = 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id;
        window.open(photoPageUrl, '_blank');
    };
}

// 顯示/隱藏加載中提示
function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}

function showError(message) {
    var errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError() {
    document.getElementById('error').style.display = 'none';
}