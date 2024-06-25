import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postDriver } from "../../Actions/Index";
import validation from "./validation";
import "./formpage.css";
import Maxverstappen from "./Maxverstappen.png";

const teamOptions = [
  "Red Bull",
  "Mercedes",
  "Ferrari",
  "McLaren",
  "Aston Martin",
  "Alphine",
  "Williams Stake",
  "Haas",
];

const Formpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const [driverData, setDriverData] = useState({
    forename: "",
    surname: "",
    nationality: "",
    dob: "",
    description: "",
    image: "",
    teams: [],
  });

  const [errors, setErrors] = useState({
    forename: "",
    surname: "",
    nationality: "",
    dob: "",
    description: "",
    image: "",
    teams: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "teams") {
      if (value === "Escuderías") {
        return;
      }

      if (!driverData.teams.includes(value) && driverData.teams.length < 2) {
        setDriverData((prevState) => ({
          ...prevState,
          teams: [...prevState.teams, value],
        }));
        setErrors(validation({ ...driverData, teams: [...driverData.teams, value] }));
      }
    } else {
      setDriverData({
        ...driverData,
        [name]: value,
      });
      setErrors(validation({ ...driverData, [name]: value }));
    }
  };

  const handleRemove = (team) => (e) => {
    e.preventDefault();
    setDriverData((prevState) => ({
      ...prevState,
      teams: prevState.teams.filter((escuderia) => escuderia !== team),
    }));
    setErrors(validation({ ...driverData, teams: driverData.teams.filter((escuderia) => escuderia !== team) }));
  };

  const handleDisable = () => {
    let hasErrors = false;
    for (let err in errors) {
      if (errors[err] !== "") {
        hasErrors = true;
        break;
      }
    }
    return hasErrors;
  };

  const generateRandomId = (min = 510, max = 10000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validation(driverData);
    setErrors(formErrors);

    const hasErrors = Object.keys(formErrors).some((key) => formErrors[key] !== "");
    if (hasErrors) {
      alert("Please fill out the form correctly");
      return;
    }

    const newId = generateRandomId();

    const transformedData = {
      id: newId,
      driverRef: `${driverData.forename.toLowerCase()}_${driverData.surname.toLowerCase()}`,
      number: null,
      code: driverData.forename.slice(0, 3).toUpperCase(),
      name: {
        forename: driverData.forename,
        surname: driverData.surname,
      },
      image: {
        url: driverData.image,
        imageby: "",
      },
      dob: driverData.dob,
      nationality: driverData.nationality,
      url: "",
      teams: driverData.teams.join(", "),
      description: driverData.description,
    };

    try {
      await dispatch(postDriver(transformedData));
      alert("Driver created successfully");
      navigate("/home");
    } catch (error) {
      alert("Error creating driver. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="formpage-container">
      <div className="left-content">
        <h2 className="form-title">Create Driver</h2>
        <img src={Maxverstappen} alt="Driver" className="max-image" />
        <div className="buttons-container">
          <button className="back-button" onClick={() => navigate("/home")}>
            Back
          </button>
          <button
            type="submit"
            className={`create-button ${handleDisable() ? "disabled" : ""}`}
            disabled={handleDisable()}
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
      <div className="right-content">
        <form className="formContainer">
          <div className="formRow">
            <div className="column">
              <label className="form-label">FORENAME</label>
              <input
                onChange={handleChange}
                name="forename"
                type="text"
                className="form-text"
                value={driverData.forename}
              />
              {errors.forename && <label className="form-label">{errors.forename}</label>}
            </div>
            <div className="column">
              <label className="form-label">SURNAME</label>
              <input
                onChange={handleChange}
                name="surname"
                type="text"
                className="form-text"
                value={driverData.surname}
              />
              {errors.surname && <label className="form-label">{errors.surname}</label>}
            </div>
          </div>
          <div className="formRow">
            <div className="column">
              <label className="form-label">NATIONALITY</label>
              <input
                onChange={handleChange}
                name="nationality"
                type="text"
                className="form-text"
                value={driverData.nationality}
              />
              {errors.nationality && <label className="form-label">{errors.nationality}</label>}
            </div>
            <div className="column">
              <label className="form-label">IMAGE</label>
              <input
                onChange={handleChange}
                name="image"
                type="text"
                className="form-text"
                value={driverData.image}
              />
              {errors.image && <label className="form-label">{errors.image}</label>}
            </div>
          </div>
          <div className="formRow">
            <div className="column">
              <label className="form-label">DATE OF BIRTH</label>
              <input
                onChange={handleChange}
                name="dob"
                type="date"
                className="form-text"
                value={driverData.dob}
              />
              {errors.dob && <label className="form-label">{errors.dob}</label>}
            </div>
            <div className="column">
              <label className="form-label">TEAMS</label>
              <select
                onChange={handleChange}
                name="teams"
                className="form-text"
                value={driverData.teams}
              >
                <option value="Escuderías">ALL TEAMS</option>
                {teamOptions.map((team, index) => (
                  <option key={index} value={team}>
                    {team}
                  </option>
                ))}
              </select>
              <div className="teamContainer">
                {driverData.teams.map((team, index) => (
                  <div key={index}>
                    <p>{team}</p>
                    <button onClick={handleRemove(team)} className="back-button">
                      X
                    </button>
                  </div>
                ))}
                {errors.teams && <label className="form-label">{errors.teams}</label>}
              </div>
            </div>
          </div>
          <div className="column">
            <label className="form-label">DESCRIPTION</label>
            <textarea
              onChange={handleChange}
              name="description"
              className="form-text description-textarea"
              value={driverData.description}
            />
            {errors.description && <label className="form-label">{errors.description}</label>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formpage;