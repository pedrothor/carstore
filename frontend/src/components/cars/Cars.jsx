import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Cars.module.css'
import { transformInteger, toTitle } from './script.js';
import '@radix-ui/themes/styles.css';
import { Flex, Button, Inset, Text, Dialog, TextField, Select, Heading } from '@radix-ui/themes';
import { PlusIcon, CheckIcon, Cross2Icon, Pencil2Icon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Card } from 'react-bootstrap';


export default function Cars() {
  const endpoint = `${import.meta.env.VITE_API_URL}/cars/`
  const [data, setData] = useState([]);
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();
  
  // informações
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [km, setKm] = useState('');
  const [unit, setUnit] = useState(1);
  const [chassis, setChassis] = useState('');
  const [price, setPrice] = useState('');

  // encapsulando o id do hovered item
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const endpointUpdateDelete = `http://localhost:8000/cars/${hoveredItemId}/`

  // manipulando o hover de cada card
  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  // GET cars
  useEffect(() => {
    axios.get('http://localhost:8000/cars/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  // GET units
  useEffect(() => {
    axios.get('http://localhost:8000/units')
      .then(resp => { setUnits(resp.data) })
      .catch((err) => console.log(`Error: ${err}`))
  }, [])


  // POST
  const PostCar = async () => {
    let formField = new FormData()

    formField.append('name', name)
    formField.append('year', year)
    formField.append('color', color)
    formField.append('km', km)
    formField.append('unit', unit)
    formField.append('chassis', chassis)
    formField.append('price', price)

    if (image !== null) {
      formField.append('image', image)
    }

    await axios({
      method: 'POST',
      url: endpoint,
      data: formField
    }).then((resp) => {
      console.log(resp.data);
    })
    navigate('/')
  }

  
  // UPDATE
  let formUpdate = new FormData();

  const UpdateCar = async () => {
    
    await axios({
      method: 'PATCH',
      url: endpointUpdateDelete,
      data: formUpdate,
    })
      .catch(err => console.log(err))
  }

  // DELETE

  const DeleteCar = () => {
    axios({
      method: 'DELETE',
      url: endpointUpdateDelete,
    })
  }

  return (
    <div className={styles.carsPage}>
      <div className={styles.header}>
        <Heading style={{ color: 'white', marginBottom: 12 }}>Available cars</Heading>
      </div>

      {/* ADD AREA */}
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="outline" color="green" style={{ marginLeft: 15, cursor: 'pointer', display: 'flex', margin: '0 auto', color: 'green', }}>
            <PlusIcon width="16" height="16" style={{ color: 'green' }} /> New Car
          </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Add a car for sale</Dialog.Title>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Input
                defaultValue=""
                placeholder="Enter car name"
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Year
              </Text>
              <TextField.Input
                defaultValue=""
                placeholder="Car's year"
                maxLength={4}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Color
              </Text>
              <TextField.Input
                defaultValue=""
                placeholder="Car's color"
                maxLength={15}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Milage
              </Text>
              <TextField.Input
                defaultValue=""
                placeholder="Enter value in km"
                maxLength={7}
                value={km}
                onChange={(e) => setKm(e.target.value)}
              />
            </label>

            {/* SELECT */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Unit
              </Text>
              <Select.Root defaultValue='mogi das cruzes orm'>
                <Select.Trigger />
                <Select.Content position="popper" value={unit} onChange={(e) => setUnit(e.target.value)}>
                  {units.map(element => <Select.Item value={element.name.toLowerCase()} key={element.id}>{element.name}</Select.Item>)}
                </Select.Content>
              </Select.Root>
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Chassis
              </Text>
              <TextField.Input
                defaultValue=""
                placeholder="Chassis number"
                maxLength={17}
                value={chassis}
                onChange={(e) => setChassis(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Price
              </Text>
              <TextField.Input
                defaultValue=""
                placeholder="Type price (numbers only)"
                maxLength={7}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <Text as="div" size="2" weight="bold">
              Image
            </Text>
            <input id="image" type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" style={{ cursor: 'pointer' }}>
                <Cross2Icon></Cross2Icon> Cancel
              </Button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <Button color="green" variant="soft" style={{ cursor: 'pointer' }} type='submit' onClick={PostCar}><CheckIcon></CheckIcon>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      {/* CARDS */}
      <Flex justify='center' p='4' wrap='wrap' gap="5">
        {data.map(item => (
          <Card key={item.id} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave} style={{ width: 300, position: 'relative' }}>
            <Inset style={{
              background: '#1c202c',
              boxShadow: '5px 4px 5px #3E435D',
              textAlign: 'center',
              minHeight: 330,
              maxHeight: 330,
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>

              {hoveredItemId === item.id && (
                <div className={styles.editArea} style={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  display: hoveredItemId ? 'block' : 'none',
                  borderRadius: '0px 0px 2px 2px',
                  overflow: 'hidden',
                  position: 'absolute',
                  top: 0,
                  bottom: 300,
                  left: 0,
                  right: 0,
                }}>

                  <div style={{ display: 'flex', gap: 20, position: 'absolute', right: '10px', top: '5px' }}>

                    {/* UPDATE AREA */}
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <Pencil2Icon variant='solid' color='white' style={{ cursor: 'pointer' }}></Pencil2Icon>
                      </Dialog.Trigger>
                      <Dialog.Content style={{ maxWidth: 450 }}>
                        <Dialog.Title>Edit car information</Dialog.Title>
                        <Dialog.Description size="2" mb="4">
                          Section to edit any information about the car
                        </Dialog.Description>
                        <Flex direction="column" gap="3">
                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Name
                            </Text>
                            <TextField.Input
                              id='nameUpdate'
                              defaultValue={item.name}
                              placeholder="Enter car name"
                              maxLength={20}
                              onChange={(e) => formUpdate.append('name', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Year
                            </Text>
                            <TextField.Input
                              id='yearUpdate'
                              defaultValue={item.year}
                              placeholder="Car's year"
                              maxLength={4}
                              onChange={(e) => formUpdate.append('year', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Color
                            </Text>
                            <TextField.Input
                              id='colorUpdate'
                              defaultValue={item.color}
                              placeholder="Car's color"
                              maxLength={15}
                              onChange={(e) => formUpdate.append('color', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Milage
                            </Text>
                            <TextField.Input
                              id='kmUpdate'
                              defaultValue={item.km}
                              placeholder="Enter value in km"
                              maxLength={7}
                              onChange={(e) => formUpdate.append('km', e.target.value)}
                            />
                          </label>

                          {/* UNIT SELECT */}
                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Unit
                            </Text>
                            <Select.Root>
                              <Select.Trigger placeholder={item.unit_name} />
                              <Select.Content >
                                {units.map(element => (
                                  <div style={{ background: 'transparent' }} id={element.id} onMouseDown={() => formUpdate.append('unit_name', document.getElementById(element.id).id)} key={element.id}>
                                    <Select.Item id={element.id} value={element.id}>
                                      {element.name}
                                    </Select.Item>
                                  </div>
                                ))}
                              </Select.Content>
                            </Select.Root>
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Chassis
                            </Text>
                            <TextField.Input
                              id='chassisUpdate'
                              defaultValue={item.chassis}
                              placeholder="Chassis number"
                              maxLength={17}
                              onChange={(e) => formUpdate.append('chassis', e.target.value)}
                            />
                          </label>
                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Price
                            </Text>
                            <TextField.Input
                              id='priceUpdate'
                              defaultValue={item.price}
                              placeholder="Price without cents"
                              maxLength={7}
                              onChange={(e) => formUpdate.append('price', e.target.value)}
                            />
                          </label>
                          <Text as="div" size="2" weight="bold">
                            Image
                          </Text>
                          <img src={item.image} alt="Car Image" style={{ maxWidth: '70px', maxHeight: '50px', marginBottom: '10px' }} />
                          <input type="file" id="imageUpdate" onChange={(e) => formUpdate.append('image', e.target.files[0])} />
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                          <Dialog.Close>
                            <Button variant="outline" color="gray" style={{ cursor: 'pointer' }}>
                              <Cross2Icon></Cross2Icon> Cancel
                            </Button>
                          </Dialog.Close>

                          <Dialog.Close asChild>
                            <Button color="green" variant="soft" style={{ cursor: 'pointer' }} type='submit' onClick={UpdateCar}><CheckIcon></CheckIcon>Update</Button>
                          </Dialog.Close>
                        </Flex>
                      </Dialog.Content>
                    </Dialog.Root>

                    {/* DELETE AREA */}
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Cross2Icon color='white' style={{ cursor: 'pointer' }}></Cross2Icon>
                      </Dialog.Trigger>

                      <Dialog.Content style={{ maxWidth: 450, display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column' }}>
                        <Dialog.Title>Delete car</Dialog.Title>
                        <Dialog.Description size="2" mb="4">
                          Are you sure want to delete '{toTitle(item.name)}' from the portfolio?
                        </Dialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <Dialog.Close>
                            <Button variant="outline" color="gray">
                              Cancel
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button variant='solid' color='red' onClick={DeleteCar}>Delete</Button>
                          </Dialog.Close>
                        </Flex>
                      </Dialog.Content>
                    </Dialog.Root>
                  </div>
                </div>
              )}

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  margin: '0 auto',
                  objectFit: 'cover',
                  height: 150,
                  width: 300,
                }}
              />

              {/* CAR NAME */}
              <div style={{
                position: 'absolute', // Define o posicionamento absoluto para facilitar o posicionamento preciso dos elementos filhos
                top: '48%',
                paddingLeft: 15,
                paddingRight: 15,
                color: 'white',
              }}>
                <Text size="3">
                  <Heading size='6'>{toTitle(item.name)} {item.year}</Heading>
                </Text>
              </div>

              {/* KM e UNIT NAME */}
              <div style={{
                position: 'absolute',
                top: 'calc(45% + 80px)', // Centraliza verticalmente e adiciona 10px
                color: 'white',
              }}>
                <Text size='2'>
                  <Heading size='4'> Milage: {transformInteger(item.km)} km</Heading>
                </Text>
                <Text>
                  <Heading size='4'> Store: {item.unit_name}</Heading>
                </Text>
              </div>

              {/* PRICE */}
              <div style={{
                position: 'absolute',
                top: 'calc(50% + 80px + 40px)',
                color: 'green',
              }}>
                <Text size='4'>
                  <Heading size='7'>U$ {transformInteger(item.price)}</Heading>
                </Text>
              </div>
            </Inset>
          </Card>
        ))}
      </Flex>
    </div>
  );
}
