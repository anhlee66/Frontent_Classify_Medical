import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import UploadSection from './components/UploadSection';




function App(){
    return (
        <div>
            <Header />
            <UploadSection />
        </div>
    );
}




















export default App;









/*
function Uploader() {
    const [fileData, setFileData] = useState({
        image: null,
        fileName: 'No selected file'
    });

    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);

    const handleFileChange = ({ target: { files } }) => {
        if (files && files[0]) {
            setFileData({
                image: URL.createObjectURL(files[0]),
                fileName: files[0].name
            });
        }
    };

    const handleFileUploadClick = () => {
        document.querySelector('.input-field').click();
    };

    const handleFileRemove = () => {
        setFileData({
            image: null,
            fileName: 'No selected file'
        });
        setUploadedFileName(null);
    };

    const uploadImage = () => {
        console.log('Image: ', fileData.image);
        setUploadedFileName(fileData.fileName);
    };

    const handleDirectoryOpen = async () => {
        try {
            const directoryHandle = await window.showDirectoryPicker();
            const files = [];

            for await (const entry of directoryHandle.values()) {
                if (entry.kind === 'file' && entry.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                    const file = await entry.getFile();
                    const url = URL.createObjectURL(file);
                    files.push({ url, name: entry.name });
                }
            }

            setImages(files);
            setIsDirectoryOpen(true); // Set the state to true when the directory is opened
        } catch (error) {
            console.error('Error accessing directory: ', error);
        }
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    //upload image backend
    /*    const uploadImage = async () => {
    if (fileData.image) {
        const formData = new FormData();
        const file = document.querySelector('.input-field').files[0];
        formData.append('image', file);

        try {
            const response = await axios.post('https://api.yourserver.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUploadedFileName(fileData.fileName);
            console.log('Image uploaded successfully: ', response.data);
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    }
    };
    */

    //delete image backend
    /*    const deleteImage = async (fileName) => {
        try {
            await axios.delete(`https://api.yourserver.com/images/${fileName}`);
            // Sau khi xóa thành công, cập nhật lại danh sách hình ảnh
            fetchImages();
        } catch (error) {
            console.error('Error deleting image: ', error);
        }
    };

    const handleFileRemove = () => {
        deleteImage(fileData.fileName);
        setFileData({
            image: null,
            fileName: 'No selected file'
        });
        setUploadedFileName(null);
    };
    

    return (
        <div>
            <header>
                <img src={logo} alt="Logo" />
                HỆ THỐNG NHẬN DIỆN HÌNH ẢNH Y KHOA
            </header>
            <main>
                <div className="upload-folder">
                    <button onClick={handleDirectoryOpen} className="btn-directory">
                        Open Directory
                    </button>
                    <div className="container">
                        <div className="left-panel">
                            <div className="image-list">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={image.name}
                                        className="image-thumbnail"
                                        onClick={() => handleImageClick(image.url)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="main-panel">
                            <div className="image-preview">
                                {selectedImage && (
                                    <img
                                        src={selectedImage}
                                        alt="Selected"
                                        className="selected-image"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="right-panel">
                            <button
                                type="button"
                                className="btn-upload"
                                onClick={uploadImage}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>

                {!isDirectoryOpen && (
                    <div className="upload-image">
                        <form onClick={handleFileUploadClick}>
                            <input
                                type="file"
                                accept="image/*"
                                className="input-field"
                                hidden
                                onChange={handleFileChange}
                            />

                            {fileData.image ? (
                                <img src={fileData.image} width={500} height={480} alt={fileData.fileName} />
                            ) : (
                                <>
                                    <MdCloudUpload color="#1475cf" size={60} />
                                    <p>Browse Files to upload</p>
                                </>
                            )}
                        </form>

                        <section className="uploaded-row">
                            <AiFillFileImage color="#1475cf" />
                            <span className="upload-content">
                                {fileData.fileName}
                                <MdDelete
                                    onClick={handleFileRemove}
                                    className="delete-icon"
                                />
                            </span>
                        </section>

                        <button
                            type="button"
                            className="btn-upload"
                            onClick={uploadImage}
                        >
                            Upload
                        </button>

                        {uploadedFileName && (
                            <section className="upload-info">
                                <h3>Uploaded File</h3>
                                <p>{uploadedFileName}</p>
                            </section>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

*/


