import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { makeBuffetReservation, updateBuffetReservation } from "../../fetchBuffetReservation/FetchBuffetReservation";
import { PoojaContextShare } from "../../context/Context";
import backgroundImage from '../../assets/bgimage.jpg'; 



const MakeReservation = () => {
    const navigate = useNavigate();
    const { setUpdate, update } = PoojaContextShare();
    const buffetTypes = ['Breakfast', 'Lunch', 'Hightea', 'Dinner'];

    const [buffetReservation, setBuffetReservation] = useState({
        fristname: "",
        lastname: "",
        mobile: "",
        email: "",
        buffetType: "",
        date: "",
        quantity: "",
        price: "",
    });

    const [errors, setErrors] = useState({
        fristname: "",
        lastname: "",
        mobile: "",
        email: "",
        date: "",
        quantity: "",
    });

    useEffect(() => {
        if (update) {
            setBuffetReservation({
                ...buffetReservation,
                fristname: update.fristname,
                lastname: update.lastname,
                mobile: update.mobile,
                email: update.email,
                buffetType: update.buffetType,
                date: update.date.split("T")[0],
                quantity: update.quantity,
                price: update.price,
                _id: update._id,
            });
        }
    }, []);

    const queryClient = useQueryClient();
    const { mutate, isLoading, isError } = useMutation(makeBuffetReservation, {
        onSuccess: () => queryClient.invalidateQueries("buffet"),
    });

    const { mutate: updateBuffetReservations, isLoading: updateLoading, isError: updateError } = useMutation(updateBuffetReservation, {
        onSuccess: () => queryClient.invalidateQueries("buffet"),
    });

    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [buffetType, setBuffetType] = useState("");

    const buffetPrices = {
        Breakfast: 100,
        Lunch: 200,
        Dinner: 300,
        Hightea: 150
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (update) {
                updateBuffetReservations(buffetReservation);
                navigate("/");
            } else {
                mutate(buffetReservation);
                navigate("/");
            }
        }
    };

    const validateForm = () => {
        const nameRegex = /^[a-zA-Z\s]{1,15}$/;
        const phoneRegex = /^[0-9]{10}$/;
        const emailRegex = /\S+@\S+\.\S+/;
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const selectedDate = new Date(buffetReservation.date);

        const newErrors = {
            fristname: !nameRegex.test(buffetReservation.fristname) ? "First name must contain letters and spaces only, up to 15 characters." : "",
            lastname: !nameRegex.test(buffetReservation.lastname) ? "Last name must contain letters and spaces only, up to 15 characters." : "",
            mobile: !phoneRegex.test(buffetReservation.mobile) ? "Phone number must contain 10 digits and start with 0." : "",
            email: !emailRegex.test(buffetReservation.email) ? "Email must be a valid email address (e.g., example@gmail.com)." : "",
            date: selectedDate < today ? "Date must be selected from tomorrow onwards." : "",
            quantity: quantity < 0 ? "Quantity cannot be a negative number." : "",
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(err => err); // Check if any errors exist
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div style={{ position: 'relative' }}>
            <div style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(8px)',
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                zIndex: -1
            }}></div>
            <section>
                <button onClick={() => navigate(-1)} className="absolute top-[2rem] left-[4rem] button px-5 ext-sm">
                    Go Back
                </button>

                <div className="flex items-center justify-center h-screen">
                    <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff' }} className="border border-gray-400 w-[30rem] p-5 flex flex-col gap-5 rounded-md shadow-md shadow-gray-400 m-5 lg:-0">

                        <h1 className="text-center text-xl font-medium">{update ? "Update Reservation" : "Reservation Form"}</h1>

                        <input value={buffetReservation.fristname} onChange={(e) => setBuffetReservation({ ...buffetReservation, fristname: e.target.value })} className="input" type="text" placeholder="First Name" required />
                        <p className="text-red-500">{errors.fristname}</p>
                        <input value={buffetReservation.lastname} onChange={(e) => setBuffetReservation({ ...buffetReservation, lastname: e.target.value })} className="input" type="text" placeholder="Last Name" required />
                        <p className="text-red-500">{errors.lastname}</p>
                        <input value={buffetReservation.mobile} onChange={(e) => setBuffetReservation({ ...buffetReservation, mobile: e.target.value })} className="input" type="number" placeholder="Mobile" required />
                        <p className="text-red-500">{errors.mobile}</p>
                        <input value={buffetReservation.email} onChange={(e) => setBuffetReservation({ ...buffetReservation, email: e.target.value })} className="input" type="email" placeholder="Email" required />
                        <p className="text-red-500">{errors.email}</p>

                        <div>
                            <p>Buffet Type</p>
                            <select className="input" type="text" onChange={(e) => {
                                const newBuffetType = e.target.value;
                                setBuffetType(newBuffetType);
                                const newPrice = quantity * buffetPrices[newBuffetType];
                                setPrice(newPrice);
                                setBuffetReservation({ ...buffetReservation, buffetType: newBuffetType, price: newPrice });
                            }} required>
                                <option value="">Choose one</option>
                                {buffetTypes.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p>Date</p>
                            <input value={buffetReservation.date} onChange={(e) => setBuffetReservation({ ...buffetReservation, date: e.target.value })} className="input" type="date" min={today} required />
                            <p className="text-red-500">{errors.date}</p>
                        </div>
                        <div>
                            <p>Quantity</p>
                            <input className="input" type="number" placeholder="Quantity" min="1" value={quantity} onChange={(e) => {
                                const newQuantity = parseInt(e.target.value);
                                setQuantity(newQuantity);
                                const newPrice = newQuantity * buffetPrices[buffetType];
                                setPrice(newPrice);
                                setBuffetReservation({ ...buffetReservation, quantity: newQuantity, price: newPrice });
                            }} required />
                            <p className="text-red-500">{errors.quantity}</p>
                        </div>
                        <p className="input">Total Amount = LKR {price}</p>

                        <button type="submit" className="button">{update ? "Update" : "Submit"}</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default MakeReservation;
