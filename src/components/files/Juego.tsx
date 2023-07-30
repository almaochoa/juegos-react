import React, { useState } from "react";

const Juego = () => {

  const [juego, setJuego] = useState({});

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3>Obtener ganador</h3>
              <form>
                <div className="form-group">
                      <label htmlFor="">Selecciona el Juego</label>         
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                   <label htmlFor="">Ganador</label>         
                   <textarea
                    name="res"
                    id="res"
                    rows={2}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="form-group">
                   <label htmlFor="">Errores</label>         
                   <textarea
                    name="errors"
                    id="errors"
                    rows={2}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="btn btn-primary">
                    Save
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Juego;
