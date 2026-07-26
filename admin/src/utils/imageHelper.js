import { assets } from '../assets/assets';

export const getImageUrl = (image, backendUrl = 'http://localhost:4000') => {
    if (!image) return assets?.food_1 || '';

    // If it's a full URL, data URI or blob URL
    if (typeof image === 'string' && (image.startsWith('http') || image.startsWith('data:') || image.startsWith('blob:'))) {
        return image;
    }

    // If it's a named key inside assets object (e.g. "food_1", "header_img")
    if (typeof image === 'string' && assets && assets[image]) {
        return assets[image];
    }

    // If it's a filename uploaded to backend
    if (typeof image === 'string') {
        const cleanName = image.replace('/images/', '').replace('/uploads/', '');
        return `${backendUrl}/images/${cleanName}`;
    }

    return image;
};
