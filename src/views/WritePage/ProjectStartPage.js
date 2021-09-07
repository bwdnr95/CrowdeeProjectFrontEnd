import React, {useState,useEffect} from 'react';
import Header from "components/Header/Header.js";
import HeaderLinks from 'components/Header/HeaderLinks';
import styles from "assets/jss/material-kit-react/views/components.js";
import { makeStyles } from "@material-ui/core/styles";
import Footer from 'components/Footer/Footer';
import Card from 'components/Card/Card';
import FeedbackIcon from '@material-ui/icons/Feedback';
import { Button } from '@material-ui/core';

import CustomInput from "components/CustomInput/CustomInput.js";

const useStyles = makeStyles(styles);

export default function ProjectStartPage(props) {
    
    const classes = useStyles();
    const { ...rest } = props;
    const [token,setToken] = useState(localStorage.getItem("token"))
   
    const [projectUrl,setProjectUrl] = useState({projectUrl:""})
    const [urlCheck,setUrlCheck] = useState(false)
    const [urlText,setUrlText] = useState("www.Crowdee.com/고객님의 URL")
    const [confirm , setConfirm] = useState(false)
    const [start , setStart] = useState('none')
    const fund = []
    const [projectData, setProjectData] = useState([])
    const [result, setResult] = useState()

    const urlChange = (e) => {
        setProjectUrl(
            e.target.value
        );
        setStart('none')
        setConfirm(false)
        setUrlText("www.Crowdee.com/고객님의 URL")
    }

    const doubleCheck = () => {
        console.log('중복확인')
        fetch(`http://localhost:8081/creator/checkUrl/${projectUrl}`).
        then((res)=>{
            if(res.status==400||res.status==500){
                setUrlText("URL이 중복됩니다.")
                setUrlCheck(true)
            }
            else {
                setUrlText('사용가능한 URL입니다.')
                setUrlCheck(false)
                setStart('flex')
                setConfirm(true)
            }
        })
    }

    const check = () =>{
        fetch("http://localhost:8081/creator/create/editingList", {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        }).
        then((res) => {
            if(res.status==400||res.status==500){
                throw new Error('http 에러')
            }
            return res.json()})
            .then((res) => {
             
                setProjectData(res)
                console.log(projectData)
               
            })
            .then(()=>{                
           
            })
    }

    useEffect(() => {
      
        fetch(`http://localhost:8081/creator/project-start`,{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        }).
        then((res)=>{
            if(res.status==403){
                props.history.push("/login-page")
            }
            else if(res.status==401){
               alert("크리에이터 등록페이지로 넘어갑니다.")
               props.history.push("/creator-signUp")
            }
            
        });

        fetch("http://localhost:8081/creator/create/editingList", {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        }).
        then((res) => {
            if(res.status==400||res.status==500){
                throw new Error('http 에러')
            }
            
                return res.json()
            })
            .then((res)=>{
                console.log(res)
                setProjectData(res);
                console.log("data",projectData)

                
             })
            .catch((e) => {
                console.log(e.message)
            })


    }, [])

  
    const submitStart = () => {
        console.log("token값" + {token})
        fetch(`http://localhost:8081/creator/create/funding/${projectUrl}`, {
            headers:{
                "Authorization" : `Bearer ${token}`
            },
            method :
                'post'
        }).
        then((res)=>{
            if(!res.status==200){
                console.log("에러 진입")
                throw new Error("에러임")
            }
          return res.json()
            
        }).
        then((res)=>{
            if(confirm){
                console.log(res.manageUrl)
                return res.manageUrl
            }
        }).then((res)=>{
              
           
            props.history.push(`/write-page/${res}`)
        }).
        catch((e) =>{
            alert("펀딩 생성 중 에러 발생 "+ e.message);
        });
    }
    const temporarySave = (url) =>{
       
        props.history.push(url)
    }
    return (
        <div style={{backgroundColor:'white', minHeight:'100vh', maxHeight:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Header
                brand="Crowdee"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                height: 347,
                color: "white",
                }}
                {...rest}
            />

            <div style={{marginTop:'5%', marginLeft:'', width:'100%', minHeight:'100%', display:'flex', justifyContent:'center', alignItems:'center', border:'0px solid black'}}>
                <div style={{width:'400px', display:'flex', border:'0px solid black'}}>
                    <img style={{width:'100%'}} src={require('./crowdee-logo.png').default} />
                </div>

                <div style={{border:'0px solid black', marginLeft:'100px', marginTop:'100px'}}>
                    {projectData.map((funding) => {
                        return <div style={{width:'100%'}}>
                            <h6 style={{fontWeight:'bold', color:'red'}}><FeedbackIcon fontSize="small"/> 작성 중인 프로젝트가 있습니다.</h6>
                            <Card style={{height:'80px', width:'500px', display:'flex', justifyContent:'center', marginTop:'10px'}}>
                                <Button
                                onClick={()=>{temporarySave(`/write-page/${funding.manageUrl}?creatorId=${funding.creatorId}`)}}
                                style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                                    
                                    <h5 style={{fontWeight:'bold'}}>{funding.title}</h5>
                                    <h5>{funding.postDate}</h5>
                                </Button>
                            </Card>
                        </div>
                    })}
                    <div style={{marginTop:'80px'}}>
                        <div>
                            <h3 style={{fontWeight:'bold'}}>프로젝트 페이지 주소</h3>
                            <h6>프로젝트 페이지로 접속하기 위한 웹페이지 주소(URL)를 설정 해주세요.</h6>
                        </div>
                        <div>
                        <CustomInput
                      labelText={urlText}
                      error ={urlCheck}
                      id="url"
                      underlineClasses={classes.underlineSuccess}
                      formControlProps={{
                        fullWidth: false,
                        style :{hidden:"true",width:"300px"}
                      }}
                      inputProps={{
                        type: "string",
                        
                        onChange: urlChange,
                       
                        autoComplete: "off",
                      }}
                    />
                            {/* <input type="text" name="projectUrl" onChange={urlChange} style={{border:'1px solid #EDEBEB', borderRadius:'3px', width:'200px', height:'40px'}} placeholder={'URL을 입력해주세요'}></input> */}
                            <Button variant="contained" style={{marginLeft:'10px', marginTop:"20px"}} onClick={doubleCheck}>중복확인</Button>
                        </div>
                        <div style={{display:'flex', justifyContent:'', paddingTop:'50px'}}>
                            <Button style={{fontWeight:'bold',display:`${start}`}} variant="contained" color="secondary" onClick={submitStart}>시작하기</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor:'white'}}>
                <Footer />
            </div>
        </div>
    );
};
