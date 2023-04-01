import React, {useState} from 'react';
import Card from "./Card";
import RenderCondition from "../../core/helpers/RenderCondition";

function Sidebar(props) {

    const [active,setActive] = useState("search")
    return (
        <div className="sidebar">

            <div className="tab_switches">
                <div onClick={()=>setActive("vehicle")}>Vehicle</div>
                <div onClick={()=>setActive("search")}>Search</div>
                <div onClick={()=>setActive("categories")}>Categories</div>
            </div>

            <div className="tabs">

                <RenderCondition condition={active === "vehicle"}>
                    <div className="vehicle">

                    </div>
                </RenderCondition>
                <RenderCondition condition={active === "search"}>
                    <div className="search">
                        <div className="searchbar">
                            <input type="text" name="Placeholder"/>
                        </div>
                        <div className="content">
                            <Card name="Name" address="adresa" distance="2km" duration="10min"/>
                            <Card name="Name 2" address="adresa" distance="1km" duration="13min"/>
                            <Card name="Name 3" address="adresa" distance="1km" duration="10min"/>
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