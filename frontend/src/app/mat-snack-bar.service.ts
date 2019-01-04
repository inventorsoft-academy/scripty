import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class MatSnackBarService {

    constructor(public snackBar: MatSnackBar) {
    }

    openSnackBar(message: string, action: string, className: string) {

        this.snackBar.open(message, action, {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
            panelClass: [className],
        });
    }
}
