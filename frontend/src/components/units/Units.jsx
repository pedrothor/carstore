import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@radix-ui/themes/styles.css';
import { Flex, Button, Inset, Text, Dialog, TextField, Heading, TextArea, RadioGroup } from '@radix-ui/themes';
import { PlusIcon, CheckIcon, Cross2Icon, Pencil2Icon } from '@radix-ui/react-icons'
import { Card } from 'react-bootstrap';
import styles from './Units.module.css'


export default function Units() {

  const [data, setData] = useState([]);
  const endpoint = 'http://localhost:8000/units/'

  // encapsulando o id do item hovered
  const [hoveredItemId, setHoveredItemId] = useState(null);

  // manipulando o hover de cada card
  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/units/')
      .then(response => { setData(response.data) })
      .catch(error => { console.log('Error: ', error) })
  }, [])

  const navigate = useNavigate();

  // INFO
  const [name, setName] = useState();
  const [register, setRegister] = useState();
  const [founded, setFounded] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [personResponsible, setPersonResponsible] = useState();
  const [active, setActive] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState(null);

  // POST
  const PostUnit = async () => {

    let formField = new FormData()
    formField.append('name', name)
    formField.append('register', register)
    formField.append('founded_at', founded)
    formField.append('address', address)
    formField.append('city', city)
    formField.append('state', state)
    formField.append('email', email)
    formField.append('phone_number', phoneNumber)
    formField.append('person_responsible', personResponsible)
    formField.append('active', active)
    formField.append('description', description)

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

    navigate('/units')
  }

  let updateFormField = new FormData()
  // PUT (UPDATE)
  const UpdateUnit = async () => {

    await axios({
      method: 'PATCH',
      url: `http://localhost:8000/units/${hoveredItemId}/`,
      data: updateFormField
    }).catch(err => console.log(err))

    navigate('/units')
  }


  const deleteUnit = async () => {
    await axios({
      method: 'DELETE',
      url: `http://localhost:8000/units/${hoveredItemId}/`,
    })
  }

  return (
    <div className={styles.carsPage}>
      <div className={styles.header}>
        <Heading style={{ color: 'white', marginBottom: 12 }}>All units</Heading>
      </div>

      {/* Add unit area */}
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="outline" color="green" style={{ marginLeft: 15, cursor: 'pointer', display: 'flex', margin: '0 auto', color: 'green', }}>
            <PlusIcon width="16" height="16" style={{ color: 'green' }} /> New Unit
          </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Add a unit</Dialog.Title>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Unit name *
              </Text>
              <TextField.Input
                placeholder="Unit name"
                maxLength={20}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Register *
              </Text>
              <TextField.Input
                placeholder="Enter the register number"
                maxLength={20}
                onChange={(e) => setRegister(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Founded at *
              </Text>
              <TextField.Input
                placeholder="yyyy-mm-dd"
                maxLength={10}
                onKeyUp={(e) => {
                  let len = e.target.value.length
                  if (len == 4 || len == 7) {
                    e.target.value += '-'
                  }
                }}
                onChange={(e) => setFounded(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Address *
              </Text>
              <TextField.Input
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                City *
              </Text>
              <TextField.Input
                placeholder="City"
                maxLength={20}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                State *
              </Text>
              <TextField.Input
                placeholder="State"
                maxLength={7}
                onChange={(e) => setState(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email *
              </Text>
              <TextField.Input
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Phone *
              </Text>
              <TextField.Input
                placeholder="Phone"
                maxLength={17}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Manager *
              </Text>
              <TextField.Input
                placeholder="Manager"
                maxLength={7}
                onChange={(e) => setPersonResponsible(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextArea size="1" placeholder="Enter some important description..." onChange={(e) => setDescription(e.target.value)} />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Active *
              </Text>
            </label>
            <RadioGroup.Root defaultValue="Yes" onChange={(e) => setActive(e.target.value[0])}>
              <Flex gap="2">
                <RadioGroup.Item value="Yes" /> Yes
                <RadioGroup.Item value="No" /> No
              </Flex>
            </RadioGroup.Root>

            <Text as="div" size="2" weight="bold">
              Image *
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
              <Button color="green" variant="soft" style={{ cursor: 'pointer' }} onClick={PostUnit} type='submit'><CheckIcon></CheckIcon>Add Unit</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      {/* cards */}
      <Flex justify='center' p='4' wrap='wrap' gap="5">
        {data.map(item => (
          <Card key={item.id} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave} style={{ width: 300, position: 'relative' }}>
            <Inset style={{
              background: '#1c202c',
              boxShadow: '5px 4px 10px #3E435D',
              textAlign: 'center',
              minHeight: 400,
              maxHeight: 400,
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
                  bottom: 370,
                  left: 0,
                  right: 0,
                }}>
                  <div style={{ display: 'flex', gap: 20, position: 'absolute', right: '10px', top: '5px' }}>

                    {/* EDIT AREA */}
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <Pencil2Icon variant='solid' color='white' style={{ cursor: 'pointer' }}></Pencil2Icon>
                      </Dialog.Trigger>
                      <Dialog.Content style={{ maxWidth: 450 }}>
                        <Dialog.Title>Edit employee information</Dialog.Title>
                        <Dialog.Description size="2" mb="4">
                          Section to edit any information about the unit
                        </Dialog.Description>
                        <Flex direction="column" gap="3">
                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Unit name
                            </Text>
                            <TextField.Input
                              id='nameUpdate'
                              defaultValue={item.name}
                              placeholder="Enter unit name"
                              maxLength={20}
                              onChange={(e) => updateFormField.append('name', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Register
                            </Text>
                            <TextField.Input
                              id='registerUpdate'
                              defaultValue={item.register}
                              placeholder="Register number"
                              maxLength={4}
                              onChange={(e) => updateFormField.append('register', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Founded at
                            </Text>
                            <TextField.Input
                              id='foundedUpdate'
                              defaultValue={item.founded_at}
                              placeholder="Date of foundation"
                              maxLength={15}
                              onKeyUp={(e) => {
                                let len = e.target.value.length
                                if (len == 4 || len == 7) {
                                  e.target.value += '-'
                                }
                              }}
                              onChange={(e) => updateFormField.append('founded_at', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Address
                            </Text>
                            <TextField.Input
                              id='addressUpdate'
                              defaultValue={item.address}
                              placeholder="Enter the address"
                              maxLength={7}
                              onChange={(e) => updateFormField.append('address', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              City
                            </Text>
                            <TextField.Input
                              id='cityUpdate'
                              defaultValue={item.city}
                              placeholder="Enter the city"
                              maxLength={7}
                              onChange={(e) => updateFormField.append('city', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              State
                            </Text>
                            <TextField.Input
                              id='stateUpdate'
                              defaultValue={item.state}
                              placeholder="Enter the state"
                              maxLength={7}
                              onChange={(e) => updateFormField.append('state', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Email
                            </Text>
                            <TextField.Input
                              placeholder='Person Email'
                              defaultValue={item.email}
                              onChange={(e) => updateFormField.append('email', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Phone
                            </Text>
                            <TextField.Input
                              id='phoneUpdate'
                              defaultValue={item.phone_number}
                              placeholder="Phone"
                              maxLength={17}
                              onChange={(e) => updateFormField.append('phone_number', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Manager
                            </Text>
                            <TextField.Input
                              id='managerUpdate'
                              defaultValue={item.person_responsible}
                              placeholder="Person responsible"
                              maxLength={7}
                              onChange={(e) => updateFormField.append('person_responsible', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Description
                            </Text>
                            <TextArea defaultValue={item.description} size="1" placeholder="Enter some important description..."
                              onChange={(e) => updateFormField.append('description', e.target.value)} />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Active
                            </Text>
                          </label>

                          <RadioGroup.Root defaultValue={item.active}>
                            <Flex gap="2">
                              <RadioGroup.Item onClick={(e) => updateFormField.append('active', e.target.value)} value="Yes" /> Yes
                              <RadioGroup.Item onClick={(e) => updateFormField.append('active', e.target.value)} value="No" /> No
                            </Flex>
                          </RadioGroup.Root>

                          <Text as="div" size="2" weight="bold">
                            Image
                          </Text>
                          <img src={item.image} alt="Car Image" style={{ maxWidth: '70px', maxHeight: '50px', marginBottom: '10px' }} />
                          <input type="file" id="imageUpdate" onChange={(e) => updateFormField.append('image', e.target.files[0])} />
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                          <Dialog.Close>
                            <Button variant="outline" color="gray" style={{ cursor: 'pointer' }}>
                              <Cross2Icon></Cross2Icon> Cancel
                            </Button>
                          </Dialog.Close>

                          <Dialog.Close asChild>
                            <Button color="green" variant="soft" style={{ cursor: 'pointer' }} onClick={UpdateUnit} type='submit'><CheckIcon></CheckIcon>Update</Button>
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
                          Are you sure want to delete '{item.name}' from the portfolio?
                        </Dialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <Dialog.Close>
                            <Button variant="outline" color="gray">
                              Cancel
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button variant='solid' color='red' onClick={deleteUnit}>Delete</Button>
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

              {/* UNIT NAME */}
              <div style={{
                position: 'absolute', // Define o posicionamento absoluto para facilitar o posicionamento preciso dos elementos filhos
                top: 'calc(150px + 20px)', // 150px (altura da imagem) + 20px abaixo dela
                paddingLeft: 15,
                paddingRight: 15,
                color: 'white',
              }}>
                <Text size="3">
                  <Heading size='6'>{item.name}</Heading>
                </Text>
              </div>

              <div style={{
                position: 'absolute',
                top: 'calc(180px + 30px)', // 180px(nome da unit) + 30px
                color: 'white',
              }}>
                <Text size="3">
                  <Heading size='3'>{item.address[0].toUpperCase() + item.address.slice(1)}</Heading>
                </Text>
              </div>

              {/* CITY STATE */}
              <div style={{
                position: 'absolute',
                top: 'calc(210px + 30px)', // 210px(endereço) + 30px
                color: 'white',
              }}>
                <Text size='3'>
                  <Heading size='3'>{item.city}, {item.state}</Heading>
                </Text>
              </div>

              {/* EMAIL */}
              <div style={{
                position: 'absolute',
                top: 'calc(240px + 30px)',
                color: 'white',
              }}>
                <Text size='4'>
                  <Heading size='4'>{item.email}</Heading>
                </Text>
              </div>

              {/* PERSON RESPONSIBLE */}
              <div style={{
                position: 'absolute',
                top: 'calc(270px + 30px)',
                color: 'white',
              }}>
                <Text size='4'>
                  <Heading size='5'>Gerente: {item.person_responsible}</Heading>
                </Text>
              </div>

              {/* PHONE */}
              <div style={{
                position: 'absolute',
                top: 'calc(300px + 30px)',
                color: 'green',
              }}>
                <Text size='4'>
                  <Heading size='5'>{'(' + item.phone_number.slice(0, 2) + ') ' + item.phone_number.slice(2, 6) + '-' + item.phone_number.slice(6)}</Heading>
                </Text>
              </div>
            </Inset>
          </Card>
        ))}
      </Flex>
    </div>
  );
}
