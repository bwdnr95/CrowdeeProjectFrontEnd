import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import Footer from 'components/Footer/Footer';

import GridContainer from "components/Grid/GridContainer.js";
import MyFundingCard from "components/CrowdeeComponents/MyFundingCard";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
const useStyles = makeStyles(styles);
export default function MyPage(props) {
    const classes = useStyles();


    const history = useHistory();
    const buttonClick = (url) =>{
    
        history.push(url);
      };

    const [funding,setFunding] = useState([]);
    const [result,setResult] = useState();
    const [token,setToken] = useState(localStorage.getItem("token"))

  const setFund = (data) => {
    return new Promise((resolve,reject) =>{
        resolve(setFunding(data))
        console.log(data)
        
    })
  }
  const setRes = () =>{
      return new Promise((resolve,reject)=>{
          resolve(
              setResult(
                <div className={classes.section}>
                    <GridContainer justify="center">
                        {funding.map((funding)=>(
                        <MyFundingCard 
                        id={funding.fundingId}
                        title={funding.title}
                        imgUrl={funding.thumbNailUrl}
                        summary={funding.summary}
                        restDate={funding.restDate}
                        category={funding.category}
                        totalFundraising={funding.totalFundraising}
                        goalFundraising={funding.goalFundraising}
                        ROA={funding.rateOfAchievement}
                        projectUrl={funding.projectUrl} />
                        ))}
                    </GridContainer>
                </div>
              )
                
          )
      })
  }

  const wish = async () =>{
    try{
        let data = await fetch("http://localhost:8081/member/myPage/wishList", {
            headers : {
            "Authorization" : `Bearer ${token}`}
            });
        
        let res = await data.json();
        await setFund(res)
    }
        catch(e){
            console.log(e.message)
            setResult(
                <div>
                    <h5 style={{fontWeight:'bold', color:'gray'}}>
                        찜한 프로젝트가 없습니다.
                    </h5>
                </div>
            )
        }
    }

  const participant = async () =>{
    try{
        let data = await fetch("http://localhost:8081/member/myPage/fundingList", {
            headers : {
            "Authorization" : `Bearer ${token}`}
            });
        
        let res = await data.json();
        await setFund(res)
    }
        catch(e){
            console.log(e.message)
            setResult(
                <div>
                    <h5 style={{fontWeight:'bold', color:'gray'}}>
                        후원한 프로젝트가 없습니다.
                    </h5>
                </div>
            )
        }
    }
  
  const waiting = async () =>{

    try{
        let data = await fetch("http://localhost:8081/member/myPage/waitingForPayment", {
            headers : {
            "Authorization" : `Bearer ${token}`}
            });
            
            let res = await data.json();
            await setFund(res)
    }
    catch(e){
        console.log(e.message)
        setResult(
            <div>
                <h5 style={{fontWeight:'bold', color:'gray'}}>
                    진행중인 프로젝트가 없습니다.
                </h5>
            </div>
        )
    }
    }
  


   
    const [nickName,setNickName] = useState(localStorage.getItem("nickName"))

 
    
    const changeIntro = () =>{
        setPath('/my/intro')
        props.history.push('/my/intro')
    }
    const changeBacked = async () =>{
        await participant()
        await setRes()
        
        
        
    }
    const changeCreated = async () =>{
        await waiting()
        await setRes()
        
        
       
    }
    const changeWish = async () =>{
        await wish()
        await setRes()
    }

   


    return (
        <div style={{backgroundColor:'white', width:'100%', height:'100%'}}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', borderBottom:'2px solid #F0F1EC', height:'10%', width:'100%', backgroundColor:'white', position:'fixed', zIndex:'1'}}>
                <div style={{marginLeft:'-80%', position:'fixed'}}>
                    <Button onClick={()=>buttonClick("/")}>
                        <CloseIcon/>
                    </Button>
                </div>
                <div style={{position:'fixed'}}>
                    <Button onClick={()=>buttonClick("/")}>
                        <img src={require('components/Header/CrowdeeLogoFinal2.png').default}/>
                    </Button>
                </div>
                <div style={{marginRight:'-65%', position:'fixed'}}>
                    <Button onClick={()=>buttonClick("/search")}>
                    <SearchIcon/>
                    </Button>
                </div>
                <div style={{marginRight:'-75%', display:'flex', alignItems:'center'}}>
                    <Button onClick={()=>buttonClick("/my")}>
                    <Avatar style={{width:'20px', height:'20px', fontSize:'12px', fontWeight:'bold', marginRight:'5px'}}>C</Avatar>
                    </Button>
                </div>
            </div>
            <div style={{backgroundColor:'white', width:'100%', minHeight:'1000px', maxHeight:'100%'}}>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', paddingTop:'130px'}}>
                    <Avatar alt="Remy Sharp" src={require('./sung.png').default} style={{width:"150px",height:"150px"}} />
                    <h2 style={{fontWeight:'bold', fontSize:'35px'}}>{nickName}</h2>
                </div>
                <div style={{display:'flex', justifyContent:'space-evenly', marginTop:'45px', borderBottom:'1.8px solid #F0F1EC'}}>
                    <Button style={{fontSize:'25px', color:'gray'}} onClick={changeIntro}>소개</Button>
                    <Button style={{fontSize:'25px', color:'gray'}} onClick={changeBacked}>후원한 프로젝트</Button>
                    <Button style={{fontSize:'25px', color:'gray'}} onClick={changeCreated}>진행중인 프로젝트</Button>
                    <Button style={{fontSize:'25px', color:'gray'}} onClick={changeWish}>찜한 프로젝트</Button>
                </div>
                <div style={{padding:'40px'}}>
                   <div>
                        {result}
                   </div>
                </div>
            </div>
            <Footer />
        </div>    
    );
};