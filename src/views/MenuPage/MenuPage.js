import React,{useEffect,useState} from 'react';
import Header from 'components/Header/Header';
import { useHistory } from 'react-router';
import { Button, Container } from '@material-ui/core';
import Footer from 'components/Footer/Footer';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import CategoryPage from 'views/CategoryPage/CategoryPage';
export default function MenuPage() {
    const [checkMember,setCheckMember] = useState();
    const history = useHistory();
    const nickName = localStorage.getItem("token");
    console.log(nickName)

    const buttonClick = (url) =>{
    
        history.push(url);
    };

    const logout = () =>{
        if(window.confirm("로그아웃하시겠습니까?")){
            console.log("로그아웃들어오나")
            localStorage.removeItem("token")
            localStorage.removeItem("nickName")
            localStorage.removeItem("userNickName")
            history.push("/")
        }
    }

    useEffect(() => {
        setCheckMember(check)
        
    }, [])
    const check = () =>{
        if(localStorage.getItem("token")){
            return(
                <div style={{marginTop:'60px'}}>
                    <div>
                        <Button style={{marginBottom:'-30px'}}
                            onClick={()=>buttonClick('/my/intro')}>
                            <h3 style={{fontWeight:'bold'}}>마이 페이지</h3>
                        </Button>
                    </div>
                    <div>
                    <Button style={{marginBottom:'-30px'}}
                        onClick={logout}>
                        <h3 style={{fontWeight:'bold'}}>로그아웃하기</h3>
                    </Button>
                    </div>
                </div>
            )
                
        }
        else{
            return(
                <div style={{marginTop:'60px'}}>
                    <div>
                        <Button style={{marginBottom:'-30px'}}
                            onClick={()=>buttonClick("/signUp")}>
                            <h3 style={{fontWeight:'bold'}}>회원가입하기</h3>
                        </Button>
                    </div>
                    <div>
                    <Button style={{marginBottom:'-30px'}}
                        onClick={()=>buttonClick("/login-page")}>
                        <h3 style={{fontWeight:'bold'}}>로그인하기</h3>
                    </Button>
                    </div>
                </div>
            )
           
        }
    }
   

    return (
        <div style={{backgroundColor:'white'}}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', borderBottom:'2px solid #F0F1EC', height:'10%', width:'100%', backgroundColor:'white', position:'fixed', zIndex:'1'}}>
                <div style={{marginLeft:'-90%'}}>
                    <Button onClick={()=>buttonClick("/")}>
                        <CloseIcon/>
                    </Button>
                </div>
                <div style={{position:'fixed'}}>
                    <h4 style={{fontWeight:'bold'}}>프로젝트 메뉴</h4>
                </div>
            </div>
            <Container>
                <div style={{height:'920px', width:'100%', paddingTop:'100px'}}>
                    <div style={{paddingLeft:'55px', marginTop:'50px'}}>
                        <div style={{display:'flex', justifyContent:'space-between', marginRight:'100px'}}>
                            <div>
                                <div>
                                    <Button style={{marginBottom:'-30px'}}
                                        onClick={()=>buttonClick("/category/startDate")}>
                                        <h3 style={{fontWeight:'bold'}}>신규 등록 펀딩</h3>
                                    </Button>
                                </div>
                                <div>
                                    <Button style={{marginBottom:'-30px'}}
                                        onClick={()=>buttonClick("/category/visitCount")}>
                                        <h3 style={{fontWeight:'bold'}}>방문자가 많은 펀딩</h3>
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Button style={{marginBottom:'-30px'}}
                                        onClick={()=>buttonClick("/category/outOfStock")}>
                                        <h3 style={{fontWeight:'bold'}}>마감임박 펀딩</h3>
                                    </Button>
                                </div>
                                <div>
                                    <Button style={{marginBottom:'-30px'}} 
                                        onClick={()=>buttonClick("/category/vargeOfSuccess")}>
                                        <h3 style={{fontWeight:'bold'}}>성공임박 펀딩</h3>
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Button style={{marginBottom:'-30px'}} 
                                        onClick={()=>buttonClick("/category/excess")}>
                                        <h3 style={{fontWeight:'bold'}}>초과달성 펀딩</h3>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop:'100px'}}>
                            <h5 style={{marginLeft:'10px', fontWeight:'bold', color:'#B2B2B2'}}>카테고리</h5>
                            <div style={{display:'flex', justifyContent:'space-evenly', marginLeft:'-50px'}}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                    <Button onClick={()=>buttonClick("/category/dance")}><Avatar alt="Remy Sharp" src={require('./dancing.png').default} style={{width:"150px",height:"150px"}} /></Button>
                                    <h4 style={{fontWeight:'bold'}}>무용</h4>
                                </div>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                    <Button onClick={()=>buttonClick("/category/theater")}><Avatar alt="Remy Sharp" src={require('./theatre.png').default} style={{width:"150px",height:"150px"}} /></Button>
                                    <h4 style={{fontWeight:'bold'}}>연극</h4>
                                </div>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                    <Button onClick={()=>buttonClick("/category/musical")}><Avatar alt="Remy Sharp" src={require('./musical.png').default} style={{width:"150px",height:"150px"}} /></Button>
                                    <h4 style={{fontWeight:'bold'}}>뮤지컬</h4>
                                </div>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                    <Button onClick={()=>buttonClick("/category/concert")}><Avatar alt="Remy Sharp" src={require('./concert.png').default} style={{width:"150px",height:"150px"}} /></Button>
                                    <h4 style={{fontWeight:'bold'}}>연주</h4>
                                </div>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                    <Button onClick={()=>buttonClick("/category/etc")}><Avatar alt="Remy Sharp" src={require('./etc.png').default} style={{width:"150px",height:"150px"}} /></Button>
                                    <h4 style={{fontWeight:'bold'}}>기타</h4>
                                </div>
                            </div>
                        </div>
                        {checkMember}
                    </div>
                
                </div>
            </Container>    
            <Footer />
        </div>
    );
};