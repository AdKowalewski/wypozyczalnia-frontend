import React, { useRef, useEffect, useState } from 'react';
import CarService from '../services/CarService';
import 'bulma/css/bulma.min.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditCar = () => {

    //const API_URL = "http://127.0.0.1:8000/";
    let preview = document.getElementById('preview');
    let reader = new FileReader();

    const navigate = useNavigate();
    const { car_id } = useParams();

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [isImage, setIsImage] = useState(true);
    const [img, setImg] = useState('');
    const [price, setPrice] = useState('');

    const brandRef = useRef();
    const modelRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();

    useEffect(() => {
        CarService.getCarById(car_id).then((res) => {
            console.log(res.data);
            setImg(res.data.img);
            //reader.readAsDataURL(API_URL + res.data.img);
            reader.onload = () => {
                preview.src = reader.result;
            }
            setBrand(res.data.brand);
            setModel(res.data.model);
            setDescription(res.data.description);
            setPrice(res.data.price);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await CarService.editCar(brand, model, description, img, price);
            console.log(JSON.stringify(response.data));
            setBrand(brand);
            setModel(model);
            setDescription(description);
            setImg(img);
            setPrice(price);
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    };

    // const encodeImage = (image) => {
    //     setImg(image);
    // };

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
                preview.src = reader.result;
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
                    {/* <FileBase64 multiple={ false } onDone={encodeImage} /> */}
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
                <button type='submit'>Edit car</button>
            </form>
            <br/>
            <button onClick={handleCancel}>Go back</button>
        </div>
    );
};

export default EditCar;