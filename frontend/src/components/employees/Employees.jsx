import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@radix-ui/themes/styles.css';
import { Flex, Button, Inset, Text, Dialog, TextField, Select, Heading } from '@radix-ui/themes';
import { PlusIcon, CheckIcon, Cross2Icon, Pencil2Icon } from '@radix-ui/react-icons'
import { Card } from 'react-bootstrap';
import styles from './Employees.module.css'
import convertToTitle from './scriptsEmployees'

export default function Employees() {
  const [data, setData] = useState([]);
  const [units, setUnits] = useState([]);

  // civil status
  const civilStatusList = [
    'Single',
    'Married',
    'Divorced',
    'Widowed',
    'Engaged',
    'Common-law marriage'
  ]

  useEffect(() => {
    axios.get('http://localhost:8000/employees/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/units')
      .then(resp => setUnits(resp.data))
      .catch((err) => console.log(`Error: ${err}`))
  }, [])

  const endpoint = 'http://localhost:8000/employees/'

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

  // INFO
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [birth, setBirth] = useState();
  const [unit, setUnit] = useState(1);
  const [address, setAddress] = useState();
  const [civilStatus, setCivilStatus] = useState();
  const [image, setImage] = useState(null);

  // POST
  const PostEmployee = async () => {

    let formField = new FormData()
    formField.append('first_name', firstName)
    formField.append('last_name', lastName)
    formField.append('birth', birth)
    formField.append('unit', unit)
    formField.append('address', address)
    formField.append('civil_status', civilStatus)
    formField.append('image', image)

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
  }

  let updateFormField = new FormData()

  // UPDATE
  const UpdateEmployee = async () => {

    await axios({
      method: 'PATCH',
      url: `http://localhost:8000/employees/${hoveredItemId}/`,
      data: updateFormField
    }).catch(err => console.log(err))
  }


  const DeleteEmployee = async () => {
    await axios({
      method: 'DELETE',
      url: `http://localhost:8000/employees/${hoveredItemId}/`,
    })
  }

  return (
    <div className={styles.carsPage}>
      <div className={styles.header}>
        <Heading style={{ color: 'white', marginBottom: 12 }}>All Employees</Heading>
      </div>

      {/* ADD AREA */}
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="outline" color="green" style={{ marginLeft: 15, cursor: 'pointer', display: 'flex', margin: '0 auto', color: 'green', }}>
            <PlusIcon width="16" height="16" style={{ color: 'green' }} /> New Employee
          </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Add an employee</Dialog.Title>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                First name *
              </Text>
              <TextField.Input
                placeholder="First name"
                maxLength={20}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Last name *
              </Text>
              <TextField.Input
                placeholder="Last name"
                maxLength={20}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Birth *
              </Text>
              <TextField.Input
                placeholder="dd/mm/yyyy"
                maxLength={20}
                onKeyUp={(e) => {
                  let len = e.target.value.length
                  if (len == 2 || len == 5) {
                    e.target.value += '/'
                  }
                }}
                onChange={(e) => setBirth(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Address *
              </Text>
              <TextField.Input
                placeholder="avenue, nº, city - UF"
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>

            {/* UNIT SELECT */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Unit *
              </Text>
              <Select.Root defaultValue={1}>
                <Select.Trigger style={{ width: '120px' }} />
                <Select.Content position="popper">
                  {units.map(element => <Select.Item onMouseDown={() => setUnit(element.id)} value={element.id} key={element.id}>
                    {element.name}
                  </Select.Item>)}
                </Select.Content>
              </Select.Root>
            </label>

            {/* CIVIL STATUS SELECT */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Civil status *
              </Text>
              <Select.Root defaultValue={civilStatusList[0].toLowerCase()}>
                <Select.Trigger style={{ width: '120px' }} />
                <Select.Content position="popper">
                  {civilStatusList.map(element =>
                    <Select.Item onMouseDown={() => setCivilStatus(element.toLowerCase())} key={civilStatusList.indexOf(element)} value={element.toLowerCase()}>
                      {element}
                    </Select.Item>)}
                </Select.Content>
              </Select.Root>
            </label>

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
              <Button color="green" variant="soft" style={{ cursor: 'pointer' }} onClick={PostEmployee} type='submit'><CheckIcon></CheckIcon>Add Employee</Button>
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
                          Section to edit any information about the employee
                        </Dialog.Description>
                        <Flex direction="column" gap="3">
                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              First name
                            </Text>
                            <TextField.Input
                              placeholder="First name"
                              defaultValue={item.first_name}
                              maxLength={20}
                              onChange={(e) => updateFormField.append('first_name', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Last name
                            </Text>
                            <TextField.Input
                              placeholder="Last name"
                              defaultValue={item.last_name}
                              maxLength={20}
                              onChange={(e) => updateFormField.append('last_name', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Birth
                            </Text>
                            <TextField.Input
                              placeholder="dd/mm/yyyy"
                              defaultValue={item.birth_modified}
                              maxLength={20}
                              onKeyUp={(e) => {
                                let len = e.target.value.length
                                if (len == 2 || len == 5) {
                                  e.target.value += '/'
                                }
                              }}
                              onChange={(e) => updateFormField.append('birth', e.target.value)}
                            />
                          </label>

                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Address
                            </Text>
                            <TextField.Input
                              placeholder="Address"
                              defaultValue={item.address}
                              onChange={(e) => updateFormField.append('address', e.target.value)}
                            />
                          </label>

                          {/* UNIT SELECT */}
                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Unit
                            </Text>
                            <Select.Root defaultValue='suzano orm'>
                              <Select.Trigger style={{ width: '120px' }} />
                              <Select.Content position="popper" value={unit}>
                                {units.map(element =>
                                  <Select.Item onMouseDown={() => updateFormField.append('unit', element.id)} value={element.name.toLowerCase()} key={element.id}>
                                    {element.name}
                                  </Select.Item>)}
                              </Select.Content>
                            </Select.Root>
                          </label>

                          {/* CIVIL STATUS SELECT */}
                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Civil status *
                            </Text>
                            <Select.Root defaultValue={item.civil_status}>
                              <Select.Trigger style={{ width: '120px' }} />
                              <Select.Content position="popper">
                                {civilStatusList.map(element =>
                                  <Select.Item onMouseDown={() => updateFormField.append('civil_status', element.toLowerCase())} value={element.toLowerCase()} key={civilStatusList.indexOf(element)}>
                                    {element}
                                  </Select.Item>)}
                              </Select.Content>
                            </Select.Root>
                          </label>

                          <Text as="div" size="2" weight="bold">
                            Image *
                          </Text>
                          <input id="image" type="file" onChange={(e) => updateFormField.append('image', e.target.files[0])} />
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                          <Dialog.Close>
                            <Button variant="outline" color="gray" style={{ cursor: 'pointer' }}>
                              <Cross2Icon></Cross2Icon> Cancel
                            </Button>
                          </Dialog.Close>

                          <Dialog.Close asChild>
                            <Button color="green" variant="soft" style={{ cursor: 'pointer' }} onClick={UpdateEmployee} type='submit'><CheckIcon></CheckIcon>Update</Button>
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
                          Are you sure want to delete '{item.first_name + ' ' + item.last_name}' from the portfolio?
                        </Dialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <Dialog.Close>
                            <Button variant="outline" color="gray">
                              Cancel
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button variant='solid' color='red' onClick={DeleteEmployee}>Delete</Button>
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
                  height: 200,
                  width: 300,
                }}
              />

              {/* NAME */}
              <div style={{
                position: 'absolute', // Define o posicionamento absoluto para facilitar o posicionamento preciso dos elementos filhos
                top: 'calc(200px + 10px)', // 150px (altura da imagem) + 20px abaixo dela
                paddingLeft: 15,
                paddingRight: 15,
                color: 'white',
              }}>
                <Text size="6">
                  <Heading size='6'>{convertToTitle(item.first_name)} {convertToTitle(item.last_name)}</Heading>
                </Text>
              </div>

              {/* BIRTH */}
              <div style={{
                position: 'absolute',
                top: 'calc(210px + 30px)', // 180px(nome da unit) + 30px
                color: 'white',
              }}>
                <Text size="4">
                  <Heading size='4'>{item.birth_modified}</Heading>
                </Text>
              </div>

              {/* UNIT */}
              <div style={{
                position: 'absolute',
                top: 'calc(240px + 30px)', // 210px(endereço) + 30px
                color: 'white',
              }}>
                <Text size='4'>
                  <Heading size='4'>Unit: {item.unit_name}</Heading>
                </Text>
              </div>

              {/* CIVIL STATUS */}
              <div style={{
                position: 'absolute',
                top: 'calc(270px + 30px)',
                color: 'white',
              }}>
                <Text size='4'>
                  <Heading size='4'>Civil status: {convertToTitle(item.civil_status)}</Heading>
                </Text>
              </div>

              {/* ADDRESS */}
              <div style={{
                position: 'absolute',
                top: 'calc(300px + 30px)',
                color: 'white',
              }}>
                <Text size='4'>
                  <Heading size='4'>{convertToTitle(item.address.split(',')[0]) + ', ' + item.address.split(',')[1]}</Heading>
                </Text>
              </div>

              <div style={{
                position: 'absolute',
                top: 'calc(330px + 25px)',
                color: 'white',
              }}>
                <Text size='4'>
                  <Heading size='4'>{item.address.split(',')[2]}</Heading>
                </Text>
              </div>
            </Inset>
          </Card>
        ))}

      </Flex>
    </div>
  );
}