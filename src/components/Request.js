import makeService from "../services/model"
import {FormGroup,Button,Input,Label} from 'reactstrap'
import React,{useState} from 'react'
export default function Request(){
    const [images,setImages] = useState([])
    const [content,setContent] = useState([])
    const onChange = (e) =>{
        setImages(e.target.files)
    }
    const onContent = e =>{
        setContent(e.target.value)
    }
    async function onUpload(e){
        e.preventDefault()
        const formData = new FormData()
        for(let image of images){
            formData.append("image",image)
        }
        formData.append('content',content)
        for (const [key,value] of formData){
            console.log(key,value)
        }
        const res = await makeService.makeRequest(formData)
        console.log(res)
    }
    return(
        <>
            <form id="request" encType="multipart/form-data">
                <h2>Request</h2>
                <Label htmlFor="content">content</Label>
                <Input name='content'  type="text" onChange={onContent}/> <br/>
                <Label htmlFor="image">content</Label>
                <Input name='image'  type="file" multiple="true" accept=".png,.jpeg, .jpg " onChange={onChange}/> 
                <br/>
                <Input className="btn btn-primary" type="submit" value="Upload" onClick={onUpload} />

            </form>
        </>
    )
}