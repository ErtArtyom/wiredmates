import { ChangeDetectorRef, NgZone, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * Generated class for the FormatTimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatTime',
  pure: false
})
export class FormatTimePipe implements PipeTransform, OnDestroy {
  private timer: number;

  constructor (private changeDetectorRef: ChangeDetectorRef,
               private ngZone: NgZone) {
  }

  transform (value: string) {
    this.removeTimer();
    let d = new Date(value);
    let now = new Date();
    let seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
    let timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) * 1000;
    this.timer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.ngZone.run(() => this.changeDetectorRef.markForCheck());
        }, timeToUpdate);
      }
      return null;
    });
    let minutes = Math.round(Math.abs(seconds / 60));
    let hours = Math.round(Math.abs(minutes / 60));
    let days = Math.round(Math.abs(hours / 24));
    if (Number.isNaN(seconds)) {
      return '';
    } else if (seconds < 60) {
      return 'now';
    } else if (minutes < 60) {
      return minutes + 'm';
    } else if (hours < 24) {
      return hours + 'h';
    } else if (days < 30) {
      return days + 'd';
    } else {
      return moment(d).format('MMM DD') + '\n' + moment(d).format('YYYY');
    }
  }

  ngOnDestroy (): void {
    this.removeTimer();
  }

  private removeTimer () {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private getSecondsUntilUpdate (seconds: number) {
    let min = 60;
    let hr = min * 60;
    let day = hr * 24;
    if (seconds < min) { // less than 1 min, update every 2 secs
      return 2;
    } else if (seconds < hr) { // less than an hour, update every 30 secs
      return 30;
    } else if (seconds < day) { // less then a day, update every 5 mins
      return 300;
    } else { // update every hour
      return 3600;
    }
  }
}
