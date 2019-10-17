import React, { useState } from "react";
import axios from "axios";

const moviesApi = "http://localhost:5000/api/movies";

const UpdatedMovie = props => {
  console.log(props);

  const initialList = {
    title: "",
    director: "",
    metascore: ""
  };
  const [updateId, setUpdateId] = useState(initialList);
  const [stars, setStars] = useState([]);

  //console.log(updateId);
  const id = props.match.params.id;
  const handleChange = e => {
    e.preventDefault();
    setUpdateId({
      ...updateId,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeStars = e => {
    e.preventDefault();
    setStars({ ...stars, [e.target.name]: [e.target.value] });
  };
  const data = {
    ...updateId,
    ...stars
  };

  const updateMovie = e => {
    e.preventDefault();
    axios.put(`${moviesApi}/${id}`, data)
    .then(res => {
      props.history.push("/");
      props.setMovies(res.data);
    });

    //.catch(err => console.log(err));
  };

  return (
    <div>
      <div>Add A New Friend</div>
      <form onSubmit={updateMovie}>
        <label>
          Title:
          <br />
          <input
            name="title"
            placeholder="Title"
            value={updateId.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Director:
          <br />
          <input
            name="director"
            placeholder="Director"
            value={updateId.director}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Metascore:
          <br />
          <input
            name="metascore"
            placeholder="Metascore"
            value={updateId.metascore}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Stars:
          <br />
          <input
            name="stars"
            placeholder="Stars"
            value={updateId.stars}
            onChange={handleChangeStars}
          />
        </label>
        <br />
        <div>
          <button className="button" type="submit">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatedMovie;
