import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { HiPhone } from "react-icons/hi";
import axios from 'axios'
import styles from './Cardetail.module.css'
import {transformInteger} from './script.js';

export default function CarDetail(){

    const[data, setData] = useState([]);
    const {id} = useParams(); {/* esse useParams sabe que é pra pegar o ID que está na url */}

    useEffect(() => {
        axios.get(`http://localhost:8000/cars/${id}`)
        .then(response => {setData(response.data)})
        .catch(error => {console.log('Error: ', error)})
    }, [])
        
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.image}>
                    <img src={data.image} alt="" />
                </div>
                <div className={styles.title}>
                    <h2>{data.name} {data.made_year} {data.color}</h2>
                </div>
                <div className={styles.priceArea}>
                    {data.price && <div className={styles.price}> <h1>U$ {transformInteger(data.price)}</h1></div>}

                </div>

                <ul className={styles.listDetail}>
                    <li className={styles.km}>{data.km && <h3>Quilometragem: {transformInteger(data.km)}km</h3>}</li>
                    <hr />
                    <li className={styles.chassis}><h3>Chassis: {data.chassis}</h3></li>
                    <hr />
                    <li className={styles.store}><h3>Available in: {data.unit_name}</h3></li>
                    <hr />
                </ul>
                <div>
                    <button className={styles.button}><HiPhone style={{color: 'white', height: '35px', width: '20px'}} /><h4>Ligue já!</h4></button>
                </div>
            </div>
        </div>
    )
}

