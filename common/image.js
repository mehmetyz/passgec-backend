const axios = require('axios');
const FormData = require('form-data');
const { IMAGE_API_URL } = require('./constants');




const uploadImage = async (image) => {

    const formData = new FormData();
    formData.append('source', image);

    try {
        const response = await axios.post(IMAGE_API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        });
    
        return response.data;
    } catch (error) {
        console.log(error);
        return "https://iili.io/U5nwwg.png";
    }
}

module.exports = {
    uploadImage
}