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
      field: 'userName',
      headerName: '이름',
      minWidth: '120',
      maxWidth: '200'
    },
    {
      field: 'nickName',
      headerName: '닉네임',
      minWidth: '150',
      maxWidth: '200'
    },
    {
      field: 'mobile',
      headerName: '휴대전화',
      minWidth: '150',
      maxWidth: '200'
    },
    {
      field: 'email',
      headerName: '이메일',
      minWidth: '150',
      maxWidth: '200'
    },
    {
      field: 'registDate',
      headerName: '가입일',
      minWidth: '180',
      maxWidth: '200'
    },
    {
      field: 'secessionDate',
      headerName: '탈퇴일',
      minWidth: '180',
      maxWidth: '200'
    },
  ];

function backerDataList(list) {
    var backerTempList = []
    for(var i in list){
      backerTempList.push({id : list.memberId,
        userName : list.userName, nickName : list.nickName,
        mobile : list.mobile,  email : list.email, 
        emailCert : list.emailCert, registDate : list.registDate, 
        secessionDate : list.secessionDate, userState : list.userState,
        authoritiy : list.authorities});
      }
    return backerTempList;
  }

export default function BackerView() {
    const [rows,setRows] = React.useState([])
    const [token,setToken] = useState(localStorage.getItem("token"))
    const viewId = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)
    
    useEffect(() => {
        fetch('http://localhost:8081/admin/backerView/'+viewId, {
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
            setRows(backerDataList(res));
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