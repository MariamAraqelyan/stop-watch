import {Component, OnInit, OnDestroy, SimpleChanges, Input} from '@angular/core';
import {displayedTime} from '../shared/interfaces/displayed-time';
import {StopwatchStatus} from '../shared/models/stopwatch-status/stopwatch-status';

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss']
})
export class StopWatchComponent implements OnInit, OnDestroy {

  clock: any;

  private timeForDisplay: displayedTime = {
    minutes: '00',
    seconds: '00',
    milliseconds: '00'
  };

  public laps: any = [];
  public counter: number;
  public timerRef;
  public running: boolean = false;
  public startText: string = StopwatchStatus.START;


  @Input() start: boolean;
  @Input() showTimerControls: boolean;

  constructor() {
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['start'].currentValue) {
      this.startTimer();
    } else {
      this.clearTimer();
    }
  }

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = StopwatchStatus.STOP;

      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {

        this.counter = Date.now() - startTime;
        const seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
        const minutes: number = Math.floor(this.counter / 60000);
        const milliseconds = Math.floor(Math.floor(this.counter % 1000) / 10).toFixed(0);

        this.timeForDisplay.minutes = minutes < 10 ? String(`0${minutes}`) : String(minutes);
        this.timeForDisplay.milliseconds = Number(milliseconds) < 10 ? String(`0${milliseconds}`) : String(milliseconds);
        this.timeForDisplay.seconds = Number(seconds) < 10 ? String(`0${seconds}`) : String(seconds);

      });

    } else {
      this.startText = StopwatchStatus.RESUME;
      clearInterval(this.timerRef);
    }
  }

  lapTimeSplit() {
    const lapTime = String(`${this.timeForDisplay.minutes}:${this.timeForDisplay.seconds}:${this.timeForDisplay.milliseconds}`);
    this.laps.push(lapTime);
  }

  clearTimer() {
    this.running = false;
    this.startText = StopwatchStatus.START;
    this.counter = undefined;
    for (let item in this.timeForDisplay) {
      this.timeForDisplay[item] = '00';
    }
    this.laps = [];
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

}
