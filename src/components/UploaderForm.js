import React from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

const UploaderForm = ({ fileData, handleFileChange, handleFileUploadClick, handleFileRemove, uploadImage, uploadedFileName }) => (
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
                <MdDelete onClick={handleFileRemove} className="delete-icon" />
            </span>
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
