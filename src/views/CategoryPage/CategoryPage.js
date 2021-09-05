import React, {useState, useEffect} from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router';
import { Button, Container } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import GridContainer from 'components/Grid/GridContainer';
import MyFundingCard from 'components/CrowdeeComponents/MyFundingCard';
import Footer from 'components/Footer/Footer';

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function CategoryPage(props) {
    
    const classes = useStyles();

    const category = props.match.params;
    console.log('category:'+category)
    console.log(category)



    const [menu, setMenu] = useState();
    const [result, setResult] = useState();
    const history = useHistory();
    const [title, setTitle] = useState();
    
    const [funding, setFunding] = useState([]);

    const buttonClick = (url) =>{
    
        history.push(url);
    };

    const buttonClickBack = () => {
        window.history.back();
    }

    useEffect(() => {
        setMenu(category)

        console.log(props.match.params.menu)

        fetch("http://localhost:8081/contents/menuList", {
            method:'POST',
            headers : {
                "content-type" : "application/json"
              },
            // body : props.match.params.menu
            body:props.match.params.menu
        }).
        then((res) =>{
            if(res.status==200){
                return res.json()
            }
           else{
               throw Error("에러")
           }
        }).
        then(res=>{
            setFunding(res);
            
            switch(props.match.params.menu){
                case 'startDate':
                    setTitle('신규 등록 펀딩');
                    break;
                case 'visitCount':
                    setTitle('방문자가 많은 펀딩');
                    break;
                case 'outOfStock':
                    setTitle('마감임박 펀딩');
                    break;
                case 'vergeOfSuccess':
                    setTitle('성공임박 펀딩');
                    break;

                case 'excess':
                    setTitle('초과달성 펀딩');
                    break;
                case 'dance':
                    setTitle('무용');
                    break;
                case 'theater':
                    setTitle('연극');
                    break;
                case 'musical':
                    setTitle('뮤지컬');
                    break;
                case 'concert':
                    setTitle('공연');
                    break;
                case 'etc':
                    setTitle('기타');
                    break;    
            }
        })
        .catch((e) =>{
            console.log("여기 들어오냐",e)
            setResult(
                <div>
                    <h5 style={{fontWeight:'bold', color:'gray'}}>
                        프로젝트가 없습니다.
                    </h5>
                </div>
            )
        });
    },[])

    useEffect(() => {
        if(funding.length>0){ 
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
        }
    }, [funding])

    return (
        <div style={{backgroundColor:'white'}}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', borderBottom:'2px solid #F0F1EC', height:'10%', width:'100%', backgroundColor:'white', position:'fixed', zIndex:'1'}}>
                <div style={{marginLeft:'-90%', position:'fixed'}}>
                    <Button onClick={()=>buttonClickBack()}>
                        <CloseIcon/>
                    </Button>
                </div>
                <div style={{position:'fixed'}}>
                    <Button onClick={()=>buttonClick("/")}>
                    <img src={require('components/Header/CrowdeeLogoFinal2.png').default}/>
                    </Button>
                </div>
                <div style={{marginRight:'-70%', position:'fixed'}}>
                    <Button onClick={()=>buttonClick("/search")}>
                    <SearchIcon/>
                    </Button>
                </div>
                <div style={{marginRight:'-85%', display:'flex', alignItems:'center'}}>
                    <Button onClick={()=>buttonClick("/my")}>
                    <Avatar style={{width:'20px', height:'20px', fontSize:'12px', fontWeight:'bold', marginRight:'5px'}}></Avatar>
                    
                    </Button>
                </div>
            </div>
            <Container style={{backgroundColor:'white', minHeight:'100vh', maxHeight:'100%', paddingTop:'100px', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <div>
                    <h2>{title}</h2>
                </div>
                {result}
            </Container>    
            <Footer />
        </div>
    );
};