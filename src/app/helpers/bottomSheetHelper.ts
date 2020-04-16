import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetHelper extends MatBottomSheet {

  private bottomSheetConfig = {
    panelClass: 'bottom-sheet'
  };

  // constructor() {
  //   super();
  // }


  openBottomSheet(component: ComponentType<any>) {
    this.open(component, this.bottomSheetConfig);
  }
}
