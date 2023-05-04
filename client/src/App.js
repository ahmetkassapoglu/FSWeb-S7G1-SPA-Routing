import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';
import FilmListesi from './Filmler/FilmListesi';
import Film from "./Filmler/Film"

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          setMovieList(response.data)
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = id => {
  const film = movieList.find(movie => movie.id == id)
  const tekrar = saved.find(movie => movie.id == id)
    if (!tekrar) setSaved([...saved , film]);
  
  };
  return (
    <div>
      <KaydedilenlerListesi list={saved} />
      

      <div>
      <Switch>
      <Route exact path = "/filmler">
        <FilmListesi movies= {movieList} />
      </Route>
      <Route exact path = "/">
        <FilmListesi movies= {movieList} />
      </Route>
      <Route path="/filmler/:id" >
      <Film save = {KaydedilenlerListesineEkle} />
       </Route>
       </Switch>
      </div>
    </div>
  );
}
