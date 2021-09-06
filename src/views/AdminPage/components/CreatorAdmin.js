import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MenuAppBar from './MenuAppBar';
import { useEffect, useState } from "react";
import { Button } from '@material-ui/core';
import { ACCESS_TOKEN } from "export/export";

function CreatorView(list) {
  var tempList = []
  for(var i in list){
    tempList.push(
      {id : list[i].creatorId, Business_number : list[i].businessNumber,
      Account_number : list[i].accountNumber, Bank_book_image_url : list[i].bankBookImageUrl,
      Bank_name : list[i].bankName,  creator_nickname : list[i].creatorNickName, 
      status : list[i].status, authority : list[i].authorities,
      }
    );
  }
  return tempList;
}

  function CreatorSelect(e,params) {
    e.preventDefault();
    window.location.href = "/admin-creatorView/"+params.id;
  }
  
  export default function CreatorAdmin() {
    const [token,setToken] = useState(localStorage.getItem("token"))
    const [rows,setRows] = React.useState([])

    const columns = [
        {
          field: 'id',
          headerName: '아이디',
          minWidth: '120',
          maxWidth: '200'
        },
        {
          field: 'Business_number',
          headerName: '사업자번호',
          minWidth: '150',
          maxWidth: '200'
        },
        {
          field: 'creator_nickname',
          headerName: '닉네임',
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
          field: 'authority',
          headerName: '권한',
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
              onClick={(e) => {CreatorSelect(e, params)}}
            >상세보기</Button>
          )
        },
    ];

    useEffect(() => {
        fetch('http://localhost:8081/admin/creator', {
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
          setRows(CreatorView(res));
        })
      }, []);
    return (
        <div>
             <MenuAppBar></MenuAppBar>
             <h2>Creator</h2>
             <div style={{ height: 800, width: '100%' }}>
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