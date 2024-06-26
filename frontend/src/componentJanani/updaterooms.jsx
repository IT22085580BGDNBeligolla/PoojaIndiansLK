import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './updaterooms.css'

function UpdateRooms() {
  const { id } = useParams();
  const [updaterooms, setupdateroooms] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    quentity_rooms: "",
    quentity_people: "",
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5500/rooms/rooms/${id}`);
        const data = await response.json();
        console.log(data);

        if (data.success) {
          setupdateroooms(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]); // Include 'id' in the dependency array


  const handleInputChange = (e) => {
    setupdateroooms({
      ...updaterooms,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5500/rooms/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updaterooms._id,
          ...updaterooms,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('User updated successfully');
        alert("updated successfully");

      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  return (
    <div className='rooms-update'>
      <h2>Update Details</h2>

      <label>Name:</label>
      <input type="text" id="name" name="name" onChange={handleInputChange} value={updaterooms?.name} /><br></br>
      <label>Phone Number:</label>
      <input type="number" id="phone" name="phone" onChange={handleInputChange} value={updaterooms?.phone} /><br></br>
      <label>Email:</label>
      <input type="email" id="email" name="email" onChange={handleInputChange} value={updaterooms?.email} /><br></br>
      <label>Date:</label>
      <input type="date" id="date" name="date" onChange={handleInputChange} value={updaterooms?.date} /><br></br>
      <label>Quantity:</label>
      <input type="number" min="1" max="10" id="quentity_rooms" name="quentity_rooms" onChange={handleInputChange} value={updaterooms?.quentity_rooms} /><br></br>
      <label>Number of Guests:</label>
      <input type="number" min="1" id="quentity_people" name="quentity_people" onChange={handleInputChange} value={updaterooms?.quentity_people} /><br></br>

      <button onClick={handleUpdate} >Update</button><br></br> <br></br>
    </div>
  )
}
export default UpdateRooms;