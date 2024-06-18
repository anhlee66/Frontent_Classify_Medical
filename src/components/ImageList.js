import React from 'react';

const ImageList = ({ images, onImageClick, isReady=false }) => (
    <div className='image-list-container'>
        <div className="image-list">
            {images.map((value, index) => (
                <div key={index} style={{ position: "relative" }}
                >
                    <img
                        src={value.src}
                        alt=""
                        className="image-thumbnail "
                        onClick={() => onImageClick(value.src, index)}
                    />
                    {!value.isDone && (<div className='spinner' style={{ position:"absolute",left:"70px",top:"70px"}}></div>)}
                </div>
            ))}
        </div>
    </div>

);

export default ImageList;
