import MenuAppBar from './MenuAppBar';
// import { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components

import Footer from "components/Footer/Footer.js";

import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import FavoriteIcon from '@material-ui/icons/Favorite';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function FundingView() {
  const[view, setView] = React.useState([])
  const[fundingLists, setFundingLists] = React.useState([])
  // const [url, setUrl] = React.useState([])
    const manageUrl = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)
    useEffect(() => {
        fetch('http://localhost:8081/creator/create/preview/'+manageUrl)
        .then(res => res.json())
        .then((res) => {
          console.log("아래")
          console.log(res)
          console.log("위")
          // console.log(res.fundingList[0].projectUrl)
          if(!res.status==200){
                console.log("혹시 여기왔니?")
                throw new Error('http 오류');
              }
              setView(res)
              setFundingLists(res.fundingList)
              // setUrl(res.fundingList[0].projectUrl)
        })
      }, []);
      const classes = useStyles();
      const { ...rest } = view;
      const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
      );
      const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    
    
    
      return (
        <div style={{backgroundColor:'white'}}>
          <div style={{overflowY:"scroll"}}>

          <div style={{display:'flex', alignItems:'center', flexDirection:'column', height:'850px', width:'100%', paddingTop:'130px'}}>
            <div style={{display:'flex', alignItems:'center', flexDirection:'column', height:'25%', width:'92%'}}>
              <Button style={{marginBottom:'-20px'}}>
                <div style={{fontWeight:'bold', color:'gray'}}>{view.category}</div>
                
              </Button>
              <div style={{marginBottom:'-15px'}}>
                <h2 style={{fontWeight:'bold'}}>{view.title}</h2>
                
              </div>
              <div style={{display:'flex', alignItems:'center'}}>
                <Avatar style={{width:'20px', height:'20px', fontSize:'12px', fontWeight:'bold', marginRight:'-10px'}}>C</Avatar>
                <Button>
                  <h5 style={{fontWeight:'bold'}}>{view.creatorNickName}</h5>
                  
                </Button>
              </div>
            </div>
            <div style={{display:'flex', height:'63%', width:'92%'}}>
              <div style={{border:'1px solid black', height:'495px', width:'650px'}}>
                <img style={{width:'100%', height:'100%'}} src={view.thumbNailUrl} />
                
              </div>
              <div style={{paddingLeft:'30px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <div style={{marginBottom:'-25px'}}>
                  <h4 style={{fontWeight:'bold', color:'gray'}}>펀딩상황</h4>
                </div>
    
                <div style={{display:'flex', alignItems:'center'}}>
                  <h2 style={{fontWeight:'bold'}}>{view.totalFundraising}</h2>
                  
                  <h2 style={{fontWeight:'bold'}}>원</h2>
                  <h5 style={{fontWeight:'bold', marginLeft:'5px', paddingTop:'22px'}}>펀딩 중</h5>
                </div>
    
                <h5 style={{fontWeight:'bold', marginBottom:'-20px', color:'gray'}}>남은시간</h5>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h2 style={{fontWeight:'bold'}}>{view.restDate}</h2>
                  
                  <h5 style={{fontWeight:'bold', marginLeft:'5px', paddingTop:'17px'}}>일</h5>
                </div>
    
                <h5 style={{fontWeight:'bold', marginBottom:'-20px', color:'gray'}}>후원자</h5>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h2 style={{fontWeight:'bold'}}>{view.totalBacker}</h2>
                  
                  <h5 style={{fontWeight:'bold', marginLeft:'5px', paddingTop:'17px'}}>명</h5>
                </div>
    
                <div style={{display:'flex', justifyContent:'center', width:'300px', paddingTop:'100px'}}>
                  <Button 
                  size="small"
                  variant="outlined"
                  style={{height:'50px', width:'50px', marginRight:'10px'}}
                
                  ><FavoriteIcon
                  color="secondary"
                 />
                  </Button>
                  <Button
                  variant="contained"
                  color="secondary"
                  style={{height:'50px'}}
                  
                  >
                    <h4 style={{fontWeight:'bold'}}>펀딩하기</h4>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', borderTop:'1.9px solid #E9E9E5',  borderBottom:'2px solid #F0F1EC', height:'10%', width:'100%', backgroundColor:'white'}}>
            <div>
              <h4 style={{fontWeight:'bold' , overflowY:"auto"}}>프로젝트 계획</h4>
            </div>
          </div>
          <div style={{display:'flex', justifyContent:'center', height:'100%', width:'100%', paddingTop:'30px'}}>
            <div style={{width:'65%', paddingLeft:'30px'}}>
              
              {view.contents}
            </div>
            <div style={{width:'35%', paddingLeft:'10px', paddingRight:'30px'}}>
              <div style={{border:'1px solid #E9E9E5', borderBottom:'2px solid #F0F1EC', borderRadius:'5px', padding:'20px', position:'sticky', top:'80px'}}>
                <h5 style={{fontWeight:'bold'}}>크리에이터 소개</h5>
                <div style={{display:'flex', alignItems:'center'}}>
                  <Button >
                    <Avatar style={{width:'40px', height:'40px', fontSize:'12px', fontWeight:'bold', marginRight:'10px'}}>E</Avatar>
                    <h5 style={{fontWeight:'bold'}}>{view.creatorNickName}</h5>
    
                  </Button>
                </div>
                <div style={{marginTop:'15px'}}>
                  <p style={{fontWeight:'normal', color:'gray'}}>{view.aboutMe}</p>
                  
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                {/* {view.fundingList.map((url)=>(
                  <Button>
                    <Avatar alt="Remy Sharp" src={url.thumbNailUrl} style={{width:"70px",height:"70px"}} />
                  </Button>
                ))} */}
                  
                  <Button>
                  
                    <ArrowForwardIosIcon/>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          </div>
          
        </div>
       
        
      );
    }