import React, { useState } from 'react';
import UploaderForm from './UploaderForm';
import ImageList from './ImageList';
import ImagePreview from './ImagePreview';
import useDirectoryPicker from '../hooks/useDirectoryPicker';
import AnimatedArrow from '../utils/Animated'

const UploadSection = () => {
    const [fileData, setFileData] = useState({ image: null, fileName: 'No selected Image' });
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { images, handleDirectoryOpen } = useDirectoryPicker();
    

    const handleFileChange = ({ target: { files } }) => {
        if (files && files[0]) {
            setFileData({ image: URL.createObjectURL(files[0]), fileName: files[0].name });
        }
    };

    const handleFileUploadClick = () => {
        document.querySelector('.input-field').click();
    };

    const handleFileRemove = () => {
        setFileData({ image: null, fileName: 'No selected' });
        setUploadedFileName(null);
    };

    const uploadImage = () => {
        console.log('Image: ', fileData.image);
        setUploadedFileName(fileData.fileName);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
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

        </main>
    );
};

export default UploadSection;
