import React from 'react';

const ImagePreview = ({ selectedImage }) => (
    <div className="image-preview">
        {selectedImage && <img src={selectedImage} alt="Selected" className="selected-image" />}
    </div>
);

export default ImagePreview;
