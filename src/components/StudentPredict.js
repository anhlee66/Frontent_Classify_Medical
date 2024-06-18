import React, { useEffect, useState } from 'react';
import ImageList from './ImageList';
import useDirectoryPicker from '../hooks/useDirectoryPicker';
import data from '../data'
import Like from './Items/Like';
import Question from './Items/Question';

const StudentPredict = () => {
    const [fileData, setFileData] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { images, handleDirectoryOpen } = useDirectoryPicker();
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false)
    const [similar, setSimilar] = useState([])
    const [current, setCurrent] = useState(null)
    const [detail, setDetail] = useState(null)
    const [isShowQuestion, setIsShowQuestion] = useState(false)
    const [isShowSimilar, setIsShowSimilar] = useState(false)
    const [ex,setEx] = useState(false)
    const handleFileChange = async ({ target: { files } }) => {
        if (files) {
            const listFile = []

            for (const file of files) {

                listFile.push({
                    image: file,
                    fileName: file.name,
                    src: URL.createObjectURL(file),
                    isDone: false,
                    isSend: false
                })

            }
            setFileData([...fileData, ...listFile]);


        }

    };
    useEffect(() => {
        fileData.forEach(async (e, index) => {
            if(e.isSend) return
            if (!e.isDone) {
                // console.log(e.fileName, "=", index)
                e.isSend = true
                await UploadImage(e, index)
                    .then(res => {
                        if (res.status == 200) {
                            return res.json()
                        }
                        throw new Error
                    })
                    .then(data => {
                        // console.log(data)
                        e.isDone = true
                        e.isSend = false
                        response.push(data[0])
                        setResponse(response)
                        setFileData(fileData)
                        console.log(fileData)
                        console.log("file changed")


                    })
                    .catch(err => console.log(err))


            }
        });
    }, [fileData])

    useEffect(() => {
        setFileData(fileData) 
        console.log("changed")
    }
    , [response])

    const UploadImage = async (e, index) => {
        const formData = new FormData()
        formData.append("image", e.image)
        formData.append("id", index)

        const url = '/api/model/request'
        const option = {
            method: "POST",
            body: formData
        }
        return await fetch(url, option)


    }
    const showMessage = (msg) =>{
        setTimeout(() => {
            alert(msg)
        }, 500);
    }
    const handleImageClick = async (image, index) => {
        // setSimilar([])
        console.log(response)
        setCurrent(null)
        setSimilar([])
        setDetail(null)
        setSelectedImage([])
        const file = fileData[index]
        console.log(file.isSend)
        if(file.isSend){
           showMessage("This image are prcessing, please wait!")
            return
        } 
        setSelectedImage(file);
        if (file.isDone) {
            response.map((value, idx) => {
                if (value.id == index) {
                    setCurrent(value)
                    setSimilar(value.image_base64)
                }
            })
        }
        else {
            
            await UploadImage(file, index)
                .then(res => {
                    if (res.status == 200) {
                        file.isSend = false
                        return res.json()
                    }
                    throw new Error
                })
                .then(data => {
                    // console.log(data)
                    file.isDone = true

                    setResponse([...response, data[0]])
                    setCurrent(data[0])
                    setSimilar(data[0].image_base64)
                })
                .catch(err => console.log(err))
        }

    
    };
    function OpenImageClick(e) {
        const btn = document.querySelector('#open-image')
        btn.click()
    }
    const GetMore = async () => {
        const formData = new FormData()
        formData.append("image", response[0]['image_name'])
        formData.append("name", response[0]['name'])
        formData.append("start", response.length)
        formData.append("end", response.length + 5)

        const res = await fetch("/api/model/image", { method: "POST", body: formData }).then(res => res.json())
        console.log(res['data'])
        setSimilar([...similar, ...res['data']])
    }
    const LoadJson = async () => {

        console.log(data)
    }
    const onClearAll = () => {
        setFileData([])
        setCurrent(null)
        setResponse([])
        setSelectedImage(null)
        setSimilar([])
    }
    const onViewDetail = async () => {
        // console.log("current",current)
        if (current == null) return
        const url = `/api/disease/${current.disease_id}`
        const res = await fetch(url, { method: "GET" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(data => {
                setDetail(data)
                // console.log(data)
            })
            .catch(err => console.log(err))
        // console.log(url)


    }
    const onHideDetail = () => {
        setDetail(null)
    }
    const onQuestion = async () => {
        if (selectedImage == null) return
        setIsShowQuestion(!isShowQuestion)
    }
    const onViewSimilar = () => {
        if (current == null) return
        setIsShowSimilar(!isShowSimilar)
        console.log(similar.length)
    }
    return (
        <main className='student-page'>
            {isShowQuestion && (<Question image={selectedImage} onClose={(e) => setIsShowQuestion(false)} />)}
            <div className='left-panel'>
                <div style={{ display: "flex" }}>
                    <div className='btn-upload'
                        onClick={OpenImageClick}
                    >
                        <form>
                            <span>Thêm ảnh</span>
                            <input id="open-image" className='btn btn-primary fs-4 ' type='file' hidden multiple onChange={handleFileChange} accept='image/*' />
                        </form>
                    </div>
                    <div className='btn-upload'>
                        <button onClick={onClearAll}>Clear all</button>
                    </div>
                </div>

                <ImageList images={fileData} onImageClick={handleImageClick} />
            </div>
            <div className='container'>
                <div className='btn-control'>
                    <button className='btn-view' onClick={onViewDetail} disabled={selectedImage == null}>View details</button>
                    <button className='btn-question' onClick={onQuestion} disabled={selectedImage == null}>Question</button>
                    <button onClick={onViewSimilar} disabled={selectedImage == null}>View similar</button>
                </div>
                {loading ? (
                    <div className='spinner'></div>
                ) : (
                    <>
                        <div >
                            {selectedImage && <img className='selected-image' src={selectedImage.src} alt='selected image' />}

                        </div>
                        {current && (
                            <div className='response' >
                                <p><b>Tên loại bệnh: </b>{current.label}</p>
                                <p><b>Độ chính xác: </b>{parseInt(current.confidence * 100)} %</p>
                                {detail && (
                                    <div style={{ textAlign: "justify" }}>
                                        {detail.concept && (<p><b>Concept: </b>{detail.concept}</p>)}
                                        {detail.reason && (<p><b>Reason: </b>{detail.reason}</p>)}
                                        {detail.symptom && (<p><b>Symptom: </b>{detail.symptom}</p>)}
                                        {detail.consequence && (<p><b>Consequence: </b>{detail.consequence}</p>)}
                                        <p className='hidden-detail' onClick={onHideDetail}>hidden</p>

                                    </div>
                                )}
                            </div>)
                        }

                        {similar.length > 0 && isShowSimilar &&
                            (<div>
                                <div><b>Hình ảnh tương tự</b></div>
                                <div className='response-image'>
                                    {similar.map((value, index) => (
                                            <img key={index} className='image-similar' src={`data:image/jpeg;base64,${value['image']}`} alt="image" />
                                        
                                    ))}
                                </div>
                                {similar.length > 0 && <div className='more-image' onClick={GetMore}>Xem thêm</div>}

                            </div>)}

                    </>
                )}
            </div>


        </main>
    );
};

export default StudentPredict;
