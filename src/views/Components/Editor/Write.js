import React, {useEffect, useRef, useState} from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from "ckeditor5-custom-build/build/ckeditor";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/components.js";

export default function Write(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [flag, setFlag] = useState(false);
    const inputRef = useRef();
    const [data,setData] = useState("")
    // const [manageUrl,setManageUrl] = useState(props.)
    const [token,setToken] = useState(localStorage.getItem("token"))
    // useEffect(()=>{
    //     // 저장 후 목록으로 이동
       
    //         history.push('/app/list');
    //     }
    // },[]);
    
    
    const handleList = () => {
        history.push('/app/list');
    }
    
    const handleReset = () => {
        
        setContent("");
    }
    
    const handleSave = () => {
        if (!isEmpty(title) && !isEmpty(content)) {

        }else {
            setFlag(true);
        }
    }
    
    const handleEditorChange = (data) => {
        
        //console.log(data)
        
    }
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    
    const handleClose = () => {
        setFlag(false);
    }
    useEffect(() => {
        fetch(`http://localhost:8081/creator/edit/${props.manageUrl}`,{
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        }).then((res)=>{
            if(!res.status==200){
                throw new Error("http에러")
            }
            return res.json()
        }).then((res)=>{
            switch (props.data) {
                case "content":
                    setData(res.content)
                    break;
                case "budget":
                    setData(res.budget)
                    break;
                case "schedule":
                    setData(res.schedule)
                    break;
                case "aboutUs":
                    setData(res.aboutUs)
                    break;
            }
        }).then(()=>{
            if(data==undefined){
                setData("")
            }
        }).
        catch((e)=>{
            console.log(e.message)
        })
       
       
    }, [])
    
    return (

      <div className="Editor">

        <div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} />
            <div>
            <CKEditor
              editor={ Editor }
              data = {data}
              config={{
                
                placeholder: "내용을 입력해주세요!",
                
                image: {
                    styles: ['alignLeft', 'alignCenter', 'alignRight'],
                    resizeUnit: 'px',
                    resizeOptions: [
                    {
                        name: 'resizeImage:original',
                        value: null,
                        icon: 'original'
                    },
                    {
                        name: 'resizeImage:50',
                        value: '50',
                        icon: 'medium'
                    },
                    {
                        name: 'resizeImage:75',
                        value: '75',
                        icon: 'large'
                    }
                ]},
             
                
                
                toolbar: ['heading','Title', 'bold', 'italic', '|',
                'bulletedList', 'numberedList','TodoList','Underline', 'blockquote', 'link', 'code', 'codeblock', '|',
                'imageupload','MediaEmbed', 'imagestyle:alignLeft', 'imagestyle:alignCenter', 'imagestyle:alignRight', '|',
                'undo', 'redo','resizeImage:50','resizeImage:75','resizeImage:original','FontColor','FontFamily','FontSize','FontBackgroundColor',
                'Table','TableToolbar'
                ],
                
               
                 simpleUpload: {
                    uploadUrl: 'http://localhost:8081/api/image',
                }
                
              }}
              onChange={(event,editor)=>{
                setContent(editor.getData())
                  props.onSave(content)
                
                
                
                
              }}
              onBlur={ ( event, editor ) => {
                  console.log( 'Blur.', editor.getData() );
                  setContent(editor.getData())
                  props.onSave(content)
              } }
              onFocus={ ( event, editor ) => {
                setContent(editor.getData())
                props.onSave(content)
              } }
              onReady={(editor) => {
   
              }}
          />
            </div>
          
          </div>
      </div>
    );
  }