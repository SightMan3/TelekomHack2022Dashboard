import { useState, useEffect } from 'react'
import '../css/pages.css'
import { useParams, useNavigate } from "react-router-dom";
import { dummyData } from "../json/day.js"

function Page() {
    let navigate = useNavigate();

    const { name } = useParams();
    
    const [ jsonnn, setJson ] = useState([]);

    const [ negative_percentage, setnegative_precentage ] = useState(0);
    const [ positive_percentage, setpositive_precentage ] = useState(0);

    let neg_bar = 0;
    let pos_bar = 0;

    let negative_sentences = [];

   

    function normalize(val, min, max){
        
        if(min < 0){
          max += 0 - min;
          val += 0 - min;
          min = 0;
        }
        
        val = val - min;
        max = max - min;
        return Math.max(0, Math.min(1, val / max));
    }

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
 
    function parse_json_data(j)
    {
         
        let current;
        
        Object.keys(j).forEach(e => { 

            if (j[e].title.split(" ").join("") == name.split(" ").join(""))
            {
                current = j[e];
            }
        });

        let full = current['negative_count'] + current['positive_count'];
        let neg = parseInt((current['negative_count'] / full) * 100);
        let pos = parseInt((current['positive_count'] / full) * 100);

        neg_bar = (normalize(neg, 0, 50) * 100) / 2;
        pos_bar = (normalize(pos, 0, 50) * 100) / 2;


        setpositive_precentage( pos );
        setnegative_precentage( neg );
        
        if (isNaN(neg_bar)) { neg_bar = 5; setnegative_precentage( 0 );}
        if (isNaN(pos_bar)) { pos_bar = 5; setpositive_precentage( 0 );}


        document.querySelector('#nb').style = 'height: ' + neg_bar + '%';
        document.querySelector('#pb').style = 'height: ' + pos_bar + '%';
        
    }

    function o_route_to_url()
    {
        // history.state.usr
        window.location.href = history.state.usr;
    }

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
            parse_json_data(json);
        }); 
        
        

        const coll = document.getElementsByClassName('sen');
        const sentences = document.getElementById('sentences');
        for (let i = 0; i < coll.length; i++)
        {
            let r = rand(15, 40);
            if (r > 38)
            {
                sentences.style.width = '90%';
            }
            else
            {
                sentences.style.width = '70%';

            }
            coll[i].style = 'font-size: ' + r + 'px';
        }

         
        

        

    }, []);


    Object.keys(jsonnn).forEach(e => {

        if (jsonnn[e].title.split(" ").join("") == name.split(" ").join(""))
        {
            
            for (let neg_sen of jsonnn[e]["negative"])
            {
                let ng = '';
                if (neg_sen.length > 120)
                {
                    ng = neg_sen.slice(40, neg_sen.length);
                    negative_sentences.push(<p className='sen' >{ng}</p>);
                }
                else
                {
                    negative_sentences.push(<p className='sen' >{neg_sen}</p>);

                }
            
            }
        }
    });

    function get_rand_color()
    {                        
        let colorr = ['#1b998b', '#ed217c', '#2d3047', '#fffd82', '#ff9b71'];
        let w = rand(0, 4);
        

        let color_cube = {
            color: 'white',
            backgroundColor: colorr[w],
            gridColumn: 'span 3'
        }
       

        if (colorr[w] == '#fffd82')
        {
            color_cube = {
                color: 'black',
                backgroundColor: colorr[w],
                gridColumn: 'span 3'
            }
           
        }

        return color_cube;
    }

   
    let iter = 0;
  return (
    <div className="page_main">
        
        <button className='back' onClick={
            () => {
                navigate(-1);
            }
        }>back</button>
        <section className='percentage'>
            <div className='negative'>
                <p>Negative</p>
                <div>{ negative_percentage + "%" }</div>
            </div>
            <div className='bars'>
                <div id='nb' className='neg_bar'> </div>
                <div id='pb' className='pos_bar'> </div>
            </div>
            <div className='positive'>
                <p>Positive</p>
                <div>{ positive_percentage + "%" }</div>
            </div>
        </section>

        <section className='page_title'>
            <div onClick={o_route_to_url} >{ name }</div>
        </section>

        <section id="sentences" className='sentences'>
            {
                
                negative_sentences.map(e => {
                    const coll = document.getElementsByClassName('sen');
                    const sentences = document.getElementById('sentences');
                    for (let i = 0; i < coll.length; i++)
                    {
                        let r = rand(15, 40);
                        if (r > 38)
                        {
                            sentences.style.width = '90%';
                        }
                        else
                        {
                            sentences.style.width = '70%';

                        }
                        coll[i].style = 'font-size: ' + r + 'px';
                    }

                    if (iter < 6) {
                        return ( 
                            <p key={iter++}>{e}</p> 
                        )
                    }
                    
                    return (
                        <p key={iter++} ></p>  
                    ) 
                    

                }) 
                
            }
            
            
        </section>

    </div>
  )
}

export default Page
