import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MenuAppBar from './MenuAppBar';
import { useEffect, useState } from "react";
import BackerView from './BackerView';
import { Button } from '@material-ui/core';


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

    const [rows,setRows] = React.useState([])

    const columns = [
      {
        field: 'id',
        headerName: 'id',
        type: 'number',
        width: 90 },
      {
        field: 'userName',
        headerName: 'userName',
        width: 150,
        type: 'text',
        editable: true,
      },
      {
          field: 'email',
          headerName: 'email',
          type: 'text',
          width: 120,
          editable: true,
        },
        {
          field: 'registDate',
          headerName: 'registDate',
          type: 'text',
          width: 200,
          editable: true,
        },
        {
          field: 'authority',
          headerName: 'authority',
          type: 'text',
          width: 150,
          editable: true,
        },
        {
          field: 'status',
          headerName: 'status',
          type: 'text',
          width: 150,
          editable: true,
        },
        {
          field: 'button',
          headerName: '상세보기',
          type: 'button',
          width: 150,
          editable: true,
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

    //backer 멤버 전체
    useEffect(() => {
        fetch('http://localhost:8081/admin/backer')
        .then(res => res.json())
        .then((res) => {
          console.log("아래")
          console.log(res)
          console.log("위")
          if(!res.status==200){
            throw new Error('http 오류');
          }
          setRows(backerView(res));
        })
      }, []);

    return (
      <div>
        <MenuAppBar></MenuAppBar>
          <h2>Backer</h2>
        <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick/>
        </div>
      </div>
    )
}