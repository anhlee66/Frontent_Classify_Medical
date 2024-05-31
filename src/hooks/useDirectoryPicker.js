import { useState } from 'react';

const useDirectoryPicker = () => {
    const [images, setImages] = useState([]);
    const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);

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
            setIsDirectoryOpen(true);
        } catch (error) {
            console.error('Error accessing directory: ', error);
        }
    };

    return { images, isDirectoryOpen, handleDirectoryOpen };
};

export default useDirectoryPicker;
