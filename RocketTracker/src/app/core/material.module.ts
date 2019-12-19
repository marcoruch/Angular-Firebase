import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import {
    MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatChipsModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatChipsModule,
        MatNativeDateModule
    ],
    exports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatChipsModule,
        MatRadioModule,
        MatDatepickerModule,
        MatSnackBarModule
    ],
})

export class CustomMaterialModule { }