import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {routes} from "../routes";

function Nav(props) {
    const [categories,setCategories] = useState([])

    useEffect(()=>{
        axios.get("http://vps.andrejvysny.sk:8000/geom/categories").then(r=>{
            setCategories(r.data);
            console.log(r);
        })
    },[]);

    return (
        <nav>

            <div className='tab_switches_wrapper'>
                <div className="tab_switches">
                    <Link to={routes.home}>Home</Link>
                    <Link to={routes.newview}>New</Link>
                    <Link to={routes.vote}>Vote</Link>
                </div>
            </div>

            <div className="categories">
                <div className='categorieSlider'>
                    {categories.map(cat=><div key={cat} className='category center'><p>{cat}</p></div>)}
                </div>
            </div>
        </nav>
    );
}

export default Nav;