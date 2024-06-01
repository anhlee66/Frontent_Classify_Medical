import React, { useState } from 'react';
import UploaderForm from './UploaderForm';
import ImageList from './ImageList';
import ImagePreview from './ImagePreview';
import useDirectoryPicker from '../hooks/useDirectoryPicker';
import AnimatedArrow from '../utils/Animated'
import { FaElementor } from 'react-icons/fa';
import makeService from '../services/model'

const UploadSection = () => {
    const [fileData, setFileData] = useState({ image: null, fileName: 'No selected Image' });
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { images, handleDirectoryOpen } = useDirectoryPicker();
    const [response, setResponse] = useState([])

    const handleFileChange = ({ target: { files } }) => {
        if (files && files[0]) {
            // setFileData({ image: URL.createObjectURL(files[0]), fileName: files[0].name });
            setFileData({ image: files[0], fileName: files[0].name });
            setSelectedImage(URL.createObjectURL(files[0]))

        }
    };

    const handleFileUploadClick = () => {
        document.querySelector('.input-field').click();
    };

    const handleFileRemove = () => {
        setFileData({ image: null, fileName: 'No selected' });
        setUploadedFileName(null);
        setResponse([])
    };  

    const uploadImage = async (e) => {
        e.preventDefault()
        console.log('Image: ', fileData);
        setUploadedFileName(fileData.fileName);
        const formData = new FormData()
        formData.append("image", fileData.image)
        const res = await makeService.makeRequest(formData)
        // if(res.status == 200){
        // }
        // else{
        //     console.log(res.status)
        // }
        console.log(res)
        // setSelectedImage(res[0].image_base64)
        setResponse(res)

    };

    const handleImageClick = (image) => {
        setSelectedImage(URL.createObjectURL(image));
    };


    return (
        <main>
            <div className="upload-folder">
                <button onClick={handleDirectoryOpen} className="btn-directory">
                    Open Directory
                </button>
                <div className="container">
                    <div className="left-panel">
                        <ImageList images={images} onImageClick={handleImageClick} />
                    </div>
                    <div className="main-panel">
                        <ImagePreview selectedImage={selectedImage} />
                    </div>
                </div>
            </div>

            <AnimatedArrow />

            <UploaderForm
                fileData={fileData}
                handleFileChange={handleFileChange}
                handleFileUploadClick={handleFileUploadClick}
                handleFileRemove={handleFileRemove}
                uploadImage={uploadImage}
                uploadedFileName={uploadedFileName}
            />
            {response.map((value) =>(
                <div>
                {<img src={`data:image/jpeg;base64,${value.image_base64}`} alt="image" />}
                <div>
                    <p>class:{value.name}</p>
                    <p>Confidence: {value.confidence}</p>
                </div>
            </div>
            ))}

        </main>
    );
};

export default UploadSection;
