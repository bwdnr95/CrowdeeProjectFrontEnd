import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MenuAppBar from './MenuAppBar';
import { useEffect, useState } from "react";
import { Button } from '@material-ui/core';
import { ACCESS_TOKEN } from "export/export";

function createData(list) {
  var tempList = []
  for(var i in list){
    tempList.push(
      {id : list[i].creatorID, 
        creatorNickName : list[i].creatorNickName,
        bankBookImageUrl : list[i].bankBookImageUrl, 
        bankName : list[i].bankName,
        businessNumber : list[i].businessNumber, 
        status : list[i].status,
        accountNumber : list[i].accountNumber
      }
    );
  }
  return tempList;
}


  export default function CreaterInspectionAdmin() {
    
    const [rows,setRows] = React.useState([])
    const [token,setToken] = useState(localStorage.getItem("token"))

    function creatorOk(e, params) {
      e.preventDefault();
      changeConfirm(params.id)
      alert("승인되었습니다.");
    }

    function creatorNo(e,params) {
      e.preventDefault();
      window.location.href = "/admin-creatorNo/"+params.id;
    }
      

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
        {
          field: 'comfirm',
          headerName: '승인',
          type: 'button',
          width: 100,
          renderCell : (params) => (
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{marginLeft:16}}
              onClick={(e) => {creatorOk(e, params)}}
            >승인</Button>
          )
        },
        {
          field: 'reject',
          headerName: '거절',
          type: 'button',
          width: 100,
          renderCell : (params) => (
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{marginLeft:16}}
              onClick={(e) => {creatorNo(e, params)}}
            >거절</Button>
          )
        },
    ];

    //심사승인
    function changeConfirm(id) {
      console.log("메소드 실행잘됨")
      fetch('http://localhost:8081/admin/creatorOK/'+id, {
        headers: {
          'content-type': 'application/json',
          "Authorization" : 'Bearer '+ localStorage.getItem(ACCESS_TOKEN)
        }
      })  
      .then(res => res.json())
      .then((res) => {
        if(!res.status==200){
          throw new Error('http 오류');
        }
      });
    }

    //심사 전체
    useEffect(() => {
        fetch('http://localhost:8081/admin/inspection', {
          headers: {
            'content-type': 'application/json',
            "Authorization" : 'Bearer '+ localStorage.getItem(ACCESS_TOKEN)
          }
        }) 
        .then(res => res.json())
        .then((res) => {
          if(!res.status==200){
                throw new Error('http 오류');
              }
              setRows(createData(res));
               if (res.success) {
          }
        })
      }, []);
    return (
        <div>
             <MenuAppBar></MenuAppBar>
             <div style={{ height: 800, width: '100%' }}>
            <h2>크리에이터 심사</h2>
             <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                />
            </div>
        </div>
    )

}