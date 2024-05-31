import React from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import ImagePreview from './ImagePreview';


const UploaderForm = ({ fileData, handleFileChange, handleFileUploadClick, handleFileRemove, uploadImage, uploadedFileName }) => (
    <div className="box-container">
        <form className='form-images' onClick={handleFileUploadClick}>
            <input
                type="file"
                accept="image/*"
                className="input-field"
                hidden
                onChange={handleFileChange}
            />
            {fileData.image ? (
                <img src={fileData.image} width={300} height={300} alt={fileData.fileName} />
            ) : (
                <>
                    <MdCloudUpload color="#1475cf" size={60} />
                    <p>Browse Image to upload</p>
                </>
            )}

            
        </form>

        <section className="uploaded-row">
            <AiFillFileImage color="#1475cf" />
            <span className="upload-content">
                {fileData.fileName}
                
            </span>
            <MdDelete onClick={handleFileRemove} className="delete-icon" />
        </section>

        <button type="button" className="btn-upload" onClick={uploadImage}>
            Upload
        </button>

        {uploadedFileName && (
            <section className="upload-info">
                <h3>Uploaded File</h3>
                <p>{uploadedFileName}</p>
            </section>
        )}

    </div>
);

export default UploaderForm;
