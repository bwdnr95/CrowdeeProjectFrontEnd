import { Container, Typography } from '@material-ui/core';
import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 150,
    },
  }));
export default function WriteFunding(props) {
    const classes = useStyles();
    const [selectedStartDate, setSelectedStartDate] =useState(new Date());
    const [selectedEndDate, setSelectedEndDate] =useState(selectedStartDate+3);
    const [form,setForm] = useState(props.data);

    const handleDateChange = (date) => {
        console.log(date.target.value)
        
        setForm({
            ...form,
            "startDate" : date.target.value
        })
      };
      const handleEndDateChange = (date) => {
          console.log(date)
        
        setForm({
            ...form,
            "endDate" : date.target.value
        })
      };

    const FormValueHandler = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
       props.save(form)
    }
  
    return (
        <div style={{paddingTop:'30px', paddingBottom:'30px', backgroundColor:'#FCFCFC',}}>
                <Container maxWidth="md">
                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px', display:'flex', justifyContent:'space-between'}}>
                        <div>
                            <h4 style={{fontWeight:'bold'}}>목표 금액</h4>
                            <h6>프로젝트를 완수하기 위해 필요한 금액을 설정해주세요.</h6>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            
                            <input name="goalFundraising" value={form.goalFundraising} onKeyUp={FormValueHandler} onChange={FormValueHandler} style={{border:'1px solid #B6B7B9', borderRadius:'3px', width:'150px', height:'40px', marginRight:'10px'}} placeholder={'목표 금액'}></input>
                             <Typography variant="h6" display="block" gutterBottom>원</Typography>
                        </div>
                    </div>

                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px', display:'flex', justifyContent:'space-between'}}>
                        <div>
                            <h4 style={{fontWeight:'bold'}}>펀딩 일정</h4>
                            <h6>설정한 일시가 되면 펀딩이 자동 시작됩니다. 펀딩 시작 전까지<br/>날짜를 변경할 수 있고, 즉시 펀딩을 시작할 수도 있습니다.</h6>
                        </div>
                        <div className={classes.container}>
                        <TextField
                            id="startDate"
                            label="펀딩시작일"
                            type="date"
                            defaultValue={selectedStartDate}
                            value={form.startDate}
                            onChange={handleDateChange}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <TextField
                            id="endDate"
                            label="펀딩마감일"
                            type="date"
                            defaultValue={selectedStartDate+3}
                            value={form.endDate}
                            onChange={handleEndDateChange}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        </div>
                    </div>

                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px', display:'flex', justifyContent:'space-between'}}>
                        <div>
                            <h4 style={{fontWeight:'bold'}}>최소 펀딩금액</h4>
                            <h6>후원자가 펀딩할 수 있는 최소 금액을 설정하세요.<br/>설정한 금액이 최소 펀딩금액이 됩니다.</h6>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <input name="minFundraising" value={form.minFundraising} onKeyUp={FormValueHandler} onChange={FormValueHandler} style={{border:'1px solid #B6B7B9', borderRadius:'3px', width:'150px', height:'40px', marginRight:'10px'}} placeholder={'최소 펀딩 금액을 입력'}></input>
                             <Typography variant="h6" display="block" gutterBottom>원</Typography>
                        </div>
                    </div>

                    <div style={{borderBottom:'1px solid #CECECE', paddingBottom:'40px', marginBottom:'40px', display:'flex', justifyContent:'space-between'}}>
                        <div>
                            <h4 style={{fontWeight:'bold'}}>최대 후원자 수</h4>
                            <h6>펀딩에 참여할 수 있는 최대 후원자 수를 설정하세요.<br/>설정한 후원자 수가 최대 후원자 수가 됩니다.</h6>
                        </div>
                        <div style={{display:'flex', alignItems:'center' }}>
                            <input name="maxBacker" value={form.maxBacker} onKeyUp={FormValueHandler} onChange={FormValueHandler} style={{border:'1px solid #B6B7B9', borderRadius:'3px', width:'150px', height:'40px', marginRight:'10px'}} placeholder={'최대 후원자 수를 입력'}></input>
                             <Typography variant="h6" display="block" gutterBottom>명</Typography>
                        </div>
                    </div>
                </Container>  
            </div> 
    );
};