import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private title = 'Scripty';
  private timeOut = 2500;

  constructor(private _toast: ToastrService) { }

  showSuccess(message: string) {
    this._toast.success(message, this.title);
  }

  showError(message: string) {
      this._toast.error(message, this.title);
  }

  showWarning(message: string) {
      this._toast.warning(message, this.title);
  }

  showInfo(message: string) {
      this._toast.info(message, this.title);
  }
}
