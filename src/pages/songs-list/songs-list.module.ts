import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SongsListPage } from './songs-list';

@NgModule({
  declarations: [
    SongsListPage,
  ],
  imports: [
    IonicPageModule.forChild(SongsListPage),
  ],
})
export class SongsListPageModule {}
