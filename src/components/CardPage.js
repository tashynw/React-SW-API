import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const CardPage = ({ peopleData }) => {
    //the states with the vehicles and starships data for the card
    const [vehicles,setVehicles]=useState([]);
    const [starships,setStarships]=useState([]);

    //finding the card that user wants to look at
    const cardId = useLocation().pathname.slice(1);
    const specificCard = peopleData.find((person)=>person.name===decodeURI(cardId));
    
    //function to load vehicle names from the array containing vehicle api calls
    const getVehicles = useCallback(async () =>{
        let promises=[];
        let vehicles=[];
        if(specificCard){
            for(let vehicle of specificCard.vehicles){
                promises.push(
                    await axios.get(vehicle)
                        .then((response)=>{
                            vehicles.push(response.data.name);
                        })
                )
            }
            Promise.all(promises).then(()=>setVehicles(vehicles))
        } 
    },[specificCard])

    //function to load starships names from the array containing starships api calls
    const getStarships = useCallback(async () =>{
        let promises=[];
        let starships=[];
        if(specificCard){
            for(let starship of specificCard.starships){
                promises.push(
                    await axios.get(starship)
                        .then((response)=>{
                            starships.push(response.data.name);
                        })
                )
            }
            Promise.all(promises).then(()=>setStarships(starships))
        }        
    },[specificCard])

    //loads vehicle and starship data as the user clicks on a card
    useEffect(()=>{
        getVehicles();
        getStarships();
    },[peopleData,getVehicles,getStarships])

    return (
        <div>
            {specificCard ? 
                <>
                    <p className='homepage-text' style={{marginBottom:'32px'}}><Link to="/" style={{ textDecoration:'none' }}>All Cards</Link> {'>'} <span className='header-text-span'>{specificCard.name} Details</span></p>

                    <div className='card-box-individual'>
                        <div className='card-header'>
                            <img className='card-header-icon' src={require('../resources/Interview Assets/Card.svg').default} alt='icon' height={16} width={16}/>
                            <p className='card-name-text'>{specificCard.name}</p>
                        </div>
                        <div className='card-info'>
                                <div className='card-info-header-individual'>
                                    <p className='card-info-header-text'><img src={require('../resources/Interview Assets/Gender-Male.svg').default} alt='icon' height={16} width={16}/>{specificCard.birth_year}</p>
                                    <p className='card-info-header-text'>{specificCard.species}</p>
                                </div>

                                <div className='card-info-main'>
                                    <div className='info-box-individual'>
                                        <p className='info-header-text'><img src={require('../resources/Interview Assets/Homeworld.svg').default} alt='icon' height={16} width={16}/>HOMEWORLD</p>
                                        <p className='info-value-text'>{specificCard.homeworld}</p>
                                    </div>
                                    {/*DISPLAY VEHICLES*/}
                                    {specificCard.vehicles.length>0 ?
                                        vehicles.map((vehicle)=>(
                                            <div className='info-box-individual' key={vehicle}>
                                                <p className='info-header-text'><img src={require('../resources/Interview Assets/Vehicle.svg').default} alt='icon' height={16} width={16}/>VEHICLE</p>
                                                <p className='info-value-text'>{vehicle}</p>
                                            </div>
                                        ))
                                        :
                                        <div className='info-box-individual'>
                                                <p className='info-header-text'><img src={require('../resources/Interview Assets/Vehicle.svg').default} alt='icon' height={16} width={16}/>VEHICLE</p>
                                                <p className='info-value-text'>None</p>
                                        </div>
                                    }
                                    {/*DISPLAY STARSHIPS*/}
                                    {
                                        specificCard.starships.length>0 ?
                                            starships.map((starship)=>(
                                                <div className='info-box-individual' key={starship}>
                                                    <p className='info-header-text'><img src={require('../resources/Interview Assets/Starship.svg').default} alt='icon' height={16} width={16}/>STARSHIP</p>
                                                    <p className='info-value-text'>{starship}</p>
                                                </div>
                                            ))
                                            :
                                            <div className='info-box-individual'>
                                                <p className='info-header-text'><img src={require('../resources/Interview Assets/Vehicle.svg').default} alt='icon' height={16} width={16}/>STARSHIP </p>
                                                <p className='info-value-text'>None</p>
                                            </div>
                                    }
                                </div>
                            </div>
                    </div>
                </>
                :
                /*loading screen logic or if user clicks on card not in the data*/
                <p className='load-text'>Loading data...<br/><br/>Or, info is not available.</p>
            }
            
        </div>
    )
}

export default CardPage