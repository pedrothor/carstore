import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Units.module.css'

export default function Units() {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/units/')
        .then(response => {setData(response.data)})
        .catch(error => {console.log('Error: ', error)})
    }, [])
    
    return(
        <div className={styles.container}>
        <h2 className={styles.titulo}>Units</h2>
        <div className={styles.cardsContainer}>
          {data.map(item => (
            <div className={styles.card} key={item.id}>
              <img src={item.image} alt="Avatar" />
              <div className={styles.cardContent}>
                <h2>{item.name}</h2>
                <h3>{item.address}</h3>
                <h3>{item.city}, {item.state}</h3>
                <h3>Contact: {item.email}</h3>
                <h3>Phone: {item.phone_number}</h3>
                <h3>Manager: {item.person_responsible}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
