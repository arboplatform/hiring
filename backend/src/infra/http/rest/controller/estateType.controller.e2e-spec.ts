import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';

import { EstateTypeFactory } from '@test/factories/estateType.factory';

import { EstateTypeViewModel } from '../view-models/estateType.view-model';

describe('Estate Type Controller (e2e)', () => {
  let app: INestApplication;

  let estateTypeFactory: EstateTypeFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, HttpModule],
      providers: [EstateTypeFactory],
    })
      .overridePipe(ValidationPipe)
      .useValue(new ValidationPipe({ transform: true }))
      .compile();

    app = moduleRef.createNestApplication();

    estateTypeFactory = moduleRef.get(EstateTypeFactory);

    await app.init();
  });

  it('(GET) EstateTypePager', async () => {
    const estateType = await estateTypeFactory.makeEstateType();

    const params = {
      offset: '0',
      limit: '10',
      name: estateType.name,
    };

    const stringParams = new URLSearchParams(params).toString();

    const response = await request(app.getHttpServer())
      .get(`/estate-types?${stringParams}`)
      .send()
      .expect(200);

    const responseEstateType = {
      ...EstateTypeViewModel.toResponse(estateType),
      createdAt: estateType.createdAt.toISOString(),
    };

    expect(response.body.nodes).toEqual(
      expect.arrayContaining([responseEstateType]),
    );
  });
});
