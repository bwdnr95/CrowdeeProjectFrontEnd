import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { Button, Container } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import Footer from 'components/Footer/Footer';
import WritePageRouter from './MyPageRouter';
import GridContainer from "components/Grid/GridContainer.js";
import MyFundingCard from "components/CrowdeeComponents/MyFundingCard";
import FundingCard from 'components/CrowdeeComponents/FundingCard';
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
    const [nickName,setNickName] = useState(localStorage.getItem("nickName"))
  
  

  const wish = () =>{
        fetch("http://localhost:8081/member/myPage/wishList", {
            headers : {
            "Authorization" : `Bearer ${token}`}
            }).then((res)=>{
                if(res.status==200){
                    return res.json()
                    
                }
                throw new Error("http 통신 에러")
            }).then((res)=>{
                setFunding(res)
            }).catch(e=>{
                e.message;
                setResult(
                    <div>
                    <h5 style={{fontWeight:'bold', color:'gray'}}>
                        찜한 프로젝트가 없습니다.
                    </h5>
                </div>
                )
            })
        }
    

  const participant =  () =>{
        setFunding([])
       fetch("http://localhost:8081/member/myPage/fundingList", {
            headers : {
            "Authorization" : `Bearer ${token}`}
            }).then((res)=>{
                if(res.status==200){
                    return res.json()
                }
                throw new Error("http 통신 에러")
                
            }).then((res)=>{
                setFunding(res)
            }).catch(e=>{
                e.message;
                setResult(
                    <div>
                        <h5 style={{fontWeight:'bold', color:'gray'}}>
                            참여한 프로젝트가 없습니다.
                        </h5>
                    </div>
                )
            })
    }
  
  const waiting =  () =>{
      setFunding([])
    fetch("http://localhost:8081/member/myPage/waitingForPayment", {
        headers : {
        "Authorization" : `Bearer ${token}`}
        }).
        then((res)=>{
            if(res.status==200){
                return res.json()
                
            }
            throw new Error("http 통신 에러")
        }).
        then((res)=>{
            setFunding(res)
        }).
        catch(e=>{
            e.message;
            setFunding("")
            setResult(
                <div>
                    <h5 style={{fontWeight:'bold', color:'gray'}}>
                        진행중인 프로젝트가 없습니다.
                    </h5>
                </div>
            )
        })
    
    }
  

    const changeIntro = () =>{
        // setPath('/my/intro')
        props.history.push('/my/intro')
    }
    const changeBacked =  () =>{
        setResult()
       participant()
        
        // props.history.push('/my/backed')
        
        
    }
    const changeCreated =  () =>{
        setResult()

        waiting()

        // props.history.push('/my/created')
        
       
    }
    const changeWish = async () =>{
        setResult()

        wish()

        // props.history.push('/my/wish')
    }

    useEffect(() => {
        window.scrollTo(0,0);
       
    }, [])
   useEffect(() => {
        
        console.log(funding)
       if(funding.length>0){
            setResult(
                <div className={classes.section}>
                    <GridContainer justify="center">
                        {funding.map((funding)=>(
                        <FundingCard 
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
       }
       
      
   }, [funding])


    return (
        <div style={{backgroundColor:'white', width:'100%', height:'100%'}}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', borderBottom:'2px solid #F0F1EC', height:'10%', width:'100%', backgroundColor:'white', position:'fixed', zIndex:'1'}}>
                <div style={{marginLeft:'-58%', position:'fixed'}}>
                    <Button onClick={()=>buttonClick("/")}>
                        <CloseIcon/>
                    </Button>
                </div>
                <div style={{position:'fixed'}}>
                    <Button onClick={()=>buttonClick("/")}>
                        <img src={require('components/Header/CrowdeeLogoFinal2.png').default}/>
                    </Button>
                </div>
                <div style={{marginRight:'-58%', display:'flex', alignItems:'center'}}>
                <Button onClick={()=>buttonClick("/search")}>
                    <SearchIcon/>
                    </Button>
                    <Button onClick={()=>buttonClick("/my")}>
                    <Avatar style={{width:'20px', height:'20px', fontSize:'12px', fontWeight:'bold', marginRight:'5px'}}></Avatar>
                    <h5 style={{fontWeight:'bold', fontSize:'15px'}}>{nickName}</h5>
                    </Button>
                </div>
            </div>
            <Container>
                <div style={{backgroundColor:'white', width:'100%', minHeight:'1000px', maxHeight:'100%'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', paddingTop:'130px'}}>
                        <Avatar alt="Remy Sharp" style={{width:"150px",height:"150px"}} />
                        <h2 style={{fontWeight:'bold', fontSize:'35px'}}>{nickName}</h2>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-evenly', marginTop:'45px', borderBottom:'1.8px solid #F0F1EC'}}>
                        <Button style={{fontSize:'25px', color:'gray'}} onClick={changeIntro}>소개</Button>
                        <Button style={{fontSize:'25px', color:'gray'}} onClick={changeBacked}>후원한 프로젝트</Button>
                        <Button style={{fontSize:'25px', color:'gray'}} onClick={changeCreated}>진행중인 프로젝트</Button>
                        <Button style={{fontSize:'25px', color:'gray'}} onClick={changeWish}>찜한 프로젝트</Button>
                    </div>
                    <div style={{padding:'40px'}}>
                    {result}
                    </div>
                </div>
            </Container>
            <Footer />
        </div>    
    );
};