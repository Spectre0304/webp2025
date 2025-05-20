import React, { useState, useEffect } from 'react';
// AG Grid 28.2.1 的引入方式
import { AgGridReact } from 'ag-grid-react';
// 舊版本 AG Grid 的模組引入方式
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// 移除錯誤的模組引入和註冊

function App() {
  const [rowData, setRowData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  
  // 欄位定義
  const columnDefs = [
    { 
      headerName: '名稱', 
      field: 'title', 
      sortable: true, 
      filter: true,
      flex: 2,
      wrapText: true,
      autoHeight: true
    },
    { 
      headerName: '地點', 
      field: 'location', 
      sortable: true, 
      filter: true,
      flex: 1.5,
      wrapText: true,
      autoHeight: true
    },
    { 
      headerName: '票價', 
      field: 'price', 
      sortable: true, 
      filter: true,
      flex: 1,
      wrapText: true,
      autoHeight: true
    }
  ];
  
  // 取得資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6');
        
        if (!response.ok) {
          throw new Error(`API 請求失敗: ${response.status}`);
        }
        
        const data = await response.json();
        
        const formattedData = data.map(item => ({
          title: item.title,
          location: item.showInfo && item.showInfo.length > 0 ? item.showInfo[0].location : '',
          price: item.showInfo && item.showInfo.length > 0 ? item.showInfo[0].price : ''
        }));
        
        setRowData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        console.error('獲取資料時發生錯誤:', error);
        alert('無法載入資料，請檢查網路連線或稍後再試');
      }
    };
    
    fetchData();
  }, []);
  
  // 過濾資料
  useEffect(() => {
    if (searchKeyword && searchKeyword.trim() !== '') {
      const keyword = searchKeyword.toLowerCase();
      const filtered = rowData.filter(item => 
        item.title.toLowerCase().includes(keyword) || 
        (item.location && item.location.toLowerCase().includes(keyword))
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(rowData);
    }
  }, [searchKeyword, rowData]);
  
  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className="container mt-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1>景點觀光展覽資訊</h1>
        <input 
          type="text" 
          className="form-control" 
          style={{ width: '300px' }} 
          placeholder="搜尋..." 
          onChange={handleSearch}
        />
      </div>
      
      <div 
        className="ag-theme-alpine" 
        style={{ 
          width: '100%', 
          height: '500px',
          '--ag-header-background-color': '#198754',
          '--ag-header-foreground-color': 'white',
          '--ag-odd-row-background-color': '#f2f2f2'
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={filteredData}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={{
            flex: 1,
            minWidth: 150,
            sortable: true,
            resizable: true,
            wrapText: true
          }}
        />
      </div>
    </div>
  );
}

export default App;