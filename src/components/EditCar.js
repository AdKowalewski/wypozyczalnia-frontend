import React, { useRef, useEffect, useState } from 'react';
import CarService from '../services/CarService';
import { useNavigate, useParams } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import '../css/style.css';

const EditCar = () => {

    const API_URL = "http://127.0.0.1:8000/";
    let reader = new FileReader();

    const navigate = useNavigate();
    const { car_id } = useParams();

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [isImage, setIsImage] = useState(true);
    const [img, setImg] = useState('');
    const [price, setPrice] = useState('');
    const [previewSrc, setPreviewSrc] = useState('');

    const [isImgChanged, setIsImgChanged] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const brandRef = useRef();
    const modelRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();

    useEffect(() => {
        CarService.getCarById(car_id).then((res) => {
            console.log(res.data);
            setImg(res.data.img);
            setPreviewSrc(API_URL + res.data.img);
            setBrand(res.data.brand);
            setModel(res.data.model);
            setDescription(res.data.description);
            setPrice(res.data.price);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isImgChanged) {
                const response = await CarService.editCar(car_id, brand, model, description, img, price);
                console.log(JSON.stringify(response.data));
                setBrand(brand);
                setModel(model);
                setDescription(description);
                setImg(img);
                setPrice(price);
                navigate(-1);
            } else {
                const response = await CarService.editCar(car_id, brand, model, description, '', price);
                console.log(JSON.stringify(response.data));
                setBrand(brand);
                setModel(model);
                setDescription(description);
                setImg(img);
                setPrice(price);
                navigate(-1);
            }
        } catch (err) {
            console.log(err);
            setErrMsg('Error - could not edit car due to invalid data!');
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const getBase64 = (file) => {
        if (!file) setIsImage(false);
        else {
            setIsImage(true);
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader.result);
                const res = reader.result.split(',');
                setPreviewSrc(reader.result);
                setImg(res[1]);
            };
            reader.onerror = (error) => {
                console.log('Error: ', error);
            };
        }
    }

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
                                className="file-input" 
                                id="img" 
                                type="file" 
                                name="resume" 
                                onChange={(e) => {getBase64(e.target.files[0]); setIsImgChanged(true)}}/>
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
                    <img id='preview' className={isImage === false ? 'image-hidden' : 'image-shown'} src={previewSrc} alt='preview' />
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
                <button className='button is-primary' type='submit'>Edit car</button>
                <br/>
                {<div><h2 style={errMsg ? {color: 'red', fontWeight: 'bold'} : {display: 'none'}}>{errMsg}</h2></div>}
            </form>
            <br/>
            <a onClick={handleCancel}>Go back</a>
        </div>
    );
};

export default EditCar;