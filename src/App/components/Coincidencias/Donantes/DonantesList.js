import React, {useEffect, useState} from "react";
import { Row} from "react-bootstrap";


function DonantesList({DonanteCoincidencia}) {
  const [data, setData] = useState(0);

  useEffect(() => {
    setData(DonanteCoincidencia);

    return () => {};
  }, []);

  return (
    <div>
      <Row>
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <td>Parentesco</td>
              <td>Cantidad</td>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((fbb) => (
                <tr key={fbb.donanteCoincidenciaId}>
                  <td>{fbb.Donante.descripcion}</td>
                  <td className="text-center">{fbb.cantidadDonantes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </table>
      </Row>
    </div>
  );
}

export default DonantesList;
