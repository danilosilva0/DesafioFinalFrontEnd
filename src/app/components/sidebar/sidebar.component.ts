import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarStateService } from '../../services/sidebar/sidebar-state.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  collapsed = true;
  SIDEBAR_WIDTH = 140;
  SIDEBAR_WIDTH_COLLAPSED = 0;

  constructor(private sidebarStateService: SidebarStateService) {
    this.sidebarStateService.collapsed$.subscribe(
      collapsed => this.collapsed = collapsed
    );
  }

  get sidebarWidth() {
    return this.collapsed ? `${this.SIDEBAR_WIDTH_COLLAPSED}px` : `${this.SIDEBAR_WIDTH}px`;
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  esconder() {
    return !this.collapsed;
  }
}
