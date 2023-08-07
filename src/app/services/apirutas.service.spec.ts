import { TestBed } from '@angular/core/testing';

import { ApirutasService } from './apirutas.service';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ubicacion } from '../models/ubicacion.interface';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ApirutasService', () => {
  let service: ApirutasService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
      ],
    });
    service = TestBed.inject(ApirutasService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debe hacer un llamado a API REST', () => {
    const mockResponse: Ubicacion = {
      uid: 'zvQ2zbHhmkbslU1yJhiDKmE4GAi2',
      ubicacion: [
        {
          latitud: -33.61818760948832,
          longitud: -70.56618993533618,
        },
      ],
    };
    service.getUbicaciones().subscribe((res) => {
      console.log(res);
      expect(res).toBeTruthy();
      const ubicacion = res[0];
      expect(ubicacion).toBe(mockResponse[0]);
    });

    const mockRequest = httpTestingController.expectOne(
      'http://cuervolu.pythonanywhere.com/api/ubicacion/'
    );

    expect(mockRequest.request.method).toEqual('GET');
    mockRequest.flush(mockResponse);
  });
});
