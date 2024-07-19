import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { NotificationService } from './services/notification.service';
import { InputValidationComponent } from './components/input-validation/input-validation.component'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, InputValidationComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desafio-final-front';

  // constructor(private notificationService: NotificationService) {}

  // // Método exemplo para atualizar notificações (se necessário)
  // updateNotificationCount() {
  //   // Você pode chamar um método no serviço para atualizar o número de notificações
  //   this.notificationService.getNotificationCount().subscribe(count => {
  //     console.log('Número de notificações:', count);
  //   });
  // }
}

