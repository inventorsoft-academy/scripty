import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(public snackBar: MatSnackBar) {
    }

    error(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 3500,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
            panelClass: 'error',
        });

    }

    warning(message: string) {


        this.snackBar.open(message, 'Close', {
            duration: 3500,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
            panelClass: 'warning',
        });
    }

    info(message: string) {

        this.snackBar.open(message, 'Close', {
            duration: 3500,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
            panelClass: 'info',
        });
    }

    success(message: string) {

        this.snackBar.open(message, 'Close', {
            duration: 3500,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
            panelClass: 'success',
        });
    }
}
