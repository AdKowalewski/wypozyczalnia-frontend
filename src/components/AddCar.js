import React, { useRef, useState } from 'react';
import CarService from '../services/CarService';
import 'bulma/css/bulma.min.css';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';

const AddCar = () => {

    const navigate = useNavigate();

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [isImage, setIsImage] = useState(false);
    const [price, setPrice] = useState('');

    const brandRef = useRef();
    const modelRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await CarService.createCar(brand, model, description, img, price);
            console.log(response);
            setBrand('');
            setModel('');
            setDescription('');
            setImg('');
            setPrice('');
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    // const encodeImage = (image) => {
    //     setImg(String(image));
    // };

    const getBase64 = (file) => {
        if (!file) setIsImage(false);
        else {
            setIsImage(true);
            let reader = new FileReader();
            let preview = document.getElementById('preview');
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader.result);
                const res = reader.result.split(',');
                preview.src = reader.result;
                setImg(res[1]);
            };
            reader.onerror = (error) => {
                console.log('Error: ', error);
            };
        }
    }

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='field'>
                    <label className='label' htmlFor="brand">Brand:</label>
                    <div className='control'>
                        <input
                            className='input'
                            type="text"
                            id="brand"
                            onChange={(e) => setBrand(e.target.value)}
                            ref={brandRef}
                            value={brand}
                            required
                            placeholder='Brand'
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label' htmlFor="model">Model:</label>
                    <div className='control'>
                        <input
                            className='input'
                            type="text"
                            id="model"
                            onChange={(e) => setModel(e.target.value)}
                            ref={modelRef}
                            value={model}
                            required
                            placeholder='Model'
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label' htmlFor="description">Description:</label>
                    <textarea
                        className='textarea'
                        cols='100'
                        rows='10'
                        type="text"
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                        ref={descriptionRef}
                        value={description}
                        required
                        placeholder='Description'
                    />
                </div>
                <div className='field'>
                    <label className='label' htmlFor="img">Image:</label>
                    <div className="file">
                        <label className="file-label">
                            <input 
                                required 
                                className="file-input" 
                                id="img" 
                                type="file" 
                                name="resume" 
                                onChange={(e) => getBase64(e.target.files[0])}/>
                            <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label">
                                    Choose a file…
                                </span>
                            </span>
                        </label>
                    </div>
                    <br/>
                    <img id='preview' className={isImage === false ? 'image-hidden' : 'image-shown'} src='#' alt='preview' />
                </div>
                <div className='field'>
                    <label className='label' htmlFor="price">Price:</label>
                    <div className='control'>
                        <input
                            className='input'
                            type="text"
                            id="price"
                            onChange={(e) => setPrice(e.target.value)}
                            ref={priceRef}
                            value={price}
                            required
                            placeholder='Price'
                        />
                    </div>
                </div>
                <br/>
                <button className='button is-primary' type='submit'>Add new car</button>
            </form>
            <br/>
            <button onClick={handleCancel}>Go back</button>
        </div>
    );
};

export default AddCar;