import React , {useEffect,useState,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { Button } from '@material-ui/core'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Box } from '@material-ui/core';
import WritePageNav from 'views/WritePage/WritePageNav.js'


import queryString from 'query-string';
import { useParams } from 'react-router';
import Progress from 'components/CrowdeeComponents/Progress';
import DoneIcon from '@material-ui/icons/Done';
import Avatar from '@material-ui/core/Avatar';
export default function CreatorRegistrationPage(props) {
    

    const [token,setToken] = useState(localStorage.getItem("token"))
    console.log(token)
    const [manageUrl,setManageUrl] = useState(props.match.params.manageUrl)
    const [form,setForm] = useState({});
  
    
    
    const [formData,setFormData] = useState();
    const [open, setOpen] =useState(false);
    
    const useStyles = makeStyles((theme)=>({
       
        imgContent : {
            flex: '1 1 0%'
        },
        imgContentBox :{
           //border : '1px solid black',
            display: 'flex',
            width: 500,
            flexWrap: 'wrap',
            overflowX: 'hidden'
        },
        inputBox : {
            
            width: 180,
            height: 180,
            position: 'relative',
            border: '1px solid rgb(230, 229, 239)',
            background: 'rgb(250, 250, 253)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'rgb(155, 153, 169)',
            fontSize: '1rem',
            marginLeft : 50,
            marginRight: 50,
            marginBottom: 0,
        },
        imageUploadBox: {
            color: 'rgb(155, 153, 169)',
            content: "",
            backgroundPosition: 'center center',
            backgroundRepeat: 'noRepeat',
            backgroundSize: 'cover',
            width: 100,
            height: 100,
            backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICAgIDxwYXRoIGZpbGw9IiNEQ0RCRTQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTI4LjQ3MSAzMkgzLjUzYy0uOTcxIDAtMS44OTQtLjQyMi0yLjUyOS0xLjE1N2wtLjAyNi0uMDNBNCA0IDAgMCAxIDAgMjguMTk4VjguNjA3QTQgNCAwIDAgMSAuOTc0IDUuOTlMMSA1Ljk2YTMuMzQzIDMuMzQzIDAgMCAxIDIuNTI5LTEuMTU2aDIuNTM0YTIgMiAwIDAgMCAxLjUzNy0uNzJMMTAuNC43MkEyIDIgMCAwIDEgMTEuOTM3IDBoOC4xMjZBMiAyIDAgMCAxIDIxLjYuNzJsMi44IDMuMzYzYTIgMiAwIDAgMCAxLjUzNy43MmgyLjUzNGMuOTcxIDAgMS44OTQuNDIzIDIuNTI5IDEuMTU3bC4wMjYuMDNBNCA0IDAgMCAxIDMyIDguNjA2djE5LjU5MWE0IDQgMCAwIDEtLjk3NCAyLjYxN2wtLjAyNi4wM0EzLjM0MyAzLjM0MyAwIDAgMSAyOC40NzEgMzJ6TTE2IDkuNmE4IDggMCAxIDEgMCAxNiA4IDggMCAwIDEgMC0xNnptMCAxMi44YzIuNjQ3IDAgNC44LTIuMTUzIDQuOC00LjhzLTIuMTUzLTQuOC00LjgtNC44YTQuODA1IDQuODA1IDAgMCAwLTQuOCA0LjhjMCAyLjY0NyAyLjE1MyA0LjggNC44IDQuOHoiLz4KPC9zdmc+Cg==)',
            marginBottom: 20
        },
        fileInput : {
           
            border: '1px solid rgb(195, 194, 204)',
            width : '100%',
            height: '100%',
            //position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            cursor: 'pointer',
            fontSize : 0
        },
        appendBox : {
            display : 'flex',
           
            width : 180,
            height : 180
        },
        appendImg : {
            width: 180,
            height: 180,
           
            marginRight: 0,
            marginBottom: 0,
            position: 'relative',
            display: 'inlineBlock',
            cursor: 'pointer',
        },
        img : {
            width : '100%',
            height : '100%'
        }
      }));
      
      const classes = useStyles();

    
    const move = () =>{
        props.history.push("/")
    }
    
      const putImage = () =>{
          const input = document.querySelector('input[type="file"]')
          var data = new FormData();
          data.append("file",input.files[0])
          fetch("http://localhost:8081/api/thumbNail",{
              method : 'post',
            //   headers :{
            //     'Content-Type': 'multipart/form-data'
            //      Authorization : {
        //              Bearer ${token}
            //        }
            //   },
              body : data
                
              
          }).
          then((res)=>{
              if(!res.status==200){
                throw new Error('http ??????');
              }
              return res.json();
          }).
          then((res)=>{
            // setImgUrl(res.url)
            setForm({
                ...form,
                "profileImgUrl" : res.url
            })
          })
      }

      const putbankBook = () =>{
        const input = document.querySelector('input[name="bankBook"]')
        var data = new FormData();
        data.append("file",input.files[0])
        fetch("http://localhost:8081/api/thumbNail",{
            method : 'post',
          //   headers :{
          //     'Content-Type': 'multipart/form-data'
          //      Authorization : {
      //              Bearer ${token}
          //        }
          //   },
            body : data
              
            
        }).
        then((res)=>{
            if(!res.status==200){
              throw new Error('http ??????');
            }
            return res.json();
        }).
        then((res)=>{
          // setImgUrl(res.url)
          setForm({
              ...form,
              "bankBookImageUrl" : res.url
          })
        })
    }

  
    const FormValueHandler = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
        console.log(form)
    }
    
    const onSubmit = () =>{
        
        if(confirm("??????????????? ????????? ???????????????????")){
            fetch(`http://localhost:8081/creator/signCreator`,{
                method  : "post",
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type" : "application/json;charset=utf-8"
                },
                body : 
                JSON.stringify(form)       
            }).
            then((res)=>{
                
                if(res.status==200){
                    alert("??????????????? ?????????????????? ???????????????. ???????????? ?????? ?????? ????????? ???????????????.")
                    props.history.push("/")
                }
                else{
                    throw new Error('http??????')
                }
             
              
            }).
            catch((e)=>{
                alert("????????? ?????? ??? ?????? ??????"+e.message)
            })

        }
    }

   
    useEffect(() => {
        fetch('http://localhost:8081/creator/isBacker',{
            
            headers : {
                "Authorization" : `Bearer ${token}`
            }
            }).then(res=>{
                if(!res.status==200){
                    alert("?????? ?????????????????? ???????????? ????????????.")
                    props.history.push("/")
                }
            })
        
       
    }, [])
    return (
    <div style={{height:'100%'}}>
        <Container>
         <div style={{backgroundColor:'write'}}>
            <div style={{borderBottom: '1px solid #C8C8C8', boxShadow:'4px black', height:'300px'}}>
                <div style={{display:'flex', paddingTop:'20px', justifyContent:'space-between'}}>
                    <div>
                        <Button fontSize="large" size='large' onClick={move}><ArrowBackIcon fontSize="large"/></Button>{' '}
                    </div>
                    <div>
                        
                        <Button variant="contained" color="secondary" size='large' onClick={onSubmit}>??????????????? ????????????</Button>{' '}
                        
                      
                    </div>
                </div>
                <div style={{display:'flex',marginTop:'20px', paddingTop:'80px'}}>
                    <Box fontSize={35} fontWeight="fontWeightBold">??????????????? ??????</Box>
                </div>
                
            </div>
            <div style={{paddingTop:'30px', paddingBottom:'30px', backgroundColor:'#FCFCFC',}}>
                <Container maxWidth="md">
                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px', display:'flex', justifyContent:'space-between'}}>
                        <div>
                            <h4 style={{fontWeight:'bold'}}>??????????????? ?????????</h4>
                            <h6>?????????????????? ???????????? ???????????? ??????????????????.</h6>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                        <input name="creatorNickName"  onKeyUp={FormValueHandler} onChange={FormValueHandler} style={{border:'1px solid #B6B7B9', borderRadius:'3px', width:'450px', height:'40px'}} placeholder={'???????????? ??????????????????'}></input>
                        </div>
                    </div>

                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px', display:'flex', justifyContent:'space-between'}}>
                        <div>
                            <h4 style={{fontWeight:'bold'}}>??????????????? ?????????</h4>
                            <h6>????????????????????? ????????? ?????? ??? ????????? ???????????? ??????????????????.</h6>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                          
                            <textarea name="career"  onKeyUp={FormValueHandler} onChange={FormValueHandler} style={{border:'1px solid #B6B7B9', borderRadius:'3px', width:'450px', height:'100px'}} placeholder={'???????????? ??????????????????'} />
                        </div>
                    </div>

                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px', display:'flex', justifyContent:'space-between'}}>
                        <div>
                            <h4 style={{fontWeight:'bold'}}>??????????????? ??????</h4>
                            <h6>????????? ????????? ?????????????????? ?????? ????????? ????????? ??? ?????????<br/>???????????? ???????????? ??????????????????.</h6>
                        </div>
                        <div>
                            <textarea name="aboutMe" onKeyUp={FormValueHandler} onChange={FormValueHandler} style={{border:'1px solid #B6B7B9', borderRadius:'3px', width:'450px', height:'100px'}} placeholder={'??????????????? ????????? ??????????????????'}></textarea>
                        </div>
                    </div>

                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px', display:'flex', justifyContent:'space-between'}}>
                        <div>
                            <h4 style={{fontWeight:'bold'}}>??????????????? ????????? ??????</h4>
                            <h6>??????????????? ?????????????????????<br/>?????? ????????? ?????? ??? ????????? ????????? ?????????????????? ???????????????.<br/>(?????? ????????? 3MB ????????? ?????? ???????????????.)</h6>
                        </div>
                        
                        <div className={classes.imgContentBox}>
                            <div className={classes.inputBox}>
                                <label> 
                                    <div className={classes.imageUploadBox}>
                                    <input className={classes.fileInput} onChange={putImage} type="file" accept="image/*" required ></input>
                                    </div>
                                    
                                </label>
                            </div>
                            <div className={classes.appendBox}>
                                <div className={classes.appendImg}>
                                    <Avatar className={classes.img} src={form.profileImgUrl} />
                                </div>
                            </div>
                            
                        </div>
                        
                       
                    </div>

                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px', display:'flex', justifyContent:'space-between'}}>
                        <div>
                            <h4 style={{fontWeight:'bold'}}>?????????????????????</h4>
                            <h6>???????????????????????? ????????? ??????????????????.</h6>
                        </div>
                        <div>
                            <input name="businessNumber"  onKeyUp={FormValueHandler} onChange={FormValueHandler} style={{border:'1px solid #B6B7B9', borderRadius:'3px', width:'450px', height:'40px'}} placeholder={'?????????("-")??? ???????????? ????????? ?????????'}></input>
                        </div>
                    </div>

                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px', display:'flex', justifyContent:'space-between'}}>
                        <div>
                            <h4 style={{fontWeight:'bold'}}>??????????????? ????????????</h4>
                            <h6>?????????????????? ??????????????? ????????? ?????????.</h6>
                        </div>
                        <div>
                            <input name="bankName"  onKeyUp={FormValueHandler} onChange={FormValueHandler} style={{border:'1px solid #B6B7B9', borderRadius:'3px', width:'150px', height:'40px',marginRight:'10px'}} placeholder={'???????????? ??????????????????'}></input> 
                            <input name="accountNumber"  onKeyUp={FormValueHandler} onChange={FormValueHandler} style={{border:'1px solid #B6B7B9', borderRadius:'3px', width:'250px', height:'40px'}} placeholder={'?????????("-")??? ???????????? ????????? ?????????'}></input>
                        </div>
                    </div>

                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px', display:'flex', justifyContent:'space-between'}}>
                        <div>
                            <h4 style={{fontWeight:'bold'}}>??????????????? ?????? ?????? </h4>
                            <h6>??????????????? ?????????????????????.<br/>(?????? ????????? 3MB ????????? ?????? ???????????????.)</h6>
                        </div>
                        
                        <div className={classes.imgContentBox}>
                            <div className={classes.inputBox}>
                                <label> 
                                    <div className={classes.imageUploadBox}>
                                    <input name="bankBook" className={classes.fileInput} onChange={putbankBook} type="file" accept="image/*" required ></input>
                                    </div>
                                    
                                </label>
                            </div>
                            <div className={classes.appendBox}>
                                <div className={classes.appendImg}>
                                    <img className={classes.img} src={form.bankBookImageUrl} />
                                </div>
                            </div>
                            
                        </div>
                        
                       
                    </div>

                </Container>    
            </div>
        </div>
        </Container>
       
    </div>
    
    );
};