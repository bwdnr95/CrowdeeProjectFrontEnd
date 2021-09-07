import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Footer from "components/Footer/Footer.js";

import { useHistory } from 'react-router';
import { Button, Container } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Modal from '@material-ui/core/Modal';
import JoinFundingModal from "./JoinFundingModal";
const useStyles = makeStyles(()=>({
  
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height : '850px',
    
  },
 
}));

export default function ViewPage(props) {
  const fullHeart =
  <FavoriteIcon
   color="secondary"
  />
  const outlineHeart = 
  <FavoriteBorderOutlinedIcon
  color="secondary"
/>
const [open, setOpen] = useState(false);
const handleOpen = () => {
  if(localStorage.getItem("token")){
    setOpen(true);
  }
  else{
    alert("로그인 후에 펀딩 참여가 가능합니다.")
    props.history.push("/login-page")
  }
};

const handleClose = () => {
  setOpen(false);
};
  const projectUrl = props.match.params.projectUrl;
  const memberId = props.match.params.memberId;
  const [token,setToken] = useState(localStorage.getItem("token"))
  const [wishcontroller,setWishController] = useState();
  const [nickName,setNickName] = useState(localStorage.getItem("nickName"))
  const [myPageBtn, setMyPageBtn] = useState()
  const history = useHistory();

  const buttonClick = (url) =>{
  
      history.push(url);
  };

  const [isWishAdd, setIsWishAdd] = useState(false)
  
  const wishAddHandler = () => {
    setIsWishAdd(!isWishAdd)
  }

  const wishCountHandler = () => {
    
    wishAddHandler()
    if(localStorage.getItem("token")){
      fetch("http://localhost:8081/contents/wishOrUnWish", {
        method:'POST',
        headers : {
          "Authorization" : `Bearer ${token}`,
          "content-type" : "application/json"
        },
        body: view.fundingId,
      }).
      then((res)=>{
        return res.json();
        
      }).then((res)=>{
        console.log(res.wish)
        if(res.wish){
          setWishController(fullHeart)
        }else{
          setWishController(outlineHeart)
        }
      })
    }else{
      alert("찜하기를 위해서는 로그인이 필요합니다.");
    }
  }

  const[view, setView] = useState({

    fundingId:0,
    projectUrl:"",
    manageUrl:"",
    title:"",
    subTitle:"",
    summary:"",
    thumbNailUrl:"",
    category:"",
    tag:"",
    content:"",
    budget:"",
    schedule:"",
    aboutUs:"",
    goalFundraising:0,
    minFundraising:0,
    startDate:"",
    endDate:"",
    maxBacker:0,
    totalBacker:0,
    visitCount:0,
    totalFundraising:0,
    status:"",
    aboutMe:"",
    profileImgUrl:"",
    career:"",
    creatorNickName:"",
    restDate:0,
    fundingList:[{
      projectUrl:"",
      thumbNailUrl:""
    }],
    memberList:"",
    wish:false
  }
  );
      
  useEffect(() => {
      window.scrollTo(0,0);
      fetch(`http://localhost:8081/contents/${projectUrl}`, {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
      }).
      then(
        res=>res.json()
      ).
      then(res=>{
        console.log(res)
        setView(res)
        
        if(res.wish){
          setWishController(fullHeart)
         }
        else{
         setWishController(outlineHeart)
          
        }
       
      })
  
  },[])

  useEffect(() => {
    console.log({nickName})
    if(nickName!=null){
      setMyPageBtn(
        <Button onClick={()=>buttonClick('/my')}>
          <Avatar alt="Remy Sharp" style={{width:'20px', height:'20px', fontSize:'12px', fontWeight:'bold', marginRight:'5px'}}/>
          <h5 style={{fontWeight:'bold'}}>{nickName}</h5>
        </Button>
      )
    }
  },[])

  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  
  
  const modifyUrl = (url) =>{
    let endpoint = url;
    endpoint = endpoint.replace('oembed', 'iframe');
    endpoint = endpoint.replace('url', 'src');
    endpoint = endpoint.replace('watch?v=', 'embed/');
    endpoint = endpoint.replace('oembed', 'iframe');
    return endpoint;
  }

  const contentField = () =>
  {
    var htmlCode =
    
    modifyUrl(view.content)
    return(
      <div dangerouslySetInnerHTML={{__html:htmlCode}} style={{width:'100%', paddingLeft:'30px',overflow:'hidden'}}>
           
      </div>
    )
  }
  const budgetField = () =>
  {
    var htmlCode =
    
    modifyUrl(view.budget)

  
    return(
      <div dangerouslySetInnerHTML={{__html:htmlCode}} style={{width:'100%', paddingLeft:'30px',overflow:'hidden'}}>
           
      </div>
    )
  }
  const scheduleField = () =>
  {
    var htmlCode =
    
    modifyUrl(view.schedule)
    return(
      <div dangerouslySetInnerHTML={{__html:htmlCode}} style={{width:'100%', paddingLeft:'30px',overflow:'hidden'}}>
           
      </div>
    )
  }
  const aboutUsField = () =>
  {
    var htmlCode =
    
    modifyUrl(view.aboutUs)
    return(
      <div dangerouslySetInnerHTML={{__html:htmlCode}} style={{width:'100%', paddingLeft:'30px',overflow:'hidden'}}>
           
      </div>
    )
  }

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

  
  return (
    <div style={{backgroundColor:'white'}}>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', borderBottom:'2px solid #F0F1EC', height:'10%', width:'100%', backgroundColor:'white', position:'fixed', zIndex:'1'}}>
        <Container style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{marginLeft:'', position:''}}>
              <Button onClick={()=>buttonClick("/")}>
                  <CloseIcon/>
              </Button>
          </div>
          <div style={{marginLeft:'10%'}}>
              <Button onClick={()=>buttonClick("/")}>
               <img src={require('components/Header/CrowdeeLogoFinal2.png').default}/>
              </Button>
          </div>
          <div style={{marginRight:'', display:'flex', alignItems:'center'}}>
            <Button onClick={()=>buttonClick("/search")}>
              <SearchIcon/>
            </Button>
            {myPageBtn}
          </div>
        </Container>
      </div>
      <Container>


        <div style={{display:'flex', alignItems:'center', flexDirection:'column', height:'100%', width:'100%', paddingTop:'130px', border:'0px solid black'}}>

 
          <div style={{display:'flex', alignItems:'center', flexDirection:'column', height:'25%', width:'92%'}}>
            <Button onClick={()=>buttonClick(`/category/${view.category}`)} style={{marginBottom:'-20px'}}>
              <div style={{fontWeight:'bold', color:'gray'}}>{view.category}</div>
              
            </Button>
            <div style={{marginBottom:'-15px'}}>
              <h2 style={{fontWeight:'bold'}}>{view.title}</h2>
              
            </div>
            <div style={{display:'flex', alignItems:'center'}}>
              <Avatar alt="Remy Sharp" src={view.profileImgUrl} style={{width:'20px', height:'20px', fontSize:'12px', fontWeight:'bold', marginRight:'7px'}}/>
              {/* <Button onClick={()=>buttonClick(`/my/:memberId`)}> */}
                <h5 style={{fontWeight:'bold'}}>{view.creatorNickName}</h5>  
              {/* </Button> */}
            </div> 
          </div>

          <div style={{display:'flex', justifyContent:'center', height:'600px', width:'100%', marginTop:'40px', marginBottom:'20px', border:'0px solid blue'}}>
            <div style={{border:'0px solid black', height:'100%', width:'50%'}}>
              <img style={{width:'100%', height:'100%'}} src={view.thumbNailUrl} />
            </div>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', paddingLeft:'30px', border:'0px solid black', width:'40%', height:'100%', border:'0px solid black'}}>
              <div style={{marginBottom:'-25px', marginTop:'-25px'}}>
                <h3 style={{fontWeight:'bold', color:'gray'}}>펀딩상황</h3>
              </div>

              <div style={{display:'flex', alignItems:'center'}}>
                <h>
                  <h style={{display:'flex'}}>
                    <h2 style={{fontWeight:'bold'}}>{view.totalBacker}</h2>
                    <h5 style={{fontWeight:'bold', marginLeft:'5px', paddingTop:'27px'}}>명이&nbsp;</h5>
                  </h>
                  <h style={{display:'flex', marginTop:'-40px'}}>
                    <h2 style={{fontWeight:'bold'}}>{comma(view.totalFundraising)}</h2>
                    
                    {/* <h2 style={{fontWeight:'bold'}}>원</h2> */}
                    <h5 style={{fontWeight:'bold', marginLeft:'5px', paddingTop:'27px'}}>원을 후원중 입니다.</h5>
                  </h>
                </h>

              </div>

          
              <h3 style={{fontWeight:'bold', marginBottom:'-20px', color:'gray'}}>남은시간</h3>
              <div style={{display:'flex', alignItems:'center'}}>
                <h2 style={{fontWeight:'bold'}}>{view.restDate}</h2>
                
                <h5 style={{fontWeight:'bold', marginLeft:'5px', paddingTop:'17px'}}>일</h5>
              </div>


              <h3 style={{fontWeight:'bold', marginBottom:'-20px', color:'gray'}}>남은 티켓</h3>
              <div style={{display:'flex', alignItems:'center'}}>
                <h2 style={{fontWeight:'bold'}}>{view.maxBacker-view.totalBacker}</h2>
                
                <h5 style={{fontWeight:'bold', marginLeft:'5px', paddingTop:'17px'}}>장</h5>
              </div>

              <div style={{display:'flex', flexDirection:'column', border:'1px solid #F0F1EC', backgroundColor:'#FAFAFA', paddingLeft:'15px', width:'90%', marginTop:'20px'}}>
                <h5 style={{}}>펀딩 진행중</h5>
                <p style={{color:'gray'}}>목표 금액인 {comma(view.goalFundraising)}원이 모이거나 남은 티켓이 모두 <br/> 소진되었을 때 결제가 진행되어 안내 메일이 발송됩니다.<br/> 결제는 펀딩이 성공했을 때 다함께 진행됩니다.</p>
              </div>

              <div style={{display:'flex', justifyContent:'center', width:'90%', paddingTop:'10px', marginTop:'10px'}}>

                <Button 
                size="small"
                variant="outlined"
                style={{height:'50px', width:'50px', marginRight:'10px'}}
                onClick={wishCountHandler}
                >{wishcontroller}
                </Button>
                <Button
                variant="contained"
                color="secondary"
                style={{height:'50px', width:'100vw'}}
                onClick={handleOpen}
                >
                <h4 style={{fontWeight:'bold'}}>펀딩하기</h4>
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  className={classes.modal}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description">
                      
                  <JoinFundingModal
                    onClose={handleClose}
                    fundingId={view.fundingId}
                    title={view.title}
                    creatorNickName={view.creatorNickName}
                    maxBacker={comma(view.maxBacker)}
                    totalBacker={comma(view.totalBacker)}
                    totalFundraising={comma(view.totalFundraising)}
                    goalFundraising={comma(view.goalFundraising)}
                    minFundraising={comma(view.minFundraising)}
                    projectUrl={view.projectUrl}
                  ></JoinFundingModal>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', borderTop:'1.9px solid #E9E9E5',  borderBottom:'2px solid #F0F1EC', height:'10%', width:'100%', backgroundColor:'white'}}>
          <div>
            <h4 style={{fontWeight:'bold'}}>프로젝트 계획</h4>
          </div>
        </div>
        <div style={{display:'flex', justifyContent:'center', height:'100%', width:'100%', paddingTop:'30px'}}>
          <div style={{width:'65%', paddingLeft:'30px', display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
          {contentField()}
          <div style={{justifyContent:"left", width:"100%"}}>
            <h4>프로젝트 예산</h4>
          </div>
          
          {budgetField()}
          <div style={{justifyContent:"left", width:"100%"}}>
            <h4>프로젝트 일정</h4>
          </div>
         
          {scheduleField()}
          <div style={{justifyContent:"left", width:"100%"}}>
            <h4>팀소개</h4>
          </div>
          
          {aboutUsField()}
      
          </div>
        
          <div style={{width:'30%', paddingLeft:'10px', paddingRight:'30px'}}>
            <div style={{border:'1px solid #E9E9E5', borderBottom:'2px solid #F0F1EC', borderRadius:'5px', padding:'20px', position:'sticky', top:'80px'}}>
              <h5 style={{fontWeight:'bold'}}>크리에이터 소개</h5>
              <div style={{display:'flex', alignItems:'center'}}>
                {/* <Button onClick={()=>buttonClick(`/my/intro/:memberId`)}> */}
                  <Avatar src={view.profileImgUrl} style={{width:'40px', height:'40px', fontSize:'12px', fontWeight:'bold', marginRight:'10px'}} />
                  <h5 style={{fontWeight:'bold'}}>{view.creatorNickName}</h5>

                {/* </Button> */}
              </div>
              <div style={{marginTop:'15px'}}>
                <p style={{fontWeight:'normal', color:'gray'}}>{view.aboutMe}</p>
                
              </div>
              <div style={{display:'flex', alignItems:'center'}}>
                {view.fundingList.map((url)=>(
                  <Button onClick={()=>buttonClick(`/view/${url.projectUrl}`)}>
                    <Avatar alt="Remy Sharp" src={url.thumbNailUrl} style={{width:"70px",height:"70px"}} />
                  </Button>
                ))}
                
                <Button onClick={()=>buttonClick(`/my/created/:memberId`)}>
                
                  <ArrowForwardIosIcon/>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}