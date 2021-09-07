import render from 'dom-serializer';
import { DataGrid } from '@material-ui/data-grid';
import MenuAppBar from './MenuAppBar';
import { useEffect, useState } from "react";
import * as React from 'react';
import { ACCESS_TOKEN } from "export/export";

const columns = [
    {
      field: 'id',
      headerName: '아이디',
      minWidth: '120',
      maxWidth: '200'
    },
    {
      field: 'creatorNickName',
      headerName: '닉네임',
      minWidth: '150',
      maxWidth: '200'
    },
    {
      field: 'bankBookImageUrl',
      headerName: '통장사본',
      minWidth: '150',
      maxWidth: '200'
    },
    {
      field: 'bankName',
      headerName: '은행명',
      minWidth: '130',
      maxWidth: '200'
    }, 
    {
      field: 'accountNumber',
      headerName: '계좌번호',
      minWidth: '150',
      maxWidth: '200'
    },
    {
      field: 'businessNumber',
      headerName: '사업자번호',
      minWidth: '150',
      maxWidth: '200'
    },
    {
      field: 'status',
      headerName: '상태',
      minWidth: '130',
      maxWidth: '200'
    },
  ];

function CreatorDataList(list) {
  var tempList = []
  for(var i in list){
    tempList.push(
      {id : list.creatorID, 
      creatorNickName : list.creatorNickName,
      bankBookImageUrl : list.bankBookImageUrl, 
      bankName : list.bankName,
      businessNumber : list.businessNumber, 
      status : list.status,
      authorities : list.authorities, 
      accountNumber : list.accountNumber
      }
    );
  }
  return tempList;
}

export default function CreatorView() {
  const [rows,setRows] = React.useState([])
  const [token,setToken] = useState(localStorage.getItem("token"))
  const viewId = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)
  
  useEffect(() => {
      fetch('http://localhost:8081/admin/creatorView/'+viewId, {
        headers: {
          'content-type': 'application/json',
          "Authorization" : 'Bearer '+ localStorage.getItem(ACCESS_TOKEN)
        }
      })  
      .then(res => res.json())
      .then((res) => {
        console.log(res)
        if(!res.status==200){
          throw new Error('http 오류');
        }
        setRows(CreatorDataList(res));
      })
    }, []); 
    
  return (
    <div>
      <MenuAppBar></MenuAppBar>
      <h2>상세페이지</h2>
      <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
      </div>
    </div>
  );
}  