import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialog } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { InputDialog } from 'src/app/dialog/input-dialog/input-dialog.component';
import { AngularMaterialModule } from './AngularMaterial.module';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { ItemDialog } from 'src/app/dialog/item-dialog/item-dialog.component';
import { ValueGeneratorDialog } from 'src/app/dialog/value-generator-dialog/value-generator-dialog.component';
import { CreateUserDialog } from 'src/app/dialog/create-user-dialog/create-user-dialog.component';
import { UserDetailDialog } from 'src/app/dialog/user-detail-dialog/user-detail-dialog.component';
import { AddUserDialog } from 'src/app/dialog/add-user-dialog/add-user-dialog.component';
import { CopyToClipboardDirective } from '../directives/copy-to-clipboard.directive';
import { MatFormFieldInputComponent } from 'src/app/util-component/mat-form-field-input/mat-form-field-input.component';
import { ValueGeneratorUtilComponent } from 'src/app/util-component/value-generator-util/value-generator-util.component';
import { CopyToClipboardUtilComponent } from 'src/app/util-component/copy-to-clipboard-util/copy-to-clipboard-util.component';
import { InputTypeSwitchComponent } from 'src/app/util-component/input-type-switch/input-type-switch.component';

@NgModule({
    declarations: [
        ConfirmDialog,
        InputDialog,
        ItemDialog,
        ValueGeneratorDialog,
        CreateUserDialog,
        UserDetailDialog,
        AddUserDialog,
        CopyToClipboardDirective,
        MatFormFieldInputComponent,
        ValueGeneratorUtilComponent,
        CopyToClipboardUtilComponent,
        InputTypeSwitchComponent
    ],
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        ClipboardModule,
    ],
    exports: [
        BrowserAnimationsModule,
        FormsModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        ConfirmDialog,
        InputDialog,
        ClipboardModule,
        MatFormFieldInputComponent,
        ValueGeneratorUtilComponent,
        CopyToClipboardUtilComponent,
        InputTypeSwitchComponent
    ]
})
export class EssentialModule {}