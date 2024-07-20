import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading/loading.service';
import { catchError, finalize, tap } from 'rxjs';
import { NotificationService } from '../services/notification/notification.service';

type ApiError = {
  Data: null;
  HttpStatus: number;
  Messages: string[];
};

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  const notificationService = inject(NotificationService);
  loading.show();

  return next(req).pipe(
    tap((value) => {
      notificationService.hideError();
      if (value instanceof HttpResponse) {
        const apiError: ApiError = value.body as ApiError;
        if (apiError.HttpStatus && apiError.HttpStatus !== 200) {
          console.log('Entrou aqui');
          throw apiError;
        }
      }
    }),
    catchError((error: ApiError) => {
      console.log('Error', error);
      notificationService.showError(
        error?.Messages
          ? error.Messages[0]
          : 'Ocorreu um erro, entre em contato com o administrador'
      );
      throw {
        status: error.HttpStatus,
        message: error?.Messages
          ? error.Messages[0]
          : 'Ocorreu um erro, entre em contato com o administrador',
      };
    }),
    finalize(() => loading.hide())
  );
};
