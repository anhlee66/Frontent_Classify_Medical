import React from 'react';

const ImageList = ({ images, onImageClick }) => (
    <div className="image-list">
        {images.map((image, index) => (
            <img
                key={index}
                src={image.url}
                alt={image.name}
                className="image-thumbnail"
                onClick={() => onImageClick(image.url)}
            />
        ))}
    </div>
);

export default ImageList;
