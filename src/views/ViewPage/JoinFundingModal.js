import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes

// @material-ui/core components

// core components


import { Container } from "@material-ui/core";
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import FavoriteIcon from '@material-ui/icons/Favorite';
import { Fade } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';

import styles from "assets/jss/material-kit-react/views/profilePage.js";



export default function JoinFundingModal (props) {
    const history = useHistory();
    const [form,setForm] = useState({})
    const [name,setName]=useState()
    const [email,setEmail] = useState();
    const [tel,setTel]=useState();
    const [token,setToken] = useState(localStorage.getItem("token"))

    const modalClose = () =>{
        props.onClose
    }

    useEffect(() => {
        console.log("토큰",token)
        fetch('http://localhost:8081/contents/preOrder',{
            headers : {
                "Authorization" : `Bearer ${token}`},
            method : "POST"
              }).
              then((res)=>{
                  if(res.status==200){
                      return res.json()
                  }
                  else{
                      throw Error()
                  }
              }).then((res)=>{
                  console.log(res)
                  setForm(
                      res
                  )
              }).catch(e=>{
                  console.log(e.message)
              })
        
        
    }, [])
    const FormValueHandler = (e) =>{
        setForm({
            ...form,
            name : props.title,
            fundingId : props.fundingId,
            [e.target.name] : e.target.value
        })
        console.log(form)
    }
    const buttonClick = (url) =>{
    
        history.push(url);
    };

    const comma = (obj) => {
        var regx = new RegExp(/(-?\d+)(\d{3})/);
       
        var strArr = `${obj}`.split('.');
        while (regx.test(strArr[0])) {//문자열에 정규식 특수문자가 포함되어 있는지 체크
            //정수 부분에만 콤마 달기 
            strArr[0] = strArr[0].replace(regx, "$1,$2");//콤마추가하기
        }
            obj = strArr[0];
        
        return obj;//문자열 반환
      }
      const submit = () =>{
         console.log("asd",form.amount)
         console.log(props.minFundraising)
          if(form.amount<props.minFundraising){
              return alert("최소 펀딩 참여 금액보다 적은 금액으로 참여하실 수 없습니다.")
          }
         
        //   setForm({
        //     ...form,
        //     buyer_name : document.querySelector('input[name="buyer_name"]').value,
        //     buyer_email : document.querySelector('input[name="buyer_email"]').value,
        //     buyer_tel : document.querySelector('input[name="buyer_tel"]').value,
        //     amount : document.querySelector('input[name="amount"]').value,
            
            
        //   })
         
          fetch("http://localhost:8081/contents/participation",{
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-type" : "application/json" },
            method : "POST",
            body :
                JSON.stringify(form)
            }).then((res)=>{
                if(res.status==200){
                    alert("펀딩 참여가 성공적으로 완료되었습니다.")
                    modalClose
                    history.push(`/my`)
                }
                else{
                    alert("이미 참여한 펀딩입니다.")
                }
                
            }).catch((e)=>{
                console.log(e.message)
            })
        }
      
  return (
    <Fade 
        in='checked' 
        timeout={{
            appear: 1000, 
            enter: 500, 
            exit: 1000
        }}>
         <div style={{backgroundColor:'white',width:"70%",height:"90%"}}>
            <Container>
            <div style={{display:"flex",justifyContent:"center"}}>
                <h3>펀딩 참여하기</h3>
            </div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{marginLeft:"100px"}}><h4>참여하시는 펀딩</h4></div>
                <div style={{display:'flex', alignItems:'center',marginRight:"100px"}}>
                    <h4>{props.title}</h4>
                </div>

            </div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{marginLeft:"100px"}}><h4>크리에이터 정보</h4></div>
                <div style={{display:'flex', alignItems:'center',marginRight:"100px"}}>
                    <h4
                    style={{
                        cursor:"pointer",
                        color:"gray"
                    }}
                    onClick={()=>{buttonClick(`/myPage/${props.creatorNickName}`)}}>{props.creatorNickName}</h4>      
                </div>

            </div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{marginLeft:"100px"}}><h4>남은 티켓</h4></div>
                <div style={{display:'flex', alignItems:'center',marginRight:"100px"}}>
                    <h4>{comma(props.maxBacker-props.totalBacker)} 장</h4>      
                </div>

            </div>

            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{marginLeft:"100px"}}><h4>총 모인 금액</h4></div>
                <div style={{display:'flex', alignItems:'center',marginRight:"100px"}}>
                    <h4>{comma(props.totalFundraising)} 원</h4>      
                </div>

            </div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{marginLeft:"100px"}}><h4>최소 펀딩 참여 금액</h4></div>
                <div style={{display:'flex', alignItems:'center',marginRight:"100px"}}>
                    <h4>{comma(props.minFundraising)} 원</h4>      
                </div>

            </div>

            <div style={{display:'flex', justifyContent:'space-between'}}>
                
                <div style={{marginLeft:"100px"}}><h4>펀딩 참여 금액</h4></div>
                <div style={{display:'flex', alignItems:'center',marginRight:"100px"}}>
                <input name="amount" 
               
                onChange={FormValueHandler}
                style={{border:'1px solid #B6B7B9',
                borderRadius:'3px', 
                width:'150px',
                height:'40px', marginRight:'10px'}} 
                placeholder={' 펀딩 금액을 입력해주세요.'} />
                <p>원</p>        
                </div>

            </div>

            <div style={{display:'flex', justifyContent:'space-between'}}>
                
                <div style={{marginLeft:"100px"}}><h4>참여자 이름</h4></div>
                <div style={{display:'flex', alignItems:'center',marginRight:"100px"}}>
                <input name="buyer_name" 
                 value={form.buyer_name}
                onChange={FormValueHandler}
                style={{border:'1px solid #B6B7B9',
                borderRadius:'3px', 
                width:'150px',
                height:'40px', marginRight:'10px'}} 
                placeholder={' 이름을 입력해주세요.'} />
                <p>원</p>        
                </div>

            </div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                
                <div style={{marginLeft:"100px"}}><h4>참여자 이메일</h4></div>
                <div style={{display:'flex', alignItems:'center',marginRight:"100px"}}>
                <input name="buyer_email" 
                onChange={FormValueHandler}
                value={form.buyer_email}
                style={{border:'1px solid #B6B7B9',
                borderRadius:'3px', 
                width:'150px',
                height:'40px', marginRight:'10px'}} 
                placeholder={' 이메일을 입력해주세요.'} />
                <p>원</p>        
                </div>

            </div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                
                <div style={{marginLeft:"100px"}}><h4>참여자 전화번호</h4></div>
                <div style={{display:'flex', alignItems:'center',marginRight:"100px"}}>
                <input name="buyer_tel"
                value={form.buyer_tel} 
                onChange={FormValueHandler}
                style={{border:'1px solid #B6B7B9',
                
                borderRadius:'3px', 
                width:'150px',
                height:'40px', marginRight:'10px'}} 
                placeholder={' 전화번호를 입력해주세요.'} />
                <p>원</p>        
                </div>

            </div>
            <div style={{display:'flex',justifyContent:"center",marginTop:"30px"}}>
            <p>목표 금액인 {(props.goalFundraising)}원이 모이거나 남은 티켓이 모두 <br/> 소진되었을 때 결제가 진행되어 안내 메일이 발송됩니다.<br/> 결제는 펀딩이 성공했을 때 다함께 진행됩니다.</p>
            </div>
            <div style={{height : "300px",display:"flex", justifyContent:"center"}}>
                <Button
                variant="contained"
                color="secondary"
                style={{height:'50px', width:'100px'}}
                onClick={submit}
                >
                <h4 style={{fontWeight:'bold'}}>참여하기</h4>
                </Button>
            </div>
            </Container>
        </div>
    </Fade>
    
   
  );
}