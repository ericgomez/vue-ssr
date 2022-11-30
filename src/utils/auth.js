import { Notify } from "quasar";

export function protect(redirect, condition, path) {
  if (condition) {

    redirect(path);

    Notify.create({
      message: 'Acceso denegado',
      position: 'bottom-right',
      type: 'negative'
    });
  }
}
