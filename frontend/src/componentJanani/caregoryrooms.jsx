import React from 'react';
import { Link } from 'react-router-dom';
import './categoryrooms.css'
import NavBar from '../componentsTharushaReview/NavBar';
import Foot from '../componentsTharushaReview/Foot';

function CategoryRooms() {

    return (
        <div>
            <div>
            <NavBar />  
            </div>
            
        <div className="category-rooms-container category-rooms-center category-rooms-dark-grey" style={{ padding: '128px 16px' }} id="pricing">
            
            <p className="category-rooms-large">Choose a pricing package fits your needs.</p>
            <div className="category-rooms-row-padding" style={{ marginTop: '64px', display: 'flex', justifyContent: 'center' }}>
            <div className="category-rooms-third category-rooms-section">
                    <ul className="category-rooms-ul category-rooms-white category-rooms-hover-shadow">
                        <li className="category-rooms-black category-rooms-xlarge category-rooms-padding-32">SINGLE ROOM</li>
                        <li className="category-rooms-padding-16"><b>- Accommodate One Adult</b></li>
                        <li className="category-rooms-padding-16"><b>- Non Air Conditioner</b></li>
                        <li className="category-rooms-padding-16"><b>- Bed Type : Single Bed</b></li>
                        <li className="category-rooms-padding-16"><b>- Per Day : Rs.2500/=</b></li>
                        <li className="category-rooms-light-grey category-rooms-padding-24">
                            <Link to="/addrooms">Book Here</Link> {/* Wrap Sign Up button with Link */}
                        </li>
                    </ul>
                </div>
                <div className="category-rooms-third category-rooms-section">
                    <ul className="category-rooms-ul category-rooms-white category-rooms-hover-shadow">
                        <li className="category-rooms-red category-rooms-xlarge category-rooms-padding-48">LUXURY ROOM</li>
                        <li className="category-rooms-padding-16"><b>- Accommodate One / Two Adult</b></li>
                        <li className="category-rooms-padding-16"><b>- Air Conditioner</b></li>
                        <li className="category-rooms-padding-16"><b>- Bed Type : Thrible Bed</b></li>
                        <li className="category-rooms-padding-16"><b>- Per Day : Rs.5000/=</b></li>
                        {/* Removed price elements */}
                        {/* <li className="category-rooms-padding-16">
                            <h2 className="category-rooms-wide">$ 500</h2>
                            <span className="category-rooms-opacity">per month</span>
                        </li> */}
                        
                            <Link to="/addrooms">Book Here</Link> {/* Wrap Sign Up button with Link */}
                        
                    </ul>
                </div>
                <div className="category-rooms-third category-rooms-section">
                    <ul className="category-rooms-ul category-rooms-white category-rooms-hover-shadow">
                        <li className="category-rooms-black category-rooms-xlarge category-rooms-padding-32">DOUBLE ROOM</li>
                        <li className="category-rooms-padding-16"><b>- Accommodate Two Adult</b></li>
                        <li className="category-rooms-padding-16"><b>- Non Air Conditioner</b></li>
                        <li className="category-rooms-padding-16"><b>- Bed Type : Double Bed</b></li>
                        <li className="category-rooms-padding-16"><b>- Per Day : Rs.3500/=</b></li>
                        {/* Removed price elements */}
                        {/* <li className="category-rooms-padding-16">
                            <h2 className="category-rooms-wide">$ 300</h2>
                            <span className="category-rooms-opacity">per month</span>
                        </li> */}
                        <li className="category-rooms-light-grey category-rooms-padding-24">
                            <Link to="/addrooms">Book Here</Link> {/* Wrap Sign Up button with Link */}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Foot/>
        </div>
    );
}

export default CategoryRooms;