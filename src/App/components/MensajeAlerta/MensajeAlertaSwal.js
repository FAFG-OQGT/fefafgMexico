import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MensajeAlerta = (titulo, mensaje, tipo) => {
    Swal.fire({
        position: 'top',
        //icon: 'success',
        type: tipo,
        title: titulo,
        html:mensaje,
        showConfirmButton: false,
        timer: 3000
      })
};

export default MensajeAlerta;
