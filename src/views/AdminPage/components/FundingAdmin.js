import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MenuAppBar from './MenuAppBar';
import { useEffect, useState } from "react";
import BackerView from './BackerView';
import { Button } from '@material-ui/core';
import { ACCESS_TOKEN } from "export/export";
import FundingInspectionAdmin from './FundingInspectionAdmin';

const columns = [
  {
    field: 'id',
    headerName: '아이디',
    minWidth: '120',
    maxWidth: '200',
  },
  {
    field: 'title',
    headerName: '제목',
    minWidth: '180',
    maxWidth: '200'
  },
  {
      field: 'summary',
      headerName: '요약',
      minWidth: '230',
      maxWidth: '300'
    },
    {
      field: 'postDate',
      headerName: '게시일',
      minWidth: '180',
      maxWidth: '200'
    },
    {
      field: 'category',
      headerName: '카테고리',
      minWidth: '130',
      maxWidth: '200'
    },
    {
      field: 'manageUrl',
      headerName: 'Url',
      minWidth: '150',
      maxWidth: '200'
    },
    {
      field: 'status',
      headerName: '상태',
      minWidth: '130',
      maxWidth: '200'
    },
    {
      field: 'button',
      headerName: '상세보기',
      type: 'button',
      width: 150,
      renderCell : (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{marginLeft:16}}
          onClick={(e) => {fundingSelect(e, params)}}
        >상세보기</Button>
      )
    },
];

function fundingView(list) {
  var tempList = []
  for(var i in list){
    tempList.push(
      {id : list[i].fundingId, 
      title : list[i].title, 
      summary : list[i].summary, 
      category : list[i].category, 
      postDate : list[i].postDate,
      manageUrl : list[i].manageUrl,
      status : list[i].status
      }
    );
  }
  return tempList;
}

//펀딩 상세보기로 이동
function fundingSelect(e, params) {
  e.preventDefault();
  window.location.href = 
    "/admin-fundingView/"+params.row.manageUrl;
}
export default function FundingAdmin() {
  
    const [rows,setRows] = React.useState([])
    const [token,setToken] = useState(localStorage.getItem("token"))

    useEffect(() => {
        fetch('http://localhost:8081/admin/funding', {
          headers: {
            'content-type': 'application/json',
            "Authorization" : 'Bearer '+ localStorage.getItem(ACCESS_TOKEN)
          }
        })
        .then(res => res.json())
        .then((res) => {
          console.log("아래")
          console.log(res)
          console.log("위")
          if(!res.status==200){
            throw new Error('http 오류');
          }
          setRows(fundingView(res));
        })
      }, []);

    return (
      <div>
        <MenuAppBar></MenuAppBar>
          <h2>funding관리</h2>
        <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick/>
        </div>
      </div>
    )
}