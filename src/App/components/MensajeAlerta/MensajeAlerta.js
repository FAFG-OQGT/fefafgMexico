import PNotify from "pnotify/dist/es/PNotify";
import "pnotify/dist/es/PNotifyButtons";
import "pnotify/dist/es/PNotifyConfirm";
import "pnotify/dist/es/PNotifyCallbacks";

const MensajeAlertaSwal = (titulo, mensaje, tipo) => {
if (tipo === "success")
  PNotify.success({
    title: titulo ,
    text: mensaje,
  });
if (tipo === "error")
  PNotify.error({
    title: titulo,
    text: mensaje,
  });
if (tipo === "info")
  PNotify.info({
    title: titulo,
    text: mensaje,
  });
};


export default MensajeAlertaSwal;
