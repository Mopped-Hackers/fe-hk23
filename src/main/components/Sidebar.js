import React, {useEffect, useState} from 'react';
import Card from "./Card";
import Divider from "./Divider";

import RenderCondition from "../../core/helpers/RenderCondition";
import CardMissing from "./CardMissing";
import axios from "axios";
import Categories from "./Categories";

function Sidebar({cards, missing,setCards,setMissing}) {

    const [active,setActive] = useState("search")

    const name = point=>{
        if (!point?.properties?.name){
            return "No name";
        }
        if (point?.properties?.name?.trim() === ""){
            return point?.properties?.fid;
        }

        return point?.properties?.name.trim() ?? "No name";
    }


    return (
        <div className="sidebar">
            <div className="tabs">

                <RenderCondition condition={active === "vehicle"}>
                    <div className="vehicle">
                        <div className='vehicleType center'><p>Walking</p></div>
                        <div className='vehicleType center'><p>Bicycle</p></div>
                    </div>
                </RenderCondition>
                {/* <RenderCondition condition={active === "search"}>
                    <div className="search">
                        <div className="searchbar, center">
                            <input type="text" placeholder="Search" name="Placeholder"/>
                        </div>

                    </div>
                </RenderCondition> */}

               <RenderCondition condition={active === "categories"}>

                   <Categories/>

               </RenderCondition>

                <div className="content">

                    <div className='in_fifteen_wrapper'>
                        <h2 className='in_fifteen'>In 15 minutes you will get here</h2>
                    </div>
                    <div style={{height: '45vh', overflowY:'scroll'}}>
                        {cards?.map((point,index)=><Card key={index} lng={point?.geometry.coordinates[0]} lat={point?.geometry.coordinates[1]} type={point?.properties?.aminity ?? ""} color={point?.properties?.color ?? 'black'} name={name(point)} />)}
                    </div>

                    <div className='in_fifteen_wrapper'>
                        <h2 className='in_fifteen'>Outside of 15 mins distance</h2>
                    </div>
                    <div style={{height: '35vh', overflowY:'scroll'}}>
                        {missing?.map((point,index)=><CardMissing key={index}  name={point} />)}
                    </div>
                </div>
            </div>
        </div>
    );
    }

export default Sidebar;