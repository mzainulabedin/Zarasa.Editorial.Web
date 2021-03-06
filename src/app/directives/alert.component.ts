import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from '../models/alert';
import { AlertService } from '../services/alert.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { keyframes } from '@angular/core/src/animation/dsl';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    animations: [trigger('alertAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(20px)'}),
        animate('.3s', style({opacity: 1, transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'translateY(0)'}),
        animate('.3s', style({opacity: 0, transform: 'translateY(20px)'}))
      ])
    ])]
})
export class AlertComponent implements OnInit {
  public statusMessage: string;
  alerts: Alert[] = [];

      constructor(private alertService: AlertService) { }

      ngOnInit() {
          this.alertService.getAlert().subscribe((alert: Alert) => {
              if (!alert) {
                  // clear alerts when an empty alert is received
                  this.alerts = [];
                  return;
              }
              if (!alert.visible) {
                this.removeAlert(alert);
              } else {
                this.alerts.push(alert);
              }

              // add alert to array

          });
      }

      removeAlert(alert: Alert) {
          this.alerts = this.alerts.filter(x => x !== alert);
      }

      cssClass(alert: Alert) {
          if (!alert) {
              return;
          }

          // return css class based on alert type
          switch (alert.type) {
              case AlertType.Success:
                  return 'alert alert-success';
              case AlertType.Error:
                  return 'alert alert-danger';
              case AlertType.Info:
                  return 'alert alert-info';
              case AlertType.Warning:
                  return 'alert alert-warning';
          }
        }
}
