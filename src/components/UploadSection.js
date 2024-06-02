import React, { useState } from 'react';
import UploaderForm from './UploaderForm';
import ImageList from './ImageList';
import ImagePreview from './ImagePreview';
import useDirectoryPicker from '../hooks/useDirectoryPicker';
import AnimatedArrow from '../utils/Animated'
import { FaElementor } from 'react-icons/fa';
import makeService from '../services/model'

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
        setSelectedImage(image);
        setSimilar([])
        setLoading(true)
        const file = fileData[index]
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

    return (
        <main>
            <div>
                <div className='d-flex justify-content-center btn btn-primary fs-4 '
                    onClick={OpenImageClick}
                >
                    <form>
                        Add Image
                        <input id="open-image" className='btn btn-primary fs-4 ' type='file' hidden multiple onChange={handleFileChange} />
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
                            {selectedImage && <img className='selected-image' src={selectedImage} alt='selected image' />}
                        </div>
                        {response.map((value) => (
                            <div className='response'>
                                <p><b>class: </b>{value.name}</p>
                                <p><b>Confidence: </b>{value.confidence}</p>
                                <p><b>Information: </b>Step1:We will first import the Google fonts into our Lorem ipsum project; since we will be using various font styles in our project, we will also load fresh Google fonts into the CSS. We'll predefine every hue and font style we need for our project using the root selector. We will then use all the hues we need inside our project by using the pseudo...</p>
                            </div>))}

                        <div >
                            <div><b>List image similar</b></div>
                            <div className='response-image'>
                                {similar.map((value) => (
                                    <img className='image-similar' src={`data:image/jpeg;base64,${value['image']}`} alt="image" />
                                ))}
                            </div>
                            <div className='more-image'>View more image</div>

                        </div>

                    </>
                )}
            </div>


        </main>
    );
};

export default UploadSection;
