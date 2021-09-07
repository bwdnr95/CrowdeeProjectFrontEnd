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


  export default function FundingInspectionAdmin() {
    const [token,setToken] = useState(localStorage.getItem("token"))
    const [rows,setRows] = React.useState([])

    const columns = [
      {
        field: 'id',
        headerName: '아아디',
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
        minWidth: '300',
        maxWidth: '500'
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
            onClick={(e) => {fundingOk(e, params)}}
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
            onClick={(e) => {fundingNo(e, params)}}
          >거절</Button>
        )
      },
  ];

    function fundingOk(e, params) {
      e.preventDefault();
      changeConfirm(params.id)
      alert("승인되었습니다.");
    }

    function fundingNo(e,params) {
      e.preventDefault();
      window.location.href = "/admin-fundingNo/"+params.id;
    }

    //펀딩 상세보기로 이동
  function fundingSelect(e,params) {
    e.preventDefault();
    window.location.href = 
      "/admin-fundingView/"+params.row.manageUrl;  
  }

    //심사승인
    function changeConfirm(id) {
      console.log("메소드 실행잘됨")
      fetch('http://localhost:8081/admin/fundingOk/'+id, {
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
      });
    }

    //심사 전체
    useEffect(() => {
        fetch('http://localhost:8081/admin/fundingInspection', {
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
          setRows(createData(res));
        })
      }, []);
      return (
        <div>
          <MenuAppBar></MenuAppBar>
            <h2>funding심사관리</h2>
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