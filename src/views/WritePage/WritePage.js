import React , {useEffect,useState,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import WritePageRouter from './WritePageRouter';
import { Button } from '@material-ui/core'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Box } from '@material-ui/core';
import WritePageNav from './WritePageNav';
import Modal from '@material-ui/core/Modal';
import PreviewPage from 'views/ViewPage/PreviewPage';
import queryString from 'query-string';
import { useParams } from 'react-router';
import Progress from 'components/CrowdeeComponents/Progress';
import DoneIcon from '@material-ui/icons/Done';
export default function WritePage(props) {
    
    const saveCheck = useRef(0)
  

    const [token,setToken] = useState(localStorage.getItem("token"))
    const [manageUrl,setManageUrl] = useState(props.match.params.manageUrl)
    const [inspect,setInsepct] = useState(true)
    const [progressValue,setProgressValue] = useState(0)
    const [creatorId,setCreatorId] = useState()
  
    const [path,setPath] = useState(`/creator/create/thumbNail/${manageUrl}`);
    
    const [formData,setFormData] = useState();
    const [open, setOpen] =useState(false);
    const [modalData,setModalData] = useState();
    const [first,setFirst] = useState(true)
    const [second,setSecond] = useState(false)
    const [third,setThird] = useState(false)
    const [editDTO,setEditDTO] = useState({})
    const [location,setLocation] = useState("first")
    const [firstCheck,setFirstCheck] = useState("none")
    const [secondCheck,setSecondCheck] = useState("none")
    const [thirdCheck,setThirdCheck] = useState("none")
    const useStyles = makeStyles((theme)=>({
       
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height : '850px',
        
        },
      }));
      
      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const classes = useStyles();

    const changeDef = () =>{
        setPath(`/creator/create/thumbNail/${manageUrl}`)
        if(creatorId){
            if(saveCheck.current.current){
                setFirst(true)
                setLocation("first")
                setProgressValue(progressValue+33)
                props.history.push(`/write-page/${manageUrl}?creatorId=${creatorId.creatorId}`)
            }
            else{
                if(confirm("???????????? ????????? ???????????? ???????????????. ???????????? ?????? ?????????????????????????")){
                    setLocation("first")
                    props.history.push(`/write-page/${manageUrl}?creatorId=${creatorId.creatorId}`)
                }
            }
            saveCheck.current =0
        }
        else{
            if(saveCheck.current.current){
                setFirst(true)

                setLocation("first")
                
                
                props.history.push(`/write-page/${manageUrl}`)
            }
            else{
                if(confirm("???????????? ????????? ???????????? ???????????????. ???????????? ?????? ?????????????????????????")){
                    setLocation("first")
                    props.history.push(`/write-page/${manageUrl}`)
                }
            }
            saveCheck.current =0
        }
        
    }
    const changeFun = () =>{
        setPath(`/creator/create/fundingPlan/${manageUrl}`)
        if(creatorId){
            if(saveCheck.current){
                setSecond(true)
                setLocation("second")
                
                props.history.push(`/write-page/funding/${manageUrl}?creatorId=${creatorId.creatorId}`)
            }
            else{
                if(confirm("???????????? ????????? ???????????? ???????????????. ???????????? ?????? ?????????????????????????")){
                    setLocation("second")
                    props.history.push(`/write-page/funding/${manageUrl}?creatorId=${creatorId.creatorId}`)
                }
            }
         
            saveCheck.current =0
        }
        else{
            if(saveCheck.current){
                setSecond(true)
                setLocation("second")
                
                props.history.push(`/write-page/funding/${manageUrl}`)
            }
            else{
                if(confirm("???????????? ????????? ???????????? ???????????????. ???????????? ?????? ?????????????????????????")){
                    setLocation("second")
                    props.history.push(`/write-page/funding/${manageUrl}`)
                }
            }
         
            saveCheck.current =0
        }
       
    }
    const changeSto = () =>{
        setPath(`/creator/create/detail/${manageUrl}`)
        if(!creatorId==undefined){
            if(saveCheck.current){
                setThird(true)
                setLocation("third")
                
                props.history.push(`/write-page/story/${manageUrl}?creatorId=${creatorId.creatorId}`)
            }
            else{
                if(confirm("???????????? ????????? ???????????? ???????????????. ???????????? ?????? ?????????????????????????")){
                    setLocation("third")
                    props.history.push(`/write-page/story/${manageUrl}?creatorId=${creatorId.creatorId}`)
                }
            }
            saveCheck.current =0
        }
        else{
            if(saveCheck.current){
                setThird(true)
                setLocation("third")
                
                props.history.push(`/write-page/story/${manageUrl}`)
            }
            else{
                if(confirm("???????????? ????????? ???????????? ???????????????. ???????????? ?????? ?????????????????????????")){
                    setLocation("third")
                    props.history.push(`/write-page/story/${manageUrl}`)
                }
            }
            saveCheck.current =0
        }
       
    }
    const move = () =>{
        props.history.push("/")
    }
    const form = data =>{
        
        setFormData(data)
    }

    const requestInspection = () =>{
        fetch(`http://localhost:8081/creator/create/${manageUrl}`,{
            
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
                }).
                then((res)=>{
                    if(!res.status==200){
                        throw new Error('http??????')
                    }
                    alert("???????????? ????????? ???????????? ?????? ??? ?????? ??? ???????????????!")
                    props.history.push("/")
                })
    }
    const preview = () =>{
       
        fetch(`http://localhost:8081/creator/create/preview/${manageUrl}`,{
            
            headers : {
                "Authorization" : `Bearer ${token}`
            }

        }).
        then((res)=>{
            if(res.status==200){
                return res.json();
            }
            else{
                throw new Error("???????????? ?????? ??? ?????? ??????")
            }
            
        }).then((res)=>{
            setModalData(res)
            setOpen(true);
        }).catch(e=>{
            alert("???????????? ?????? ??? ?????? ??????" + e.message)
        })
    }
    
    const onSubmit = () =>{
        
        if(confirm("?????????????????????????")){
            fetch(`http://localhost:8081${path}`,{
                method  : "post",
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type" : "application/json;charset=utf-8"
                },
                body : 
                JSON.stringify(formData)       
            }).
            then((res)=>{
                
                if(!res.status==200){
                    throw new Error('http??????')
                }
               
               switch (location) {
                   case "first":
                       setFirstCheck("")
                       if(progressValue<100){
                            setProgressValue(progressValue+33)
                       }
                       break;
               
                   case "second":
                        setSecondCheck("")
                        if(progressValue<100){
                            setProgressValue(progressValue+33)
                       }
                       break;
                    case "third":
                        setThirdCheck("")
                        if(progressValue<100){
                            setProgressValue(progressValue+34)
                       }
                    break;
               }
               saveCheck.current=1;
               if(first&&second&&third){
                   setProgressValue(100)
                   setInsepct(false)
               }
            }).catch((e)=>{
                alert("????????? ?????? ??? ?????? ??????"+e.message)
            })

        }
    }

    const edit = () =>{
        
        fetch(`http://localhost:8081/creator/edit/${manageUrl}`,{
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        }).then((res)=>{
            if(!res.status==200){
                throw new Error("http??????")
            }
            return res.json()
        }).then((res)=>{
            console.log("writePage",res)
            setEditDTO(res)
        }).catch((e)=>{
            console.log(e.message)
        })
        
    }
   
    useEffect(() => {
        setPath(`/creator/create/thumbNail/${manageUrl}`);
        setManageUrl(props.match.params.manageUrl)
        setCreatorId(queryString.parse(props.location.search))
        edit();
        
       
    }, [])
    return (
    <div style={{height:'1500px'}}>
        <Container>
         <div style={{backgroundColor:'write'}}>
            <div style={{borderBottom: '1px solid #C8C8C8', boxShadow:'4px black', height:'300px'}}>
                <div style={{display:'flex', paddingTop:'20px', justifyContent:'space-between'}}>
                    <div>
                        <Button fontSize="large" size='large' onClick={move}><ArrowBackIcon fontSize="large"/></Button>{' '}
                    </div>
                    <div>
                        <Button style={{marginRight:"30px"}} onClick={requestInspection} disabled={inspect} variant="contained" color="secondary" size='large'>
                            <Progress value={progressValue}/>
                            ??????????????????
                            </Button>
                        <Button variant="contained" color="secondary" size='large' onClick={onSubmit}>??????</Button>{' '}
                        <Button variant="contained" color="secondary" size='large' onClick={preview}>????????????</Button>{' '}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            className={classes.modal}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description">
                        <PreviewPage 
                            data={modalData}
                        ></PreviewPage>
                    </Modal>
                    </div>
                </div>
                <div style={{display:'flex',marginTop:'20px', paddingTop:'80px'}}>
                    <Box fontSize={35} fontWeight="fontWeightBold">???????????? ??????</Box>
                </div>
                <div style={{display:'flex', justifyContent:'space-around',marginTop:'50px'}}>
                    <Button>
                        <h4 style={{fontWeight:'bold'}} onClick={changeDef}>???????????? <DoneIcon  style={{color:"green",display:firstCheck}}/></h4>
                    </Button>
                    <Button>
                        <h4 style={{fontWeight:'bold'}} onClick={changeFun}>?????? ?????? <DoneIcon style={{color:"green",display:secondCheck}}/> </h4>
                    </Button>
                    <Button>
                        <h4 style={{fontWeight:'bold'}} onClick={changeSto}>???????????? ?????? <DoneIcon style={{color:"green",display:thirdCheck}}/> </h4>
                    </Button>
                </div>
            </div>
               <WritePageRouter form={form} data={editDTO}  />
        </div>
        </Container>
       
    </div>
    
    );
};