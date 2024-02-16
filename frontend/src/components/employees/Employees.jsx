import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Employees.module.css'

export default function Employees() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/employees/')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
          });
    }, []);
    return (
        <div className={styles.container}>
          <h2 className={styles.titulo}>Employees</h2>
          <div className={styles.cardsContainer}>
            {data.map(item => (
              <div className={styles.card} key={item.id}>
                <img src={item.image} alt="Avatar" />
                <div className={styles.cardContent}>
                  <h2>{item.first_name} {item.last_name}</h2>
                  <h3></h3>
                  <h3>{item.birth_modified}</h3>
                  <h3>{item.unit_name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}
