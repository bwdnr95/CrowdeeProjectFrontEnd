import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MenuAppBar from './MenuAppBar';
import { useEffect, useState } from "react";
import { Button } from '@material-ui/core';
import { ACCESS_TOKEN } from "export/export";

  export default function FundingNo() {
    const [token,setToken] = useState(localStorage.getItem("token"))
    const viewId = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)
    const [inputs, setInputs] = useState({
      mailContents: '',
    });
    
    const onChange = (e) => {
      setInputs({
        [e.target.id] : e.target.value // name 키를 가진 값을 value 로 설정
      });
    };
  
    const onReset = () => {
      setInputs({
        mailContents: '',
      })
    };

    function mailSubmit(e) {
      console.log(inputs.mailContents)
        fetch('http://localhost:8081/admin/FundingNo/'+viewId, {
          headers: {
            'content-type': 'application/json',
            "Authorization" : 'Bearer '+ localStorage.getItem(ACCESS_TOKEN)
          },
          method : "post",
          body : JSON.stringify(inputs)
        })  
          .then(res => res.json())
          .then((res) => {
            console.log(res)
            if(!res.status==200){
              throw new Error('http 오류');
            }
            window.location.href = 
             "/admin-funding-inspection/";
          });
    }
    return (
        <div>
             <MenuAppBar></MenuAppBar>
             <div style={{ height: 800, width: '100%' }}>
            <h2> 펀딩심사 탈락 사유를 적어주세요.</h2>
            <textarea id="mailContents" placeholder="거절사유" onChange={onChange} style={{height :300, width : 500 }}/>
            <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{marginLeft:16}}
              onClick={(e) => {mailSubmit(e)}}
            >전송하기</Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{marginLeft:16}}
              onClick={onReset}
            >초기화</Button>
            </div>
          </div>
        </div>
    )

}