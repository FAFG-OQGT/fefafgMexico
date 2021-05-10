import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import Chart from "react-apexcharts";
import "chartjs-plugin-datalabels";

import Aux from "../../hoc/_Aux/index";
import PieChart from "../../App/components/charts/allCharts/PieChart";
import CoincidenciaXTipo from "../../App/components/charts/fafgCharts/IndicadorPrincipal/CoincidenciaXTipo";
import SmIhVsOsteologico from "../../App/components/charts/fafgCharts/IndicadorPrincipal/SmIhVsOsteologico";
import IdentificadoXSexo from "../../App/components/charts/fafgCharts/IndicadorPrincipal/IdentificadoXSexo";
import IdentificadoXGrupoEtario from "../../App/components/charts/fafgCharts/IndicadorPrincipal/IdentificadoXGrupoEtario";
import IdentificadoXTipoContexto from "../../App/components/charts/fafgCharts/IndicadorPrincipal/IdentificadoXTipoContexto";
import IdentificadoXAno from "../../App/components/charts/fafgCharts/IndicadorPrincipal/IdentificadoXAno";

import IdentificadoXDesaDepto from "../../App/components/charts/fafgCharts/IndicadorPrincipal/IdentificadoXDesaDepto";
import IdentificadoXExhuDepto from "../../App/components/charts/fafgCharts/IndicadorPrincipal/IdentificadoXExhuDepto";

import seoAnalytics1 from "../../App/components/charts/chart/sale-seo-analytics-1";
import seoAnalytics2 from "../../App/components/charts/chart/sale-seo-analytics-2";
import { apiFetch } from "../../utils/fetchGraphs";
import userContext from "../../context/userContext";

function Home(props) {
  const [dataI1, setdataI1] = useState({ valor: 0, porcentaje: 0 });
  const [dataI2, setdataI2] = useState({ valor: 0, porcentaje: 0 });
  const [dataI3, setdataI3] = useState({ valor: 0, porcentaje: 0 });
  const userf = useContext(userContext);

  useEffect(() => {
    (async () => {
      let result = await apiFetch("graph/identSmih", userf.token);
      setdataI1(result);

      let result2 = await apiFetch("graph/identOst", userf.token);
      setdataI2(result2);

      let result3 = await apiFetch("graph/identAll", userf.token);
      setdataI3(result3);
    })();

    return () => { };
  }, []);

  return (
    <Aux>
      <Row>
        <Col xl={4} md={4}>
          <Card className="bg-c-green order-card">
            <Card.Body>
              <h6 className="text-white">Identificado SmIh</h6>
              <h2 className="text-white">{dataI1.valor}</h2>
              <p className="m-b-0">
                {dataI1.porcentaje}
                <i className="feather icon-percent m-l-10" />
              </p>
              <i className="card-icon feather icon-users" />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4} md={4}>

        </Col>
        <Col xl={4} md={4}>

        </Col>
      </Row>
      <Row>
        <CoincidenciaXTipo></CoincidenciaXTipo>
        <IdentificadoXSexo
          tipo="SMIH"
          titulo="Sexo por Id. SmIh"
        ></IdentificadoXSexo>
        <IdentificadoXGrupoEtario
          tipo="SMIH"
          titulo="Grupo Etario por Id. SmIh"
        ></IdentificadoXGrupoEtario>
      </Row>
      <br></br>

      <Row>
        <IdentificadoXTipoContexto></IdentificadoXTipoContexto>
        <IdentificadoXAno
          tipo="SMIH"
          titulo="SmIh. desaparecido x Año"
          color={2}
          sm={8}
          md={8}
          xl={8}
          height={100}
        ></IdentificadoXAno>
      </Row>

      <br></br>
      <Row>
        <IdentificadoXDesaDepto titulo="Desaparecido Id. SmIh" tipo="SMIH">
          {" "}
        </IdentificadoXDesaDepto>

      </Row>
      <br></br>
      <Row>
        <IdentificadoXExhuDepto titulo="Exhumacion Id. SmIh" tipo="SMIH">
          {" "}
        </IdentificadoXExhuDepto>

      </Row>

    </Aux>
  );
}

export default Home;
