import React, {useState} from 'react';
import Card from "./Card";
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

                    </div>
                </RenderCondition>
                <RenderCondition condition={active === "search"}>
                    <div className="search">
                        <div className="searchbar, center">
                            <input type="text" name="Placeholder"/>
                        </div>
                        <div className="content">

                            <div style={{height: '45vh', overflowY:'scroll'}}>
                                {cards?.map((point,index)=><Card key={index} name={point?.properties?.name ?? "No name"} />)}
                            </div>

                            <h3>Missing</h3>
                            <div style={{height: '35vh', overflowY:'scroll'}}>
                                {missing?.map((point,index)=><CardMissing key={index} name={point?.properties?.name ?? "No name"} />)}
                            </div>

                        </div>
                    </div>
                </RenderCondition>

               <RenderCondition condition={active === "categories"}>
                   <div className="categories">

                   </div>
               </RenderCondition>


            </div>
        </div>
    );
    }

export default Sidebar;