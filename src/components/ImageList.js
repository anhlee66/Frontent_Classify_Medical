import React from 'react';

const ImageList = ({ images, onImageClick }) => (
    <div className='image-list-container'>
        <div className="image-list">
            {images.map((value, index) => (
                <img
                    key={index}
                    src={value.src}
                    alt=""
                    className="image-thumbnail"
                    onClick={() => onImageClick(value.src,index)}
                />
            ))}
        </div>
    </div>

);

export default ImageList;
