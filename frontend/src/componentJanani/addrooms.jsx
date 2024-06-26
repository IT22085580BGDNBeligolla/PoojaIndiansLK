import { useState } from "react";
import axios from "axios";
import './addrooms.css';
import backgroundImage from '../../src/image/backgroundImage.jpg';

function AddRooms() {
    const [rooms, setRooms] = useState({
        name: "",
        phone: "",
        email: "",
        date: "",
        quantity_rooms: "",
        quantity_people: "",
    });



   const handleOnChange = (e) => {
        const { value, name } = e.target;
        setRooms((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await axios.post("http://localhost:5500/rooms/create", rooms);
        console.log(data);
        alert("Rooms reserved successfully!");
    };

    return (
        <>
        
        <h2 id="add-rooms1">Booking Reservation Form </h2>

        <div className="add-rooms">
            <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" id="name" name="name" onChange={handleOnChange} /><br />
                    <label>Phone Number:</label>
                    <input type="number" id="phone" name="phone" onChange={handleOnChange} /><br />
                    <label>Email:</label>
                    <input type="email" id="email" name="email" onChange={handleOnChange} /><br />
                    <label>Date:</label>
                    <input type="date" id="date" name="date" onChange={handleOnChange} /><br />
                    <label>Quantity:</label>
                    <input type="number" min = "1"  max = "10" id="quantity_rooms" name="quantity_rooms" onChange={handleOnChange} /><br />
                    <label>Number of Guests:</label>
                    <input type="number" min = "1" id="quantity_people" name="quantity_people" onChange={handleOnChange} /><br />

                    <button>Reserve Rooms</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default AddRooms;
