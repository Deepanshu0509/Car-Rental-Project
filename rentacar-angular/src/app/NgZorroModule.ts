import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';

@NgModule({
  imports: [],
  exports: [NzLayoutModule, NzFormModule, NzInputModule, NzSpinModule, NzButtonModule, NzSelectModule, NzDatePickerModule],
})
export class NgZorroModule {}
