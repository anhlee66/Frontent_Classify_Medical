import React, { useState } from 'react';
import UploaderForm from '../components/UploaderForm';
import ImageList from '../components/ImageList';
import ImagePreview from '../components/ImagePreview';
import useDirectoryPicker from '../hooks/useDirectoryPicker';
import AnimatedArrow from '../utils/Animated'
import { FaElementor } from 'react-icons/fa';
import makeService from '../services/model'
import Header from '../components/Header'
import { wait } from '@testing-library/user-event/dist/utils';
import data from '../data'

const UploadSection = () => {
    const [fileData, setFileData] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { images, handleDirectoryOpen } = useDirectoryPicker();
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false)
    const [similar, setSimilar] = useState([])

    const handleFileChange = ({ target: { files } }) => {

        if (files) {
            // setFileData({ image: URL.createObjectURL(files[0]), fileName: files[0].name });
            const listFile = []

            for (const file of files) {

                listFile.push({
                    image: file,
                    fileName: file.name,
                    src: URL.createObjectURL(file)
                })

            }
            setFileData([...fileData, ...listFile]);
            // setSelectedImage(URL.createObjectURL(files[0]))
            // setResponse([{ 'name': 'hello', 'confidence': '1' }])

        }
        console.log(fileData.image)
    };

    const handleFileUploadClick = () => {
        document.querySelector('.input-field').click();
    };

    const handleFileRemove = () => {
        setFileData({ image: null, fileName: 'No selected' });
        setUploadedFileName(null);
    };

    const uploadImage = async (e) => {
        e.preventDefault()


    };

    const handleImageClick = async (image, index) => {
        setSimilar([])
        setLoading(true)
        const file = fileData[index]
        setSelectedImage(file);

        console.log('Image: ', file);
        setUploadedFileName(file.fileName);
        const formData = new FormData()
        formData.append("image", file.image)
        const res = await makeService.makeRequest(formData)
        // if(res.status == 200){
        // }
        // else{
        //     console.log(res.status)
        // }
        console.log(res)
        // setSelectedImage(res[0].image_base64)
        setResponse(res)
        if (res) {
            setSimilar(res[0].image_base64)
            setLoading(false)
        }
        console.log(similar)
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
    const LoadJson = async () =>{
       
        console.log(data)
    }

    return (
        <>
            <Header />
            <main>
                <div>
                    <div className='d-flex justify-content-center btn btn-primary fs-4 '
                        onClick={OpenImageClick}
                    >
                        <form>
                            <span>Thêm ảnh</span>
                            <input id="open-image" className='btn btn-primary fs-4 ' type='file' hidden multiple onChange={handleFileChange} accept='image/*' />
                        </form>
                    </div>

                    <ImageList images={fileData} onImageClick={handleImageClick} />
                </div>
                <div className='container'>

                    {loading ? (
                        <div className='spinner'></div>
                    ) : (
                        <>
                            <div>
                                {selectedImage && <img className='selected-image' src={selectedImage.src} alt='selected image' />}
                            </div>
                            {response.map((value, index) => (
                                <div className='response' key={index}>
                                    <p><b>Tên loại bệnh: </b>{data[value.name].name} ({value.name})</p>
                                    <p><b>Độ chính xác: </b>{parseInt(value.confidence *100)} %</p>
                                    <p><b>Thông tin: </b>{data[value.name].information}/</p>
                                </div>))}

                            <div >
                                {similar.length > 0 && (
                                    <div><b>Hình ảnh tương tự</b></div>)
                                }
                                <div className='response-image'>
                                    {similar.map((value, index) => (
                                        <>
                                            <img key={index} className='image-similar' src={`data:image/jpeg;base64,${value['image']}`} alt="image" />
                                        </>
                                    ))}
                                </div>
                                {similar.length > 0 && <div className='more-image' onClick={GetMore}>Xem thêm</div>}

                            </div>

                        </>
                    )}
                </div>


            </main>
        </>

    );
};

export default UploadSection;
