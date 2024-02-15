import React, { useState, useEffect } from "react";
import "../App.css";
import { Cargando } from "../components/cargando";
import { MensajeError } from "../components/MensajeError";
import { useDispatch, useSelector } from "react-redux";
import { getSeries } from "../actions";

function Series() {
  const dispatch = useDispatch();
  const { series, isLoading, hasError } = useSelector((state) => state.series);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getSeries());
  }, [dispatch]);

  if (isLoading) {
    return <Cargando />;
  }

  if (hasError) {
    return <MensajeError />;
  }

  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;

  const paginatedSeries = series
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(startIndex, startIndex + itemsPerPage);

  const numItem = series.length;
  const totalPages = Math.ceil(numItem / itemsPerPage);
  return (
    <>
      <div>
        <div className="movies-container">
          {paginatedSeries.map((series) => {
            let words = series.description.split(" ");

            if (words.length > 30) {
              words = words.slice(0, 30);
            }

            let shortDescription = words.join(" ");

            return (
              <div className="card " key={series.title}>
                <div className="front">
                  <img
                    className="card-img-top"
                    src={series.images["Poster Art"].url}
                    alt={series.title}
                  />
                  <div className="card-body">
                    <p className="card-text">{series.title}</p>
                  </div>
                </div>
                <div className="back">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{series.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {series.releaseYear}
                      </h6>
                      <p className="card-text descripcion">
                        {shortDescription}
                      </p>
                      <button type="button" className="btn btn-primary">
                        Ver ahora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="btn-content">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          Siguiente
        </button>
      </div>
    </>
  );
}

export default Series;
