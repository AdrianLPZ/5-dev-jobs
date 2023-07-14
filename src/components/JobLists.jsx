import jobs from "../data/data";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function JobLists() {
  const [jobData, setJobData] = useState(jobs);
  const [searchTerm, setSearchTerm] = useState("");
  const searchTermValue = searchTerm.toLowerCase();
  const [searchByLocation, setSearchByLocation] = useState("");
  const locationSearchHandler = ()=>{
    const filteredData = jobs.filter((job)=>job.location.toLowerCase().includes(searchByLocation.toLowerCase()))
    setJobData(filteredData)
  };

  const filterJobData = (e) =>{
    const filterValue = e.target.value;
    if(filterValue === "full-time"){
      const filteredData = jobs.filter((job)=>job.contract === "Full Time");
      setJobData(filteredData)
    } else if(filterValue === "part-time"){
      const filteredData = jobs.filter((job)=>job.contract === "Part Time");
      setJobData(filteredData)
    }else if(filterValue === "freelance"){
      const filteredData = jobs.filter((job)=>job.contract === "Freelance");
      setJobData(filteredData)
    }
  };

  return (
    <section className="job__list">
      <div className="container">
        <div className="job__list__wrapper">
          <div className="search__panel">
            <div className="search__panel-01">
              <input type="text"
              placeholder="Busqueda por titulo, empresa"
              value={searchTerm}
              onChange={(e)=> setSearchTerm(e.target.value)} />
            </div>
            <div className="search__panel-02">
            <input type="text"
              placeholder="Busqueda por ubicacion"
              value={searchByLocation}
              onChange={(e)=> setSearchByLocation(e.target.value)}
               />
              <button className="btn" onClick={locationSearchHandler}>Buscar</button>
            </div>
            <div className="search__panel-03">
              <select onChange={filterJobData}>
              <option >Filtar trabajo por</option>
              <option value="full-time">Tiempo completo</option>
              <option value="part-time">Tiempo parcial</option>
              <option value="freelance">Freelance</option>
              </select>
            </div>
          </div>
          <div className="job__wrapper">
            {jobData?.filter((job)=>{
              if(searchTerm === "") return job;
              if(job.position.toLowerCase().includes(searchTermValue) || job.company.toLocaleLowerCase().includes(searchTermValue))

              return job;
            })
            .map((item) => (
              <div key={item.id} className="job__item">
                <img src={item.logo} alt="logo-de-empresa" />
                <div className="job__content">
                  <h6>
                    {item.postedAt} - {item.contract}
                  </h6>
                  <h1>
                    <Link to={`/jobs/${item.position}`}>{item.position}</Link>
                  </h1>
                  <p>{item.company}</p>
                  <div className="location">
                    <p>
                      Location: <span>{item.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}
