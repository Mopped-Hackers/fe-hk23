import React, {useState} from 'react';
import Card from "./Card";
import Divider from "./Divider";

import RenderCondition from "../../core/helpers/RenderCondition";
import CardMissing from "./CardMissing";

function Sidebar({cards, missing}) {

    const [active,setActive] = useState("search")
    
    return (
        <div className="sidebar">
            <div className='tab_switches_wrapper'>
                <div className="tab_switches">
                    <div onClick={()=>setActive("vehicle")}>Vehicle</div>
                    <div onClick={()=>setActive("search")}>Search</div>
                    <div onClick={()=>setActive("categories")}>Categories</div>
                </div>
            </div>

            <div className="tabs">

                <RenderCondition condition={active === "vehicle"}>
                    <div className="vehicle">
                        <div className='vehicleType center'><p>Walking</p></div>
                        <div className='vehicleType center'><p>Bicycle</p></div>
                    </div>
                    <div className="content">
                            <div className='in_fifteen_wrapper'>
                                <h2 className='in_fifteen'>In 15 minutes you will get here:</h2>
                            </div>
                            <Card name="Name" address="adresa" distance="2km" duration="10min"/>
                            <Card name="Name 2" address="adresa" distance="1km" duration="13min"/>
                            <Card name="Name 3" address="adresa" distance="1km" duration="10min"/>
                    </div>
                </RenderCondition>
                <RenderCondition condition={active === "search"}>
                    <div className="search">
                        <div className="searchbar, center">
                            <input type="text" placeholder="Search" name="Placeholder"/>
                        </div>
                        <div className="content">
                            
                            <div className='in_fifteen_wrapper'>
                                <h2 className='in_fifteen'>In 15 minutes you will get here:</h2>
                            </div>
                            <div style={{height: '45vh', overflowY:'scroll'}}>
                                {cards?.map((point,index)=><Card key={index} name={point?.properties?.name ?? "No name"} />)}
                            </div>

                            <div className='in_fifteen_wrapper'>
                                <h2 className='in_fifteen'>Outside of 15 mins distance:</h2>
                            </div>
                            <div style={{height: '35vh', overflowY:'scroll'}}>
                                {missing?.map((point,index)=><CardMissing key={index} name={point?.properties?.name ?? "No name"} />)}
                            </div>


 {/*                            <Card name="Name" address="adresa" distance="2km" duration="10min"/>
                            <Card name="Name 2" address="adresa" distance="1km" duration="13min"/>
                            <Card name="Name 3" address="adresa" distance="1km" duration="10min"/> */}
                        </div>
                    </div>
                </RenderCondition>

               <RenderCondition condition={active === "categories"}>
                   <div className="categories">
                        <div className='categorieSlider'>
                            <div className='category center'><p>Drug store</p></div>
                            <div className='category center'><p>Green place</p></div>
                            <div className='category center'><p>Job</p></div>
                            <div className='category center'><p>School</p></div>
                            <div className='category center'><p>Shops</p></div>
                            <div className='category center'><p>Sport</p></div>
                            <div className='category center'><p>Transport</p></div>
                        </div>
                   </div>
                   <div className="content">
                            <div className='in_fifteen_wrapper'>
                                <h2 className='in_fifteen'>In 15 minutes you will get here:</h2>
                            </div>
                            <Card name="Name" address="adresa" distance="2km" duration="10min"/>
                            <Card name="Name 2" address="adresa" distance="1km" duration="13min"/>
                            <Card name="Name 3" address="adresa" distance="1km" duration="10min"/>
                        </div>
               </RenderCondition>


            </div>
        </div>
    );
    }

export default Sidebar;