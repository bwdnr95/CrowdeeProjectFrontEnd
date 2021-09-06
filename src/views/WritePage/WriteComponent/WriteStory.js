import { Container } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router';
import Write from 'views/Components/Editor/Write';

export default function WriteStory(props) {

   
    const {manageUrl} = useParams();
    
    const [token,setToken] = useState(localStorage.getItem("token"))
    const [totalForm,setTotalForm] = useState("");

   
    
  
    const contentValueHandler =(data) =>{
        
        
        setTotalForm({
             ...totalForm,
             "content" : data})
        props.save(totalForm)
        console.log(totalForm)
    }
    
    const budgetValueHandler = (data) =>{
       
        
        setTotalForm({
            ...totalForm,
            "budget" : data
        })
       props.save(totalForm)
       console.log(totalForm)
    }
    const scheduleValueHandler = (data) =>{
      
       
        setTotalForm(
            {
                ...totalForm,
                "schedule" : data
            })
       props.save(totalForm)
       console.log(totalForm)
    }
    const aboutUsValueHandler = (data) =>{
        setTotalForm({
                ...totalForm,
                "aboutUs" : data
            })
        props.save(totalForm)
    }
    useEffect(() => {
       
    },[])

    return (
        <div style={{paddingTop:'30px', paddingBottom:'30px', backgroundColor:'#FCFCFC',}}>
                <Container maxWidth="sm">
                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px', }}>
                        <h3 style={{fontWeight:'bold'}}>프로젝트 내용</h3>
                        <h5>무엇을 만들기 위한 프로젝트인지 분명하게 작성해주세요.</h5>
                        <Write onSave={contentValueHandler} manageUrl={manageUrl} data="content"></Write>
                    </div>
                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px'}}>
                        <h3 style={{fontWeight:'bold'}}>프로젝트 예산</h3>
                        <h5>프로젝트 예산을 작성해주세요.</h5>
                        <Write api="budget" onSave={budgetValueHandler} manageUrl={manageUrl} data="budget" ></Write>
                    </div>
                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px'}}>
                        <h3 style={{fontWeight:'bold'}}>프로젝트 일정</h3>
                        <h5>프로젝트 일정을 작성해주세요.</h5>
                        <Write api="schedule" onSave={scheduleValueHandler} manageUrl={manageUrl} data="schedule" ></Write>
                    </div>
                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px'}}>
                        <h3 style={{fontWeight:'bold'}}>프로젝트 팀소개</h3>
                        <h5>프로젝트 팀 소개내용을 작성해주세요.</h5>
                        <Write api="aboutUs"  onSave={aboutUsValueHandler} manageUrl={manageUrl} data="aboutUs" ></Write>
                    </div>
                </Container>    
            </div> 
    );
};