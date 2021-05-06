import React from 'react'
import pdfConverter from 'jspdf';
import { saveAs } from 'file-saver';
import iconoEmpresa from '../../../../assets/images/logoletroasnegras.png';
import { Col, Row } from 'react-bootstrap';
var alturaHojaPx = 0;
var anchoHojaPx = 0;
const calcular = (ancho, altura) => {
    let salida = {};
    for (let porcentaje = 1; porcentaje <= 100; porcentaje++) {
        ancho = ancho - ancho * (porcentaje * 0.01);
        altura = altura - altura * (porcentaje * 0.01);

        if (ancho <= anchoHojaPx && altura <= alturaHojaPx) {
            salida.ancho = ancho;
            salida.altura = altura;
            return salida;
        }
    }
}
export const Exportar = ({ id, nombre = "descarga", subTitulo = "Dirección de generación de reportes", descripcion = "Reporte de Graficas" }) => {

    const addHeadFood = (pdf, totalPaginas = 1, pagina = 1) => {
        const tamanioX = pdf.internal.pageSize.width;
        const tamanioY = pdf.internal.pageSize.height;
        pdf.addImage(iconoEmpresa, "JPEG", 40, 20, 113, 57);
        pdf.setFontSize(12);
        const titulo = "Fundación de Antropología Forence de Guatemala";
        const calculoXTitulo = (pdf.internal.pageSize.width / 2) - (pdf.getStringUnitWidth(titulo) * pdf.internal.getFontSize() / 2);
        pdf.text(titulo, calculoXTitulo, 40);

        pdf.setFontSize(10);
        const calculoXSubTitulo = (pdf.internal.pageSize.width / 2) - (pdf.getStringUnitWidth(subTitulo) * pdf.internal.getFontSize() / 2);
        pdf.text(subTitulo, calculoXSubTitulo, 52);

        pdf.setFontSize(12);
        const calculoXDescripcionReporte = (pdf.internal.pageSize.width / 2) - (pdf.getStringUnitWidth(descripcion) * pdf.internal.getFontSize() / 2);
        pdf.text(descripcion, calculoXDescripcionReporte, 64);
        pdf.setLineWidth(0.8);
        pdf.line(20, 80, tamanioX - 20, 80);


        pdf.setLineWidth(0.8);
        pdf.line(20, tamanioY - 40, tamanioX - 20, tamanioY - 40);
        pdf.setFontSize(12);
        const descripcionPaginas = `Página ${pagina} de ${totalPaginas}`;
        const calculoDescripcionPaginas = (pdf.internal.pageSize.width - 20) - (pdf.getStringUnitWidth(descripcionPaginas) * pdf.internal.getFontSize());
        pdf.text(descripcionPaginas, calculoDescripcionPaginas, tamanioY - 25);

    }

    const handleExportar = () => {
        const canvas = document.getElementById(id);
        const pdf = new pdfConverter("l", "pt", "letter", true);
        addHeadFood(pdf);
        const tamanioX = pdf.internal.pageSize.width;
        const tamanioY = pdf.internal.pageSize.height;
        let widthCanvas = canvas.clientWidth;
        let heightCanvas = canvas.clientHeight;
        let initY = 55;
        let initX = 10;

        initX += (tamanioX - widthCanvas) / 2;
        initY += (tamanioY - heightCanvas) / 2;
        const base64Image = canvas.toDataURL("image/png", 1.0);;
        pdf.addImage(base64Image, "JPEG", initX, initY, widthCanvas, heightCanvas);
        pdf.save(`${nombre}.pdf`);
    }

    const handleTodos = () => {
        const elementosCanvas = document.getElementsByTagName("canvas");
        const pdf = new pdfConverter("l", "pt", "letter", true);
        const tamanioX = pdf.internal.pageSize.width;
        const tamanioY = pdf.internal.pageSize.height;


        let totalPaginas = elementosCanvas.length;
        let paginaActual = 1;

        for (let canvas of elementosCanvas) {

            let widthCanvas = canvas.clientWidth;
            let heightCanvas = canvas.clientHeight;
            let initY = 30;
            let initX = 55;
            initX += (tamanioX - widthCanvas) / 2;
            initY += (tamanioY - heightCanvas) / 2;

            const base64Image = canvas.toDataURL("image/png", 1.0);
            pdf.addImage(base64Image, "JPEG", initX, initY, widthCanvas, heightCanvas);
            addHeadFood(pdf, totalPaginas, paginaActual);
            if (paginaActual < totalPaginas) {
                pdf.addPage();
            }
            paginaActual++;
        }
        pdf.save(`${nombre}.pdf`);
    }
    const handleJpg = () => {
        const canvas = document.getElementById(id);
        canvas.toBlob((blob) => {
            saveAs(blob, `${nombre}`);
        }, 'image/jpeg',1);
    }
    return (
        <Row>
            <Col  className="d-flex justify-content-end">
                {
                    id !== undefined ? <>
                        <button className="btn btn-danger btn-sm mr-1" onClick={handleExportar}>Pdf</button>
                        <button className="btn btn-info btn-sm mr-1" onClick={handleJpg}>Image</button>
                    </>
                        :
                        <button className="btn-icon btn btn-outline-primary btn-sm" onClick={handleTodos}><i className="feather icon-printer" /></button>
                }
            </Col>
        </Row>
    )
}
