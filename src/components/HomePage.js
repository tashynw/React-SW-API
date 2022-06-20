import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = ({ peopleData }) => {
    const [search,setSearch]=useState('');

    //used to copy peopleData to be used for searching purposes...
    const[peopleData2,setPeopleData2]=useState([]);

    //perform search logic by setting result data to peopleData2 (similarly to App.js loadPeople())
    const handleSearch= async (e)=>{
        e.preventDefault();
        await axios.get(`https://swapi.dev/api/people/?search=${search}`)
          .then((response)=>{
            var peopleCopy = response.data.results;
            let promises = [];
            for(let person of peopleCopy){
              promises.push(
                //homeworld call
                axios.get(person.homeworld)
                  .then((response)=>{
                    person.homeworld = response.data.name;
                  }),
                //species call 
                person.species.length > 0 ?
                  axios.get(person.species[0])
                    .then((response)=>{
                      person.species = response.data.name;
                    })
                : person.species = 'Human'
              )
            }
            Promise.all(promises).then(() => {setPeopleData2(peopleCopy)});
          })
          .catch((error)=>{
            alert('error loading data')
          })
    }
    
    //transfers peopleData content to peopleData2 for searching purposes in the homepage...
    useEffect(()=>{
        setPeopleData2(peopleData)
    },[peopleData]);
    
    return (
        <div style={{marginBottom:'80px'}}>
            <p className='homepage-text'>All Cards {'>'} <span className='header-text-span'>Select a card</span></p>

            <div className='main-search-box'>
                <form onSubmit={handleSearch}>
                    <div className='search-box'>
                        <input type='text' className='search-input' placeholder='Search' onChange={(e)=>setSearch(e.target.value)}/>
                        <img className='search-image' alt='icon' src={require('../resources/Interview Assets/Search.svg').default} onClick={handleSearch} height={16} width={16}/>
                    </div>
                </form>
                {/*    
                <div className='sort-box'>
                    <p className='sort-text'>Sort by</p>
                    <div className='sorting-option-button'>
                        <div className='option-text'>Homeworld</div>
                        <div className='arrow-button'><img className='arrow-button-image' alt='icon' src={require('../resources/Interview Assets/down-arrow.svg').default} height={16} width={16}/></div>
                    </div>
                    <div className='sorting-order-button'>
                        <div className='ascending-text'>ASC</div>
                        <div className='descending-text'>DESC</div>
                    </div>
                    
                </div> */}
            </div>

            <div className='main-card-box'>
                {/*GENERATING CARDS*/}
                {peopleData2.length>0 ?
                    peopleData2.map((person)=>(
                        <li key={person.name} style={{ listStyleType: "none" }}>
                            <div className='card-box'>
                                <div className='card-header'>
                                    {/*ICON TO GO TO CARD PAGE*/}
                                    <Link to={`/${person.name}`}><img className='card-header-icon' alt='icon' src={require('../resources/Interview Assets/Card.svg').default} height={16} width={16}/></Link>
                                    <p className='card-name-text'>{person.name}</p>
                                </div>
                                <div className='card-info'>
                                    <div className='card-info-header'>
                                        <p className='card-info-header-text'><img src={require('../resources/Interview Assets/Gender-Male.svg').default} alt='icon' height={16} width={16}/>{person.birth_year}</p>
                                        <p className='card-info-header-text'>{person.species}</p>
                                    </div>
                                    <div className='card-info-main'>
                                        <div className='info-box'>
                                            <p className='info-header-text'><img src={require('../resources/Interview Assets/Homeworld.svg').default} alt='icon' height={16} width={16}/>HOMEWORLD</p>
                                            <p className='info-value-text'>{person.homeworld}</p>
                                        </div>
                                        <div className='info-box'>
                                            <p className='info-header-text'><img src={require('../resources/Interview Assets/Vehicle.svg').default} alt='icon' height={16} width={16}/>VEHICLES</p>
                                            <p className='info-value-text'>{person.vehicles.length}</p>
                                        </div>
                                        <div className='info-box'>
                                            <p className='info-header-text'><img src={require('../resources/Interview Assets/Starship.svg').default} alt='icon' height={16} width={16}/>STARSHIPS</p>
                                            <p className='info-value-text'>{person.starships.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                    :
                    /*to inform user that data is loading/info is not available (if it takes too long to load)*/
                    <p className='load-text'>Loading data...<br/><br/>Or, info is not available.</p>
                }
            </div>
        </div>
    )
}

export default HomePage