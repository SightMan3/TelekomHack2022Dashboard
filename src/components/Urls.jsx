import { useState, useEffect } from 'react'
import '../css/Urls.css'
import { useNavigate } from 'react-router-dom';
import { dummyData } from "../json/day.js"

function Urls() {
    const [rerender, setRerender] = useState(false);
    let iter = 0;
    let navigate = useNavigate();


    const [ jsonnn, setJson ] = useState([]);

    


    useEffect(() => {
        
        fetch('http://sudoisbloat.pythonanywhere.com/get-daily-stats', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(res)
        {
            return res.json();
        })
        .then(function(json)
        {
            console.log(json);
            setJson(json);
            
            
        }); 

        
       
        
    }, []);

    

    function o_submit(e, name, url_add)
    {
        e.preventDefault();
      
        let route = 'page/' + name;
        navigate(route, {state: url_add});

    }

    
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

   

  
    return (
        <div className="main_url">
            <section className='nav_search'>
                <h1>Pages Visited Today</h1>
               
            </section>

            <section className='url_buttons'>
                {
                    
                    Object.keys(jsonnn).map(element => {
                        let title_length = jsonnn[element].title.split(" ").join("").length;
                        

                        let colorr = ['#1b998b', '#ed217c', '#2d3047', '#fffd82', '#ff9b71'];
                        let w = rand(0, 4);
                        

                        let wide_cube = {
                            color: 'white',
                            backgroundColor: colorr[w],
                            gridColumn: 'span 3'
                        }
                        let middle_cube = {
                            color: 'white', 
                            backgroundColor: colorr[w],
                            gridColumn: 'span 2'
                        }
                        let small_cube = {
                            color: 'white',
                            backgroundColor: colorr[w],
                            gridColumn: 'span 1'
                        }

                        if (colorr[w] == '#fffd82')
                        {
                            wide_cube = {
                                color: 'black',
                                backgroundColor: colorr[w],
                                gridColumn: 'span 3'
                            }
                            middle_cube = {
                                color: 'black',
                                backgroundColor: colorr[w],
                                gridColumn: 'span 2'
                            }
                            small_cube = {
                                color: 'black',
                                backgroundColor: colorr[w],
                                gridColumn: 'span 1'
                            }
                        }
    

                        if (title_length >= 15)
                        {
                            return ( 
                                <button
                                    key = {iter++}
                                    onClick={e => o_submit(e, jsonnn[element].title, jsonnn[element].url_address)}
                                    className='url_btn' 
                                    id={'btn' + iter}
                                    style={wide_cube}
                                ><p>{jsonnn[element].title}</p></button>
                            );
                           
                            
                        }
                        else if (title_length <= 8)
                        {
                            return ( 
                                <button
                                    key = {iter++}
                                    onClick={e => o_submit(e, jsonnn[element].title, jsonnn[element].url_address)}
                                    className='url_btn' 
                                    id={'btn' + iter}
                                    style={small_cube}
                                ><p>{jsonnn[element].title}</p></button>
                            );
                        }
                        else if (title_length > 8 && title_length < 15)
                        {
                            return ( 
                                <button
                                    key = {iter++}
                                    onClick={e => o_submit(e, jsonnn[element].title, jsonnn[element].url_address)}
                                    className='url_btn' 
                                    id={'btn' + iter}
                                    style={middle_cube}
                                ><p>{jsonnn[element].title}</p></button>
                            );
                        } 
                        /*else
                        {
                            return ( 
                                <button
                                    key = {iter++}
                                    onClick={e => o_submit(e, jsonnn[element].title.split(" ").join(""))}
                                    className='url_btn' 
                                    id={'btn' + iter}
                                    style={middle_cube}
                                ><p>{jsonnn[element].title}</p></button>
                            );
                        } */

                       
                        
                       
                    })
                }

           
            </section>

            
        </div>
    )
}

export default Urls
