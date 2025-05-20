import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const DataGrid = ({ searchKeyword }) => {
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  // 定義欄位配置
  const columnDefs = [
    { headerName: '名稱', field: 'title', sortable: true, filter: true },
    { headerName: '地點', field: 'location', sortable: true, filter: true },
    { headerName: '票價', field: 'price', sortable: true, filter: true }
  ];
  
  // 使用 useEffect 從 API 取得資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6');
        const data = await response.json();
        
        // 處理資料格式，確保與欄位定義匹配
        const formattedData = data.map(item => ({
          title: item.title,
          location: item.showInfo && item.showInfo.length > 0 ? item.showInfo[0].location : '',
          price: item.showInfo && item.showInfo.length > 0 ? item.showInfo[0].price : ''
        }));
        
        setRowData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        console.error('獲取資料時發生錯誤:', error);
      }
    };
    
    fetchData();
  }, []); // 空陣列表示僅在元件掛載時執行一次
  
  // 使用 useEffect 處理搜尋過濾
  useEffect(() => {
    if (searchKeyword && searchKeyword.trim() !== '') {
      const keyword = searchKeyword.toLowerCase();
      const filtered = rowData.filter(item => 
        item.title.toLowerCase().includes(keyword) || 
        item.location.toLowerCase().includes(keyword)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(rowData);
    }
  }, [searchKeyword, rowData]);
  
  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={filteredData}
        pagination={true}
        paginationPageSize={10}
        domLayout='autoHeight'
      />
    </div>
  );
};

export default DataGrid;