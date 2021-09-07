import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MenuAppBar from './MenuAppBar';
import { useEffect, useState } from "react";
import BackerView from './BackerView';
import { Button, Container } from '@material-ui/core';
import { ACCESS_TOKEN } from "export/export";
import { createStyles, makeStyles } from '@material-ui/core';


const columns = [
    {
      field: 'id',
      headerName: '아이디',
      // headerAlign : 'center',
      // align : 'center',
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
      field: 'authority',
      headerName: '권한',
      minWidth: '130',
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
      width : 130,
      renderCell : (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{marginLeft:16}}
          onClick={(e) => {backerSelect(e, params)}}
        >상세보기</Button>
      )
    },
];

function backerView(list) {
  var tempList = []
  for(var i in list){
    tempList.push(
      {id : list[i].memberId, 
      userName : list[i].userName, 
      email : list[i].email, 
      registDate : list[i].registDate, 
      authority : list[i].authorities,
      status : list[i].status
      }
    );
  }
  return tempList;
}

  function backerSelect(e,params) {
    e.preventDefault();
    window.location.href = "/admin-backerView/"+params.id;
  }
  

  export default function BackerAdmin() {
    const [token,setToken] = useState(localStorage.getItem("token"))
    const [rows,setRows] = React.useState([])

    //backer 멤버 전체
    useEffect(() => {
        fetch('http://localhost:8081/admin/backer', {
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
            setRows(backerView(res));
          })
        }, []);

    return (
      <div style={{width:'100vw'}}>
        <MenuAppBar></MenuAppBar>
          <h2>Backer</h2>
          <div
            style={{
              height : 800,
              width: "100%"
            }}
          >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          style={{width:'100%'}}
          />
        </div>
      </div>
    )
}